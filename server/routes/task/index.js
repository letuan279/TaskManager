'use strict'

const express = require('express')
const taskController = require('../../controllers/task.controller')
const router = express.Router()
const validation = require('../../utils/task.validation')

router.get("/tasks/auth-google", taskController.authGoogle)
router.post("/tasks/create", validation, taskController.store)
router.post("/tasks/createBulk/:category", taskController.storeBulk)
router.get("/tasks/google-task", taskController.googleTask)
router.get("/tasks/search/:startDate/:endDate", taskController.search)
router.get("/tasks/:id", taskController.show)
router.delete("/tasks/:id", taskController.destroy)
router.put("/tasks/:id", validation, taskController.update)
router.post("/tasks", taskController.index)

module.exports = router