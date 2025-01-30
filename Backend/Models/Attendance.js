const  mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    traineeId: {
        type: Schema.Types.ObjectId,
        ref: "Trainee",
        required: true,
      },
      time : [
        { 
          type: Date,
          required: true,
          
        }
      ]
       ,

    });

module.exports = mongoose.model("Attendance", attendanceSchema);