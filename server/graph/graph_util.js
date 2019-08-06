var superagent = require("superagent");
// var config = require('../../config');

function parseTree(data) {
  traversalTree(data, function(data) {
    if (!data) {
      return;
    }
    data.name = data.vertex.name || data.vertex._label;
    data.properties = data.vertex;
    delete data.vertex;
  });

  return data;
}

function traversalTree(data, cb, prev) {
  cb && cb(data, prev);

  if (data && data.children) {
    data.children.forEach(function(c) {
      traversalTree(c, cb, data);
    });
  }
}

var getChildrenByLayer = function(data, layer) {
  if (!data || !data.children || layer < 1) return [];

  var queue = [data];
  var res = [];
  while (layer-- > 0) {
    while (queue.length) {
      var child = queue.shift();
      res = res.concat(child.children || []);
    }
    queue = res;
    res = [];
  }
  return queue;
};

function parseNetwork(data) {
  var graph = {
    vertexes: (data && data.vertices) || [],
    edges: (data && data.edges) || []
  };

  /** 每条边都需要有 _id */
  graph.edges.forEach(function(e) {
    e._id = e._id || e._schema + "/" + e._from.split("/")[1];
    e.label = e._label || "";
  });

  /** 边、点去重 */
  unique(graph.edges, "_id");
  unique(graph.vertexes, "_id");

  return graph;
}

function unique(data, key) {
  var keys = {};
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    if (keys[d[key]]) {
      data.splice(i, 1);
      i--;
    } else {
      keys[d[key]] = true;
    }
  }
}

function setStructureProp(data, prev) {
  if (!data || !data.vertex) {
    return;
  }
  data.properties = data.vertex;
  data.name = data.properties.name || data.properties._label;
  delete data.vertex;

  var id = data.properties._id;
  prev = prev || { edges: [] };
  data.relation = prev.edges.filter(function(e) {
    return [e._from, e._to].indexOf(id) > -1;
  });
  investRelation = data.relation.filter(function(e) {
    return e._id.includes("invest");
  });
  if (data.relation.length && !investRelation.length) {
    // 没有投资关系但是有其他关系的情况，一般不会出现，除非数据错误
    data.relation = [];
    delete data.properties;
    delete data.name;
  }
  data.value = investRelation[0] && investRelation[0]._label;
}

function filterTreeByDirection(data, direction) {
  var children = data.children || [];
  var curId = data.properties._id;
  for (var i = 0; i < children.length; i++) {
    var childEdge = children[i].relation[0] || {};
    if (childEdge[direction] !== curId) {
      children.splice(i, 1);
      i--;
    }
  }
}

function setTreeProp(data, prev) {
  if (!data || !data.vertex) {
    return;
  }
  data.properties = data.vertex;
  data.properties.name = data.properties.name || data.properties._label;
  data.name = data.properties.name || data.properties._label;
  delete data.vertex;

  var id = data.properties._id;
  prev = prev || { edges: [], allEdges: [] };
  data.relation = prev.edges.filter(function(e) {
    return [e._from, e._to].indexOf(id) > -1;
  });
  data.allRelations = prev.allEdges.filter(function(e) {
    return [e._from, e._to].indexOf(id) > -1;
  });
  data.label = data.relation[0] && data.relation[0]._label;
}

function setBlacklist(req) {
  var data = (req && req.local) || null;
  var p = new Promise(function(resolve, reject) {
    resolve();
  });
  if (!data) {
    return p;
  }

  var keys = [];
  if (data.vertexes) {
    // 网络图
    keys = data.vertexes.map(function(v) {
      return v._key;
    });
  } else if (data.properties) {
    traversalTree(data, function(d) {
      if (d.properties && d.properties._key) {
        keys.push(d.properties._key);
      }
    });
  }
  var sa = superagent
    .post("http://192.168.1.67:8086" + "/crm/api/search")
    .set("Cookie", "JSESSIONID=" + req.cookies["JSESSIONID"]);
  sa.send({
    graph: "crm_dev2",
    schemas: ["tv_dow_jones_blacklist"],
    filter: [
      {
        field: "object_key",
        type: "term",
        values: keys
      }
    ]
  });
  return sa.then(function(res) {
    if (!res.ok || !res.body.success || !res.body.payload) {
      logger.error(JSON.stringify(res));
    } else {
      var blacklist =
        (res.body.payload.searchResp && res.body.payload.searchResp.data) || [];
      blacklist = blacklist.map(function(b) {
        return b._id;
      });
      if (data.vertexes) {
        // 网络图
        data.vertexes.forEach(function(v) {
          if (blacklist.indexOf(v._key) > -1) {
            v.is_blacklist = true;
          }
        });
      } else if (data.properties) {
        traversalTree(data, function(d) {
          if (
            d.properties &&
            d.properties._key &&
            blacklist.indexOf(d.properties._key) > -1
          ) {
            d.properties.is_blacklist = true;
          }
        });
      }
    }
  });
}

