const express = require("express")
const router = express.Router()
const authController = require("../Controllers/auth-controller")
const { registerSchema, loginSchema, validateWithZod } = require("../Middlewares/validators")

//@endpoint http://localhost:8000/api/register
router.post("/register", validateWithZod(registerSchema), authController.register)
router.post("/login", validateWithZod(loginSchema), authController.login)

// export
module.exports = router