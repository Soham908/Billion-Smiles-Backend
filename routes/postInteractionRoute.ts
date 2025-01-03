import express, { Request, Response } from 'express';
import { uploadCommentOnPostController, likePostController } from '../controllers/postInteractionController';

const router = express.Router();

// Base route "/posts/post-interaction"
router.post("/upload-comment-onpost", async (req: Request, res: Response) => {
  await uploadCommentOnPostController(req, res);
});

router.post("/like-post", async (req: Request, res: Response) => {
  await likePostController(req, res);
});

export default router;
