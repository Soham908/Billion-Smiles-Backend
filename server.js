const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require('./routes/authRoute')
const userPreferenceRoute = require('./routes/userPreferenceRoute')
const campaignRoute = require('./routes/campaignRoute')
const postRoute = require("./routes/postRoute")
const commentRoute = require("./routes/postInteractionRoute")

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
app.use("/posts", postRoute)
app.use("/posts/post-interaction", commentRoute)


app.get("/", (req, res) => {
  res.json({ message: 'reached backend of billion smiles' })
})

app.listen(process.env.PORT, () => {
  console.log("server has started on port " + process.env.PORT);
});
