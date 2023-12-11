'use strict'

const express = require('express')
const userController = require('../../controllers/user.controller')
const router = express.Router()
const verifyToken = require('../../middlewares/checkAuth')

router.get("/user/check", verifyToken, userController.checkUser)
router.post("/user/login", userController.login)
router.post("/user/register", userController.register)
router.post("/user/edit", verifyToken, userController.editProfile)

module.exports = router
