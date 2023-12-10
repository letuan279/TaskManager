'use strict'

const express = require('express')
const verifyToken = require('../middlewares/checkAuth')
const router = express.Router()

router.use("/api/v1", require('./user'))
router.use("/api/v1", verifyToken, require('./task'))
router.use("/api/v1", verifyToken, require('./category'))

module.exports = router