
const express = require('express')
const { authControllerLoginFunc, authControllerSignupFunc } = require('../controllers/authController')
const router = express.Router()
// base route "/auth"

router.post("/login", authControllerLoginFunc)

router.post("/signup", authControllerSignupFunc)

module.exports = router