function addLabelToTreeName(data) {
  traversalTree(data, function(d) {
    if (d.label) {
      d.name += "（" + d.label + "）";
      delete d.label;
    }
  });
  // 数据过多时聚合，默认显示9个
  data.children.forEach(function(child, index) {
    data.children[index].children = buildMultipyTree(
      data.children[index].children
    );
  });
}

function buildMultipyTree(arr) {
  var chunkCount = 9;
  var chunkArr = chunk(arr, chunkCount);
  if (chunkArr.length !== 0) {
    chunkArr.forEach(function(val, i) {
      chunkArr[i] = {
        children: val
      };
    });
    for (var i = chunkArr.length - 1; i > 0; i--) {
      chunkArr[i - 1].children.push({
        name:
          "剩余共" +
          (chunkArr.length - i) +
          "个节点,共" +
          (arr.length - i * chunkCount) +
          "条数据",
        children: chunkArr[i].children,
        // 不加properties会导致d3.tree.js找不到对应id而无法画出对应的连线
        properties: chunkArr[i].children[0].properties,
        convergeNum: arr.length - i * chunkCount // 聚合数据总条数
      });
    }
    return chunkArr.splice(0, 1)[0].children;
  } else {
    return arr;
  }
}

// 分割数组
function chunk(array, size) {
  //获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
  const length = array.length;
  //判断不是数组，或者size没有设置，size小于1，就返回空数组
  if (!length || !size || size < 1) {
    return [];
  }
  //核心部分
  let index = 0; //用来表示切割元素的范围start
  let resIndex = 0; //用来递增表示输出数组的下标

  //根据length和size算出输出数组的长度，并且创建它。
  let result = new Array(Math.ceil(length / size));
  //进行循环
  while (index < length) {
    //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
    result[resIndex++] = array.slice(index, (index += size));
  }
  //输出新数组
  return result;
}

function setLinkedName(item) {
  var name = item.name || (item.properties ? item.properties.name : "");
  var key = item._key || (item.properties ? item.properties._key : "");
  var id = item._id || (item.properties ? item.properties._id : "");
  if (id.indexOf("Company") > -1) {
    name =
      '<a class="link" target="_blank" href="' +
      "/customer_detail?name=" +
      key +
      '">' +
      name +
      "</a>";
  }
  return name;
}

function formatMoney(val, unit) {
  if (Number(val) !== val) {
    return val;
  }
  unit = unit || "万元";

  if (unit === "万元") {
    val /= 10000;
  }
  val = val
    .toFixed(2)
    .toString()
    .split("");
  var dotIndex = val.indexOf(".");
  if (dotIndex !== -1) {
    var cnt = 0;
    for (var i = dotIndex; i > 0; i--) {
      if (cnt === 3) {
        val.splice(i, 0, ",");
        i++;
        cnt = 0;
      } else {
        cnt++;
      }
    }
  }

  return val.join("") + unit;
}

var sortTransfer = function(data) {
  data.children.sort(function(c) {
    return c.name.indexOf("转出") > -1 ? -1 : 1;
  });
};

var sortGuarantee = function(data) {
  data.children.sort(function(c) {
    return c.name.indexOf("对外") > -1 ? -1 : 1;
  });
};

var setGuaranteeAttribute = function(data) {
  traversalTree(data, function(d) {
    if (d.allRelations.length) {
      d.type = d.allRelations[0].guarantee_type;
    }
  });
};
var sortSocial = function(data) {
  data.children.sort(function(c) {
    return c.name.indexOf("亲属") > -1 ? -1 : 1;
  });
};

module.exports = {
  parseTree: parseTree,
  parseNetwork: parseNetwork,
  getChildrenByLayer: getChildrenByLayer,
  traversalTree: traversalTree,
  setStructureProp: setStructureProp,
  filterTreeByDirection: filterTreeByDirection,
  setTreeProp: setTreeProp,
  setBlacklist: setBlacklist,
  addLabelToTreeName: addLabelToTreeName,
  setLinkedName: setLinkedName,
  formatMoney: formatMoney,
  sortTransfer: sortTransfer,
  sortGuarantee: sortGuarantee,
  sortSocial: sortSocial,
  setGuaranteeAttribute: setGuaranteeAttribute
};
