const express = require("express")
const router = express.Router()

//import controller
const userController = require("../Controllers/user-controller")


// @Endpoint http://localhost:8000/api/users
router.get('/users', userController.listUsers)
router.patch('/user/update-role', userController.updateRole)
router.delete('/user/:id', userController.deleteUser)

module.exports = router