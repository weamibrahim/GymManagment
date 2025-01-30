const express = require("express");
const router = express.Router();

const attendanceController = require("../Controller/AttendanceController");
const  verifyToken  = require("../Middleware/Authentication");


router.post("/add",verifyToken, attendanceController.addAttendanceByBarcode );

router.get("/all",verifyToken, attendanceController.getAllAttendances);


module.exports = router;