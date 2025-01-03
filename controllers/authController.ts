import { Request, Response } from "express";
import userModel, { IUser } from "../models/userModel"; // Assuming IUser is defined in the model

// Login Controller
export const authControllerLoginFunc = async (req: Request, res: Response): Promise<void> => {
  const incomingData: { username: string; password: string } = req.body; // Define type for incomingData
  try {
    const loginRequest = await userModel.findOne({ username: incomingData.username });

    if (loginRequest) {
      if (loginRequest.password === incomingData.password) {
        res.json({
          username: loginRequest.username,
          password: loginRequest.password,
          userPreferences: loginRequest.userCausePreferences,
          badgesEarned: loginRequest.badgesEarned,
          userId: loginRequest.id,
          success: true,
          message: "Login done",
        });
      } else {
        res.json({ success: false, message: "Wrong user or password" });
      }
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error: any) { // Add proper type for error
    console.error(error);
    res.status(500).json({ success: false, message: "Error occurred during login" });
  }
};

// Signup Controller
export const authControllerSignupFunc = async (req: Request, res: Response): Promise<void> => {
  try {
    const checkUser = await userModel.findOne({ username: req.body.username });
    if (checkUser) {
      res.json({
        message: "User already exists",
        success: false,
      });
    } else {
      const register = await userModel.create({
        username: req.body.username,
        password: req.body.password,
        badgesEarned: ["Welcome Changemaker"],
      });
      console.log(register);

      res.json({
        success: true,
        message: "User registration done",
        username: register.username,
        badgesEarned: register.badgesEarned,
        userId: register.id,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.json({
      success: false,
      message: `Error occurred: ${error.message}`,
    });
  }
};
