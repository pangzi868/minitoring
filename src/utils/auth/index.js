/**
 * tips: 天威视讯项目目前没用到这个
 */
import axios from "axios";
export const cacheAuth = (type, callback) => {
  // debugger
  if (
    localStorage.getItem("pageAuth") &&
    type !== "first" &&
    localStorage.getItem("pageAuth") !== "undefined"
  ) {
    let data = JSON.parse(localStorage.getItem("pageAuth"));
    data = data.filter(item => item.name === type);
    callback(getCommonRenderData(data));
  } else {
    axios.get("/crm-lz-ls/api/auth/getUserPermission").then(response => {
      let data = response.data.payload;
      if (!response.data.success) {
        location.href = "/#/root/";
      } else {
        localStorage.setItem("pageAuth", JSON.stringify(data));
        data = data.filter(item => item.name === type);
        callback(getCommonRenderData(data));
      }
    });
  }
};

export const auth = (str, page) => {
  var items = str.split("[");
  if (items.indexOf("") === 0) items.shift();
  if (items && items.length) {
    items = items.map(item => {
      if (item.indexOf("]") > -1) {
        item = item.substring(0, item.length - 2);
        item = item.substring(1);
      }
      return item;
    });
  }
  var ret;
  switch (items.length) {
    case 1:
      try {
        ret = page[items[0]];
      } catch (err) {
        ret = false;
      }
      break;
    case 2:
      try {
        ret = page[items[0]][items[1]];
      } catch (err) {
        ret = ret = false;
      }
      break;
    case 3:
      try {
        ret = page[items[0]][items[1]][items[2]];
      } catch (err) {
        ret = false;
      }
      break;
    case 4:
      try {
        ret = page[items[0]][items[1]][items[2]][items[3]];
      } catch (err) {
        ret = false;
      }
      break;
    case 5:
      try {
        ret = page[items[0]][items[1]][items[2]][items[3]][items[4]];
      } catch (err) {
        ret = false;
      }
      break;
    case 6:
      try {
        ret = page[items[0]][items[1]][items[2]][items[3]][items[4]][items[5]];
      } catch (err) {
        ret = false;
      }
      break;
    default:
      ret = false;
  }
  return ret;
};

const getCommonRenderData = data => {
  let page = data || [];
  // let message = [];
  // let top = [];
  let tem = {};
  let pageTem = {};
    // messageTem = {},
    // topTem = {};
  let _formateData = function(data) {
    data.forEach(item => {
      if (item.parentId) {
        for (var key in tem) {
          if (tem[key]["id"] === item.parentId) {
            tem[key] = tem[key] ? tem[key] : {};
            tem[key][item.name] = {
              checked: item.checked,
              id: item.id
            };
          } else {
            for (var k in tem[key]) {
              if (
                typeof tem[key][k] == "object" &&
                tem[key][k]["id"] == item.parentId
              ) {
                tem[key][k] = tem[key][k] ? tem[key][k] : {};
                tem[key][k][item.name] = {
                  checked: item.checked,
                  id: item.id
                };
              } else {
                for (var kk in tem[key][k]) {
                  if (
                    typeof tem[key][k][kk] == "object" &&
                    tem[key][k][kk] !== null &&
                    tem[key][k][kk]["id"] == item.parentId
                  ) {
                    tem[key][k][kk] = tem[key][k][kk] ? tem[key][k][kk] : {};
                    tem[key][k][kk][item.name] = {
                      checked: item.checked,
                      id: item.id
                    };
                  } else {
                    for (var kkk in tem[key][k][kk]) {
                      if (
                        typeof tem[key][k][kk][kkk] == "object" &&
                        tem[key][k][kk][kkk] !== null &&
                        tem[key][k][kk][kkk]["id"] == item.parentId
                      ) {
                        tem[key][k][kk][kkk] = tem[key][k][kk][kkk]
                          ? tem[key][k][kk][kkk]
                          : {};
                        tem[key][k][kk][kkk][item.name] = {
                          checked: item.checked,
                          id: item.id
                        };
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        if (item.name) {
          tem[item.name] = {
            checked: item.checked,
            id: item.id
          };
        }
      }
      if (item.subs.length > 0) {
        _formateData(item.subs);
      }
    });
  };
  if (page.length > 0) {
    _formateData(page);
    pageTem = JSON.parse(JSON.stringify(tem));
  }
  // if (message.length > 0) {
  //   _formateData(message);
  //   messageTem = JSON.parse(JSON.stringify(tem));
  // } else {
  //   messageTem = pageTem;
  //   messageTem["消息中心"] = [];
  // }
  // if (top.length > 0) {
  //   _formateData(top);
  //   topTem = JSON.parse(JSON.stringify(tem));
  //   if (message.length === 0) {
  //     topTem["消息中心"] = [];
  //   }
  // } else {
  //   topTem = messageTem;
  //   topTem["顶部导航"] = [];
  // }
  // debugger
  return pageTem;
};
