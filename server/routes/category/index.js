'use strict'

const express = require('express')
const categoryController = require('../../controllers/category.controller')
const validation = require('../../utils/category.validation')
const router = express.Router()

router.post("/categories/create", validation, categoryController.store)
router.post("/categories", categoryController.index)
router.get("/categories/:id", categoryController.show)
router.put("/categories/:id", validation, categoryController.update)
router.delete("/categories/:id", categoryController.destroy)

module.exports = router