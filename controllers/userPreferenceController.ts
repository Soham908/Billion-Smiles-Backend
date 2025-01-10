import { Request, Response } from "express";
import userModel, { IUser } from "../models/userModel";

export const saveUserPreferencesFunc = async (req: Request, res: Response) => {
  const { userId, userCausePreferences } = req.body;
  try {
    console.log(userId);
    const savePreferRequest = await userModel.findByIdAndUpdate(
      userId,
      { userCausePreferences: userCausePreferences },
      { new: true }
    );
    console.log(savePreferRequest);
    res.json({ 
      success: true, message: "User preference saved", userData: savePreferRequest 
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Fetch user preferences
export const fetchUserPreferenceFunc = async (req: Request, res: Response) => {
  try {
    const username = req.params.username; // Assuming the username is passed in the URL params.
    const userPreferences = await userModel.findOne({ username }).select('userCausePreferences');

    if (!userPreferences) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.json({ success: true, message: "User preferences fetched", userPreferences });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
