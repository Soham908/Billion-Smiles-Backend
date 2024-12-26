const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    userCausePreferences: { type: [String], default: [] },
    badgesEarned: { type: [String], default: [] }
  },
  {
    collection: "userData",
  }
);

module.exports = mongoose.model("userModel", userSchema);
