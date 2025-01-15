import { Request, Response } from "express";
import userModel, { IUser } from "../models/userModel";
import User from "../models/userModel";

export const authControllerLoginFunc = async (req: Request, res: Response): Promise<void> => {
  const incomingData: { username: string; password: string } = req.body;
  try {
    const loginRequest = await userModel.findOne({ username: incomingData.username });
    console.log(loginRequest, req.body)
    if (loginRequest) {
      if (loginRequest.password === incomingData.password) {
        res.json({
          success: true, message: "Login done", userData: loginRequest
        });
        console.log(loginRequest)

      } else {
        res.json({ success: false, message: "Wrong user or password" });
      }

    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error occurred during login" });
  }
};

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
        success: true, message: "Signup done", userData: register
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

export const saveNgoDetailsController = async (req: Request, res: Response): Promise<void> => {
  try {

    console.log(req.body);
    const ngoDetailsResponse = await User.findByIdAndUpdate(req.body.userId, 
      { userType: "NGO", ngoDetails: { ngoName: req.body.ngoName, 
        ngoRegisteration: req.body.ngoRegisteration } }, { new: true })
      console.log(ngoDetailsResponse);
    res.json({
      success: true, message: "NGO updation done", userData: ngoDetailsResponse
    })
  } catch (error) {
    console.log(error);
    res.json({
      success: false, message: "error: " + error
    })
  }
}
