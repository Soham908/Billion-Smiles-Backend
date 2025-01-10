import { Router } from "express";
import { ngoCreateNewCauseController } from "../controllers/ngoDataController";
const router = Router()

// base route: "/ngo-data"

router.post("/create-new-cause", ngoCreateNewCauseController)


export default router