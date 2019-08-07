module.exports = function (router) {
  /**
   * 获取验证码
   */
  router.post('/mock/smsSendCode', function (req, res, next) {
    res.json({
      "code": "0000",
      "message": "成功",
      "data": { "hash": 'asdfasdfasdfasdfasdf', "tamp": 'asdfasdfasdfasdfasdf' }
    })
  })
  /**
   * 校验验证码
   */
  router.post('/mock/smsValidate', function (req, res, next) {
    res.json({
      "code": "0000",
      "message": "成功",
      "data": {}
    })
  })
}
