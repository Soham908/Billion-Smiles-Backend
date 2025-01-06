import { Request, Response } from "express";
import Post, { IPost } from "../models/postsModel";

export const uploadCommentOnPostController = async (req: Request, res: Response) => {
  try {
    const { postId, userId, commentText, commentUsername } = req.body;

    if (!postId || !userId || !commentText || !commentUsername) {
      return res.status(400).json({ message: "postId, userId, and commentText are required" });
    }

    const post: IPost | null = await Post.findById(postId).populate("userId").populate("campaignId");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      userId: userId,
      commentText: commentText,
      commentUsername: commentUsername,
    };

    post.comments.push(newComment);
    await post.save();

    res.status(200).json({ message: "Comment added successfully", updatedPost: post, success: true });
  } catch (error: any) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const likePostController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId, userId, likedUsername } = req.body;
    console.log(req.body);
    const post: IPost | null = await Post.findById(postId).populate('userId').populate('campaignId');

    if (!post) {
      throw new Error("Post not found");
    }

    const hasLiked = post.likedBy.some((like) => like.userId.toString() === userId.toString());

    if (hasLiked) {
      post.likes -= 1;
      post.likedBy = post.likedBy.filter((user) => user.userId.toString() !== userId.toString());
    } else {
      post.likes += 1;
      post.likedBy.push({ userId: userId, likedUsername: likedUsername });
    }

    await post.save();
    console.log(post)
    res.json({
      message: "Like done",
      success: true,
      updatedPost: post,
    });
  } catch (error: any) {
    console.error(`Error liking post: ${error.message}`);
    res.status(500).json({ message: `Error liking post: ${error.message}` });
  }
};
