import express, { Request, Response } from 'express';
import { authControllerLoginFunc, authControllerSignupFunc, saveNgoDetailsController } from '../controllers/authController';

const router = express.Router();

// Define base route "/auth"
router.post("/login", authControllerLoginFunc);
router.post("/signup", authControllerSignupFunc);

router.post("/ngo-details", saveNgoDetailsController)

export default router;
