import express, { Request, Response } from 'express';
import { fetchCampaignsController } from '../controllers/campaignController';

const router = express.Router();

// Base route "/campaign"
router.get("/fetch-campaigns", async (req: Request, res: Response) => {
  await fetchCampaignsController(req, res);
});

export default router;
