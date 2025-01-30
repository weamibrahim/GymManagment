const express = require("express");
const router = express.Router();

const trainerController = require("../Controller/TrainerController");
const  verifyToken  = require("../Middleware/Authentication");


router.get("/all",verifyToken, trainerController.getAllTrainers);
router.get("/sumOfTrainer",verifyToken,trainerController.getNumberOfTrainer)

router.get("/:id",verifyToken, trainerController.getTrainerById);

router.post("/add",verifyToken, trainerController.addTrainer);

router.put("/update/:id",verifyToken, trainerController.updateTrainer);

router.delete("/delete/:id",verifyToken, trainerController.deleteTrainer);

module.exports = router;