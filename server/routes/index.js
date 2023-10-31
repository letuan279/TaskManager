'use strict'

const express = require('express')
const router = express.Router()

router.use("/api/v1", require('./user'))
router.use("/api/v1", require('./task'))

module.exports = router