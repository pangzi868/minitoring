import { Toast } from "antd-mobile";
import { hashHistory, Redirect } from "react-router";
import axios from "axios";
import { isNullOrUndefined } from "utils/common.js";
import { mockClosure } from 'utils/mock'

const TIPS_DURATION = 2;
const TIPS_INTERFACE_ERROR = "接口获取数据失败，详情请查看控制台";

const IS_MOCK_AXIOS_MODULE = false // 控制启用autoUrlPrefix的接口是否使用mock
const isMock = mockClosure(IS_MOCK_AXIOS_MODULE)

const isPlainObject = require("is-plain-object");

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // 两类错误，一类错误是

    // error包含3个字段，分别为config、request和reponse，仅response有用
    return Promise.reject(error);
  }
);

const DEFAULT_CONFIG = {
  url: "",
  method: "get",
  bodyData: {},
  queryData: {},
  actionType: "",
  actionDataKey: "data",
  extendData: {},
  autoUrlPrefix: false, //是否自动补全URL前缀，比如/crm-lz-ls/api
  addAuthorization: true,
  successConfig: null, // {message: '', callback: function, isForceShow: false}
  failConfig: null // {message: '', callback: function, isForceShow: false}
};

const formatdata = responseData => {
  if (!isPlainObject(responseData.data)) {
    if (!isNullOrUndefined(responseData.data)) {
      responseData.data = {
        // 如果data不是{}对象，都被认为是丑陋的数据，封装到data中
        uglyData: responseData.data
      };
    } else {
      responseData.data = {};
    }
  }
  // 如果data只有一个data，则将data提升
  if (
    isPlainObject(responseData.data.data) &&
    Object.keys(responseData.data).length === 1
  ) {
    responseData.data = responseData.data.data;
  }
};
/**
 *
 * @desc get、post、drop等请求的response的通用处理器
 *
 * @param data { PlainObject } 后端返回的reponse, 格式为：
 *   {
      "data": {...},
      "success": false|true,
      "message": {
        "code": 504,
        "desc": '错误提示'
      }
    }
 *
 *
 */
const responseHandler = (dispatch, config) => {
  formatdata(config.responseData);
  // 后端返回的结果数据和前端发起请求时的额外数据，都会通过data发给请求处理完毕的回调函数
  config.responseData.data.extendData = config.extendData;
  if (config.responseData.code === '0000') {
    if (config.actionType) {
      dispatch({
        type: config.actionType,
        [config.actionDataKey]: config.responseData.pageSize
          ? config.responseData
          : config.responseData.data
      });
    }
    if (config.successConfig) {
      if (config.successConfig.message) {
        Toast.success(config.successConfig.message, TIPS_DURATION);
      }
      if (config.successConfig.callback) {
        config.successConfig.callback(
          config.responseData.pageSize
            ? config.responseData
            : config.responseData.data
        );
      }
    }
  } else if (config.responseData.code === '9999') {
    // 其它异常处理: 200的异常情况(success为false)、400、404、500(success标记位不存在)等
    if (!config.responseData.message) {
      config.responseData.message = {};
    }
    const errorMsg = config.responseData.message;
    const errorCode = config.responseData.message.code;
    if (errorMsg) {
      if (config.failConfig && config.failConfig.isForceShow) {
        // 判断是否强制执行前端自定义错误提示信息
        if (config.failConfig.message) {
          Toast.fail(config.failConfig.message, TIPS_DURATION);
        }
      } else {
        if (errorCode === 10006) {
          // 登录超时跳到登录界面
          Toast.fail(errorMsg, TIPS_DURATION);
          location.href = "/#/root";
        } else {
          Toast.fail(errorMsg, TIPS_DURATION);
        }
      }
    } else {
      // 如果后端没有默认的错误信息，则执行前端自定义错误提示信息
      if (config.failConfig) {
        if (config.failConfig.message) {
          Toast.fail(config.failConfig.message, TIPS_DURATION);
        }
      }
    }
    // 执行自定义的failCallback
    if (config.failConfig) {
      if (config.failConfig.callback) {
        config.failConfig.callback(config.responseData);
      }
    }
  }
};

/**
 * @desc 用于判断是否切换登录
 *
 */
