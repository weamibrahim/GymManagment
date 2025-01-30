const Trainee = require("../Models/Trainee");
const Attendance = require("../Models/Attendance");
const cron = require("node-cron");
const shortid = require("shortid");

cron.schedule("0 0 * * *", async () => {
  try {
    const today = new Date();

  
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() + 2);

  
    const todayFormatted = today.toISOString().split("T")[0];
    const twoDaysAgoFormatted = twoDaysAgo.toISOString().split("T")[0];
    console.log(twoDaysAgoFormatted);

   
    await Trainee.updateMany(
      {
        subscriptionEndDate: { $eq: todayFormatted },
      },
      {
        $set: { subscriptionStatus: "inactive" },
      }
    );

    const trainees = await Trainee.updateMany(
      {
        subscriptionEndDate: { $eq: twoDaysAgoFormatted },
      },
      {
        $set: { subscriptionStatus: "warning" },
      }
    );

    console.log(trainees);
  } catch (error) {
    console.error("Error updating trainee statuses:", error);
  }
});
// const { v4: uuidv4 } = require('uuid');
const traineeController = {};

const bwipjs = require("bwip-js");
traineeController.getAllTrainees = async (req, res) => {
  try {
    const trainees = await Trainee.find();
    res.status(200).json(trainees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

traineeController.getNumberOfTrainee = async (req, res) => {
  try {
    const trainees = await Trainee.countDocuments();
    res.status(200).json(trainees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

traineeController.getTraineeById = async (req, res) => {
  try {
    const trainee = await Trainee.findById(req.params.id);
    if (!trainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }
    res.status(200).json(trainee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

traineeController.addTrainee = async (req, res) => {
  try {
    console.log(req.body);
    // const barcode = uuidv4();
    const trainee = new Trainee(req.body);
    await trainee.save();
    trainee.barcode = shortid.generate();
    // trainee.barcode = `${trainee.yourNumber}`;
    await trainee.save();

    res.status(201).json({ message: "Trainee added successfully", trainee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

traineeController.getTraineeByBarcode = async (req, res) => {
  const { value } = req.params;
  console.log(value);

  bwipjs.toBuffer(
    {
      bcid: "code128", 
      text: value, 
      scale: 3, 
      height: 10, 
      includetext: true, 
      textxalign: "center",
    },
    (err, png) => {
      if (err) {
        res.status(500).send("Error generating barcode");
      } else {
        res.set("Content-Type", "image/png");
        res.send(png);
      }
    }
  );
};
traineeController.updateTrainee = async (req, res) => {
  try {
    const { regenerateBarcode } = req.body;
    const updateData = { ...req.body };

    //console.log(regenerateBarcode)

    if (regenerateBarcode === true) {
      // updateData.barcode = uuidv4();
      const trainee = await Trainee.findById(req.params.id);

      if (!trainee) {
        return res.status(404).json({ message: "Trainee not found" });
      }

     
      // updateData.barcode = `BAR-${trainee.yourNumber}`;
      updateData.barcode = shortid.generate();
    }

    const trainee = await Trainee.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!trainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    res.status(200).json({ message: "Trainee updated successfully", trainee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

console.log(traineeController);

traineeController.deleteTrainee = async (req, res) => {
  try {
    await Attendance.deleteMany({ traineeId: req.params.id });
    const trainee = await Trainee.findByIdAndDelete(req.params.id);
    if (!trainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }
    res.status(200).json({ message: "Trainee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = traineeController;
