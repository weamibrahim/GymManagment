const Trainee = require("../Models/Trainee");
const Attendance = require("../Models/Attendance");

const attendanceController = {};

attendanceController.addAttendanceByBarcode = async (req, res) => {
  try {
    const { barcode } = req.body;

    const trainee = await Trainee.findOne({ barcode });

    if (!trainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }
    let attendance = await Attendance.findOne({ traineeId: trainee._id });
    switch (trainee.subscriptionStatus) {
      case "inactive":
        return res.status(400).json({ message: "Trainee is inactive" });

      case "warning":
        if (!attendance) {
          const newAttendance = new Attendance({ traineeId: trainee._id , time: [new Date()] });
          await newAttendance.save();
          return res
            .status(201)
            .json({ message: "Trainee has a warning and attendance recorded" });
        } else {
          attendance.time.push(new Date());
          await attendance.save();
          return res
            .status(201)
            .json({ message: "Trainee has a warning and attendance updated" });
        }

      case "active":
        if (!attendance) {
          const newAttendance = new Attendance({ traineeId: trainee._id, time: [new Date()] });
          await newAttendance.save();
          return res
            .status(200)
            .json({ message: "Attendance recorded successfully" });
        } else {
          attendance.time.push(new Date());
          await attendance.save();
          return res
            .status(200)
            .json({ message: "Attendance updated successfully" });
        }
    }
  } catch (error) {
    console.error("Error adding attendance:", error);
    res.status(500).json({ message: "Server error." });
  }
};

attendanceController.getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find().populate("traineeId");
    res.status(200).json(attendances);
  } catch (error) {
    console.error("Error fetching attendances:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = attendanceController;
