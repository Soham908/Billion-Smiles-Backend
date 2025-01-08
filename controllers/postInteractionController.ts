import { Request, Response } from "express";
import Post, { IPost } from "../models/postsModel";
import { Campaign } from "../models/campaignModel";
import { ActivityLog } from "../models/activityLogModel";

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
    const { postId, userId, likedUsername, campaignId } = req.body;
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
    // for now doing such that whenever someone likes an post related to a specific campaign and logo pops up, the progress shall be updated
    // regardless if the user has done it first time or mnay times, will change it later
    if(!hasLiked){
      const progressUpdate = await Campaign.findById(campaignId)
      if(!progressUpdate) throw new Error("campaign not found")
      if (progressUpdate.campaignStatus !== 'Completed')
      {
        progressUpdate.amountRaised += progressUpdate.targetAmount/progressUpdate.targetLikes
        progressUpdate.progress = parseInt((progressUpdate.amountRaised/progressUpdate.targetAmount * 100).toFixed(0))
        if (progressUpdate.progress === 100) {
          progressUpdate.campaignStatus = "Completed"
          const activityLog = await ActivityLog.create({ campaignId: campaignId, companyId: progressUpdate.companyRef, campaignTitle: progressUpdate.campaignTitle, message: "Congrats ! The campaign was completed.", activityType: "Campaign Completed" })
        }
        await progressUpdate.save()
      }
      console.log(progressUpdate)
    }
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
