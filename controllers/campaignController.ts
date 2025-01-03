import { Request, Response } from "express";
import {ICampaign, Campaign} from '../models/campaignModel'

// Fetch Campaigns Controller
export const fetchCampaignsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const fetchAllCampaigns: ICampaign[] = await Campaign.find(); // Assuming find() returns ICampaign[]
    res.json({
      success: true,
      message: "All campaigns fetched successfully",
      campaigns: fetchAllCampaigns,
    });
  } catch (error: any) {
    console.error(error);
    res.json({
      success: false,
      message: "Campaign fetching failed",
    });
  }
};
