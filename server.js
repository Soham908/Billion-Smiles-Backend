const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const authRoute = require('./routes/authRoute')
const userPreferenceRoute = require('./routes/userPreferenceRoute')
const campaignRoute = require('./routes/campaignRoute')
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(cors());


app.use("/auth", authRoute)
app.use("/user-cause-preference", userPreferenceRoute)
app.use("/campaign", campaignRoute)


app.get("/", (req, res) => {
  console.log('reached the backend of billion smiles');
  res.json({ message: 'reached backend of billion smiles' })
})

app.listen(3001, () => {
  console.log("server has started on port " + 3001);
});
