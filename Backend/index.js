const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({
  origin: 'https://gym-managment-zclb.vercel.app', 
  credentials: true, 
}));

// import routes

const userRoute = require("./Routes/UserRoute");
const traineeRoute = require("./Routes/TraineeRoute");
const attendanceRoute = require("./Routes/AttendanceRoute");
const trainerRoute = require("./Routes/TrainerRoute");





// use routes

app.use("/api/user", userRoute);
app.use("/api/trainee", traineeRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/trainer", trainerRoute);


require("dotenv").config();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);
mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
