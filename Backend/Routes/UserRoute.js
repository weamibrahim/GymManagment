
const { verifyToken } = require("../Middleware/Authentication"); 

const userController = require("../Controller/UserController");
const express = require("express");
const router = express.Router();


// router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/logout', userController.logout);




// router.put('/update/:id',verifyToken, userController.updateUserById);




module.exports = router;
