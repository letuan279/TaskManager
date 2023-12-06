'use strict'

const express = require('express')
const taskController = require('../../controllers/task.controller')
const router = express.Router()
const validation = require('../../utils/task.validation')

router.post("/tasks/create", validation, taskController.store)
router.get("/tasks/:id", taskController.show)
router.delete("/tasks/:id", taskController.destroy)
router.put("/tasks/:id", validation, taskController.update)
router.post("/tasks", taskController.index)
router.get("/tasks/search/:startDate/:endDate", taskController.search)

module.exports = router
