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

const formatPayload = responseData => {
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
  formatPayload(config.responseData);
  // 后端返回的结果数据和前端发起请求时的额外数据，都会通过payload发给请求处理完毕的回调函数
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
      let contentType = "application/json";

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
        config.responseData = response.data;
        responseHandler(dispatch, config);
      })
      .catch(error => {
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
