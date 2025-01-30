const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose); 

const Schema = mongoose.Schema;

const traineeSchema = new Schema({
  // yourNumber: {
  //   type: Number,
    
  // },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  subscriptionStartDate: {
    type: Date,
    required: true
    
  },
  subscriptionEndDate: {
    type: Date,
    required: true
  },
  subscriptionStatus: {
    type: String,
    enum: ["active", "warning", "inactive"],
    default: "active"
  },
  barcode: {
    type: String,
    unique: true
  },
});


// traineeSchema.plugin(AutoIncrement, {
//   inc_field: "yourNumber", 
//   startAt: 1,
//   incrementBy: 1  
// });

module.exports = mongoose.model("Trainee", traineeSchema);
