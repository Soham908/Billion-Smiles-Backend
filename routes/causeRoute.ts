import { Router } from "express";
import { createNewCauseController, fetchNgoCausesController } from "../controllers/causeController";
const router = Router()

// base route: "/cause"

router.post("/create-new-cause", createNewCauseController)

router.get("/fetch-ngo-causes/:ngoId", fetchNgoCausesController)

export default router