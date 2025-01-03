import express, { Request, Response } from 'express';
import { fetchUserPreferenceFunc, saveUserPreferencesFunc } from '../controllers/userPreferenceController';

const router = express.Router();

// Route to save user preferences
router.patch("/save-preferences", async (req: Request, res: Response) => {
  await saveUserPreferencesFunc(req, res);
});

// Route to fetch user preferences by username
router.get("/fetch-preference/:username", async (req: Request, res: Response) => {
  await fetchUserPreferenceFunc(req, res);
});

export default router;
