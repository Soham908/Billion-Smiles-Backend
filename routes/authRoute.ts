import express, { Request, Response } from 'express';
import { authControllerLoginFunc, authControllerSignupFunc } from '../controllers/authController';

const router = express.Router();

// Define base route "/auth"
router.post("/login", (req: Request, res: Response) => authControllerLoginFunc(req, res));
router.post("/signup", (req: Request, res: Response) => authControllerSignupFunc(req, res));

export default router;
