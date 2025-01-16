import { Router } from "express";
import { createNewCauseController, fetchNgoCausesController, supportCauseByUserController } from "../controllers/causeController";
const router = Router()

// base route: "/cause"

router.post("/create-new-cause", createNewCauseController)

router.get("/fetch-ngo-causes/:ngoId", fetchNgoCausesController)

router.post("/support-cause-by-user", supportCauseByUserController)

export default router