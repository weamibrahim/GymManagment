const express = require("express");
const router = express.Router();

const traineeController = require("../Controller/TraineeController");
const verifyToken  = require("../Middleware/Authentication");



router.get("/all",verifyToken, traineeController.getAllTrainees);

router.get("/sumOfTrainee",verifyToken,traineeController.getNumberOfTrainee)
router.get("/:id",verifyToken, traineeController.getTraineeById);

router.post("/add",verifyToken, traineeController.addTrainee);

router.get("/barcode/:value",traineeController.getTraineeByBarcode);

router.put("/update/:id",verifyToken, traineeController.updateTrainee);

router.delete("/delete/:id",verifyToken, traineeController.deleteTrainee);

module.exports = router;