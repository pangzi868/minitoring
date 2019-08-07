module.exports = function (router) {
  /**
   * 获取排行榜筛选器信息
   */
  router.post('/mock/shungkon/sendSMS', function (req, res, next) {
    res.json({
      "code": "0000",
      "message": "成功",
      "data": {"hash": 'asdfasdfasdfasdfasdf', "tamp": 'asdfasdfasdfasdfasdf'}
    })
  })
}
