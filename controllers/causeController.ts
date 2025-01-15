import { Request, Response } from "express";
import { Cause } from "../models/causeModel";
import User from "../models/userModel";

const convertToValidDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
};

export const createNewCauseController = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { causeTitle, description, category, location, volunteerDate, 
            numberOfVolunteers, amountRequired, ngoRef,ngoName } = req.body
        req.body.volunteerDate = convertToValidDate(volunteerDate);
        const newCauseResponse = await Cause.create(req.body);
        const updateUser = await User.findByIdAndUpdate(ngoRef, { $push: { causes: newCauseResponse._id } }, {new: true})
        console.log(updateUser);

        res.json({ success: true, message: "cause fetched", causeData: newCauseResponse });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "fetching failed" });
    }
};

export const fetchNgoCausesController = async (req: Request, res: Response) => {
  try {
    console.log(req.params)
    const fetchCauseResponse = await Cause.find(req.params.ngoId);

    res.json({ success: true, message: "cause fetched", causeData: fetchCauseResponse });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "fetching failed" });
  }
};