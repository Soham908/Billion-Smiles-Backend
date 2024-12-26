const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    id: Number,//auto generated
    image: String,//company will upload an image, i dunno what will be better, let them do it or give some predefined images
    campaignTitle: String,//company will input the campaign title
    campaignCause: String,//cause will be picked by the company
    startDate: String,//for now by default it will be the day company creates the campaign, in the future would allow to set a future date to pre set the campaign
    endDate: String,//company will set a due date
    campaignDescription: String,// company should fill this
    hashtags: [String],//optional, company can input their own or some random generated ones
    targetAmount: Number,// this will come from the company when they create the campaign
    amountRaised: Number,//based on the campagin completion and the target amount could calulcate this
    company: String,//from the company login 
    campaignManager: String, // these will come from the compan login person details
    contactEmail: String,
    ngo: String,//when the company selects the cause the ngo will auto fill from that cause
    location: String,// this will come from the cause
    progress: Number,//progress will be 0 at the beginning and when the campagin gets certain likes, it will increase, 
    campaignStatus: String, // it will be completed, ongoing or pre set for future date
  },
  {
    collection: "campaigns",
  }
);

module.exports = mongoose.model("campaigns", campaignSchema);
