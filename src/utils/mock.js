import { configData } from './config'
// 用于控制整个系统是否统一使用mock
const IS_MOCK_ALL = false

export const mockClosure = (is_mock_current_module) => {
  return (is_mock_current_api) => {
    // 防止打包时忘记修改
    if(process.env.NODE_ENV === 'production'){
      return configData.API_PREFIX
    } else {
      return (IS_MOCK_ALL || is_mock_current_module || is_mock_current_api) ? `/mock${configData.API_PREFIX}` : configData.API_PREFIX
    }
  }
}
