import { Request, Response } from "express";
import {ICampaign, Campaign} from '../models/campaignModel'

// Fetch Campaigns Controller
export const fetchCampaignsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const fetchAllCampaigns: ICampaign[] = await Campaign.find(); // Assuming find() returns ICampaign[]
    console.log(fetchAllCampaigns)
    res.json({
      success: true,
      message: "All campaigns fetched successfully",
      campaignsData: fetchAllCampaigns,
    });
  } catch (error: any) {
    console.error(error);
    res.json({
      success: false,
      message: "Campaign fetching failed",
    });
  }
};

export const incrementSupporterCountController = async (req: Request, res: Response): Promise<void> => {
  try {
    const supportCampaignResponse = await Campaign.findByIdAndUpdate(req.body.campaignId, { $inc: { supporterCount: 1 }, $push: { supporterUsersRef: req.body.userId } }, { new: true })
    console.log(supportCampaignResponse)
    res.json({ success: true, message: "campaign supported", campaignData: supportCampaignResponse })
  } catch (error) {
    res.json({ success: false, message: "support failed, try again" })
  }
}
