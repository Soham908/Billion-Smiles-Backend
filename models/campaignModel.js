const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    id: Number,
    image: String,
    title: String,
    cause: String,
    progress: Number,
    date: String,
    hashtags: [String],
    company: String,
    ngo: String,
    description: String,
    location: String,
    targetAmount: Number,
    amountRaised: Number,
    campaignManager: String,
    contactEmail: String,
  },
  {
    collection: "campaigns",
  }
);

module.exports = mongoose.model("campaigns", campaignSchema);