const loginUserIsChanged = url => {
  const currentUser = JSON.parse(
    window.localStorage.getItem("currentUser") || "{}"
  );
  const userIdInput = document.querySelector("#userId");
  let userId = userIdInput.value;

  // excludeUrls包含不需要登录就可以访问的接口
  const excludeUrls = ["/api/account/login"];
  if (!excludeUrls.includes(url)) {
    if (currentUser.id && currentUser.id != userId) {
      document.querySelector("#userId").value = currentUser.id;
      // hashHistory.push('/main')
      Toast.fail("账号已重新登录，重新刷新页面", TIPS_DURATION);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const axiosHandler = config => {
  // if (loginUserIsChanged(url)) return

  config = Object.assign({}, DEFAULT_CONFIG, config);

  // 有些post接口也用query传值，有些奇葩，但是这里get、post、drop等都统一支持query传值
  if (config.queryData) {
    let str = "";
    if (typeof config.queryData === "object") {
      for (let key in config.queryData) {
        str += key + "=" + encodeURIComponent(config.queryData[key]) + "&";
      }
      if (Object.keys(config.queryData).length) {
        config.url = config.url + "?" + str.replace(/&$/, "");
      }
    }
  }
  // 自动补全URL前缀,不细颗粒度到每个接口控制mock状态
  if (config.autoUrlPrefix) {
    if (config.url.indexOf('/') === 0) {
      config.url = `${isMock()}${config.url}`
    } else {
      config.url = `${isMock()}/${config.url}`
    }
  }

  return dispatch => {
    let axiosConfig = {
      url: config.url,
      method: config.method
    };
    if (
      config.method.toLowerCase() === "post" ||
      config.method.toLowerCase() === "put"
    ) {
      // let contentType = "application/json";
      let contentType = "application/x-www-form-urlencoded";
      if (!(config.bodyData instanceof FormData)) {
        contentType = 'application/json'
      } else if (config.bodyData instanceof FormData && config.contentType === 'multipart/form-data') {
        contentType = 'multipart/form-data'
      } else if (config.bodyData instanceof FormData) {
        contentType = 'application/x-www-form-urlencoded'
        config.bodyData = [...config.bodyData.entries()].map((d) => `${d[0]}=${d[1]}`)
        config.bodyData = config.bodyData.join('&')
      }

      axiosConfig = Object.assign(axiosConfig, {
        headers: contentType ? { "content-type": contentType } : {},
        data: config.bodyData
      });
    }
    //添加 Authorization 自定义请求头
    const token = localStorage.getItem('bearer')
    if (token && config.addAuthorization) {
      //Bearer
      axiosConfig.headers['Authorization'] = `bearer ${token}`
    }
    //
    return axios(axiosConfig)
      .then(response => {
        // 200
        // if (response.config.url.indexOf("api/relation_graph") > -1) {
        //   response.data.data = response.data.data;
        //   // response.data.delete("data");
        // }
        // 1. 一种特殊的200，success为false
        // {"success":false,"message":{"code":10017,"desc":"用户名或密码错误"}}
        config.responseData = response.data;
        responseHandler(dispatch, config);
      })
      .catch(error => {
        // 400（坏请求），404, 500等，一些非http请求错误也会被捕获到

        // 1.未发送(举例如下)
        // error: {
        //   message: "Converting circular structure to JSON",
        //   stack: "TypeError: Converting circular structure to JSON↵    at JSON.stringify (<anonymous>)↵    at transformRequest (http://localhost:3000/static/js/0.chunk.js:4469:19)↵    at transform (http://localhost:3000/static/js/0.chunk.js:4404:12)↵    at Object.forEach (http://localhost:3000/static/js/0.chunk.js:5200:12)↵    at transformData (http://localhost:3000/static/js/0.chunk.js:4403:9)↵    at dispatchRequest (http://localhost:3000/static/js/0.chunk.js:4287:17)"
        // }

        // 2.已发送(400、404、500等，举例如下)
        //   error: {
        //     "config": {
        //         "transformRequest": {},
        //         "transformResponse": {},
        //         "timeout": 0,
        //         "xsrfCookieName": "XSRF-TOKEN",
        //         "xsrfHeaderName": "X-XSRF-TOKEN",
        //         "maxContentLength": -1,
        //         "headers": {
        //             "Accept": "application/json, text/plain, */*",
        //             "Content-Type": "application/json"
        //         },
        //         "method": "post",
        //         "url": "/crm-jj/api/business/createBusinessChance?",
        //         "data": "{\"businessStatus\":\"1\",\"cooperators\":[{\"id\":248,\"userNo\":\"248\",\"password\":null,\"name\":\"客户经理248号\",\"sex\":\"0\",\"status\":null,\"emplyPos\":null,\"emplyPost\":null,\"superEmplyNum\":null,\"idNumber\":null,\"phone\":null,\"email\":null,\"birthDt\":null,\"inPosDt\":null,\"belongOrgNum\":\"247\",\"belongOrg\":\"九江银行支行247号\",\"belongDeptNum\":null,\"belong_dept\":null,\"cont_addr\":null,\"leavePosDt\":null,\"enabledFlag\":null,\"updatedBy\":null,\"createdBy\":null,\"updatedDt\":null,\"createdDt\":null,\"orgId\":247,\"orgNo\":\"247\",\"isPerson\":true,\"zIndex\":4,\"personChecked\":true,\"username\":\"客户经理248号\"}],\"customerId\":\"30002\",\"customerName\":\"测试行内公司一号\",\"customerType\":\"1\",\"enable\":\"4\",\"executor\":248,\"name\":\"d\",\"remark\":\"\",\"schedulerDateIds\":[\"\"],\"validDt\":\"2019-03-26 21:57:00\"}"
        //     },
        //     "request": {},
        //     "response": {
        //         "data": {
        //             "success": false,
        //             "message": "field:[executor_org] message:[机构编号不能为空]"
        //         },
        //         "status": 400,
        //         "statusText": "Bad Request",
        //         "headers": {
        //             "date": "Tue, 26 Mar 2019 13:58:18 GMT",
        //             "content-encoding": "gzip",
        //             "x-powered-by": "Express",
        //             "vary": "Origin, Accept-Encoding",
        //             "content-type": "application/json;charset=UTF-8",
        //             "access-control-allow-origin": "http://localhost:5000",
        //             "transfer-encoding": "chunked",
        //             "connection": "close",
        //             "access-control-allow-credentials": "true",
        //             "x-application-context": "application:haizhi:8091"
        //         },
        //         "config": {
        //             "transformRequest": {},
        //             "transformResponse": {},
        //             "timeout": 0,
        //             "xsrfCookieName": "XSRF-TOKEN",
        //             "xsrfHeaderName": "X-XSRF-TOKEN",
        //             "maxContentLength": -1,
        //             "headers": {
        //                 "Accept": "application/json, text/plain, */*",
        //                 "Content-Type": "application/json"
        //             },
        //             "method": "post",
        //             "url": "/crm-jj/api/business/createBusinessChance?",
        //             "data": "{\"businessStatus\":\"1\",\"cooperators\":[{\"id\":248,\"userNo\":\"248\",\"password\":null,\"name\":\"客户经理248号\",\"sex\":\"0\",\"status\":null,\"emplyPos\":null,\"emplyPost\":null,\"superEmplyNum\":null,\"idNumber\":null,\"phone\":null,\"email\":null,\"birthDt\":null,\"inPosDt\":null,\"belongOrgNum\":\"247\",\"belongOrg\":\"九江银行支行247号\",\"belongDeptNum\":null,\"belong_dept\":null,\"cont_addr\":null,\"leavePosDt\":null,\"enabledFlag\":null,\"updatedBy\":null,\"createdBy\":null,\"updatedDt\":null,\"createdDt\":null,\"orgId\":247,\"orgNo\":\"247\",\"isPerson\":true,\"zIndex\":4,\"personChecked\":true,\"username\":\"客户经理248号\"}],\"customerId\":\"30002\",\"customerName\":\"测试行内公司一号\",\"customerType\":\"1\",\"enable\":\"4\",\"executor\":248,\"name\":\"d\",\"remark\":\"\",\"schedulerDateIds\":[\"\"],\"validDt\":\"2019-03-26 21:57:00\"}"
        //         },
        //         "request": {}
        //     },
        //     "message": "Request failed with status code 400",
        //     "stack": "Error: Request failed with status code 400↵    at createError (http://localhost:3000/static/js/0.chunk.js:4232:15)↵    at settle (http://localhost:3000/static/js/0.chunk.js:4374:12)↵    at XMLHttpRequest.handleLoad (http://localhost:3000/static/js/0.chunk.js:3774:7)"
        // }

        // {"success":false,"message":{"code":10017,"desc":"用户名或密码错误"}}
        // config.responseData = error.response || {message: error.message}
        config.responseData = {
          success: '9999',
          message: { desc: error.message }
        };
        responseHandler(dispatch, config);
      });
  };
};

export const get = config => {
  config.method = "GET";
  return axiosHandler(config);
};

export const drop = config => {
  config.method = "DELETE";
  return axiosHandler(config);
};

export const post = config => {
  config.method = "POST";
  return axiosHandler(config);
};
export const put = config => {
  config.method = "PUT";
  return axiosHandler(config);
};
