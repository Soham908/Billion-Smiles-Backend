import { Router } from "express";
import { createNewCauseController } from "../controllers/causeController";
const router = Router()

// base route: "/cause"

router.post("/create-new-cause", createNewCauseController)


export default router