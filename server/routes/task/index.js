'use strict'

const express = require('express')
const taskController = require('../../controllers/task.controller')
const router = express.Router()

router.post("/tasks", taskController.index)

module.exports = router
