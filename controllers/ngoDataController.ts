import { Request, Response } from "express";
import { Cause } from "../models/causeModel";

const convertToValidDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
};

export const ngoCreateNewCauseController = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        req.body.volunteerDate = convertToValidDate(req.body.volunteerDate);
        const newCauseResponse = await Cause.create(req.body);
        console.log(newCauseResponse);

        res.json({ success: true, message: "cause fetched", causeData: newCauseResponse });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "fetching failed" });
    }
};
