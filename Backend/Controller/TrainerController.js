const Trainer = require("../Models/Trainer");

const trainerController = {};

trainerController.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find();
        res.status(200).json(trainers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

 trainerController.getNumberOfTrainer =async(req,res)=>{
    try {
      const trainers = await Trainer.countDocuments();
      res.status(200).json(trainers);
      console.log(trainers)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } 
  
trainerController.getTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) {
            return res.status(404).json({ message: "Trainer not found" });
        }
        res.status(200).json(trainer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

trainerController.addTrainer = async (req, res) => {
    try {
        const trainer = new Trainer(req.body);
        await trainer.save();
        res.status(201).json({ message: "Trainer added successfully" , trainer});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  

trainerController.updateTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!trainer) {
            return res.status(404).json({ message: "Trainer not found" });
        }
        res.status(200).json({ message: "Trainer updated successfully", trainer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  

trainerController.deleteTrainer = async (req, res) => { 
    try {
        const trainer = await Trainer.findByIdAndDelete(req.params.id);
        if (!trainer) {
            return res.status(404).json({ message: "Trainer not found" });
        }
        res.status(200).json({ message: "Trainer deleted successfully" });      
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};


module.exports = trainerController;