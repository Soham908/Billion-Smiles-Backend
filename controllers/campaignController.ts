import { Request, Response } from "express";
import {ICampaign, Campaign} from '../models/campaignModel'
import { ActivityLog } from "../models/activityLogModel";
import Company from "../models/companyModel"
// Fetch Campaigns Controller
export const fetchCampaignsController = async (req: Request, res: Response): Promise<void> => {
  try {
    Company.findById("")
    const fetchAllCampaigns: ICampaign[] = await Campaign.find().populate('companyRef'); // Assuming find() returns ICampaign[]
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
    const { campaignId, userId } = req.body
    const supportCampaignResponse = await Campaign.findByIdAndUpdate(req.body.campaignId, { $inc: { supporterCount: 1 }, $push: { supporterUsersRef: req.body.userId } }, { new: true }).populate('companyRef')
    console.log(supportCampaignResponse)
    const activityLog = await ActivityLog.create({ campaignId: campaignId, campaignTitle: supportCampaignResponse?.campaignTitle, companyId: supportCampaignResponse?.companyRef, activityType: "New Supporter", message: "Congrats you have received a new supporter" })
    console.log(activityLog);
    res.json({ success: true, message: "campaign supported", campaignData: supportCampaignResponse })
  } catch (error) {
    res.json({ success: false, message: "support failed, try again" })
  }
}
