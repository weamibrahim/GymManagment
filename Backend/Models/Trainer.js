const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const trainerSchema = new Schema({
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
  }
  ,
  Experience: {
    type: Number,
    required: true
  },
  joinDate: {
    type: Date,
    required: true
  }
  
});

module.exports = mongoose.model("Trainer", trainerSchema);
