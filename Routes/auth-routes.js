const express = require("express")
const router = express.Router()
const authController = require("../Controllers/auth-controller")

//@endpoint http://localhost:8000/api/register
router.post("/register", authController.register)
router.post("/login", authController.login)





module.exports = router