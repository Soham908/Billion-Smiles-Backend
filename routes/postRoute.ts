import express, { Request, Response } from 'express';
import { createPostController, fetchUserPostsController, fetchAllPostsController } from '../controllers/postsController';

const router = express.Router();

// Base route "/posts"
router.post("/create-post", async (req: Request, res: Response) => {
  await createPostController(req, res);
});

router.get("/fetch-user-posts/:userId", async (req: Request, res: Response) => {
  await fetchUserPostsController(req, res);
});

router.get("/fetch-all-posts", async (req: Request, res: Response) => {
  await fetchAllPostsController(req, res);
});

export default router;
