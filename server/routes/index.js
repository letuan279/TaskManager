'use strict'

const express = require('express')
const router = express.Router()

router.use("/api/v1", require('./user'))
router.use("/api/v1", require('./task'))
router.use("/api/v1", require('./category'))

module.exports = router