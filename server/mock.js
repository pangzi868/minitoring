
const express = require('express')
const router = express.Router()
const MODULE_PATH = '../src/store/modules'
require(`${MODULE_PATH}/minitoring/mock`)(router)
require(`${MODULE_PATH}/manager/mock`)(router)
require(`${MODULE_PATH}/login/mock`)(router)

module.exports = router
