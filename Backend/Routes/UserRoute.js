
const { verifyToken } = require("../Middleware/Authentication"); 

const userController = require("../Controller/UserController");
const express = require("express");
const router = express.Router();


// router.post('/register', userController.register);
router.post('/login', userController.login);




// router.put('/update/:id',verifyToken, userController.updateUserById);




module.exports = router;
