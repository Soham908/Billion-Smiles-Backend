const campaignModel = require("../models/campaignModel")


exports.fetchCampaignsController = async (req, res) => {    
    try {
        const fetchAllCampaigns = await campaignModel.find()
        res.json({
            success: true,
            message: "all campaigns fetched successfully",
            campaigns: fetchAllCampaigns
        })
    } catch (error) {
        res.json({
            success: false,
            message: "campaign fetching failed"
        })
    }
}
