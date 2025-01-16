import { Request, Response } from "express";
import Post, { IPost } from "../models/postsModel";
import userModel from "../models/userModel";

export const createPostController = async (req: Request, res: Response): Promise<void> => {
  try {    
    console.log(req.body);
    const createPostRequest: IPost = await Post.create(req.body);
    
    // for giving first badge
    const userPosts = await Post.find({ userId: req.body.userId });
    if (userPosts.length === 1) {
      await userModel.updateOne(
        { _id: req.body.userId },
        { $push: { badgesEarned: "First Post Pioneer", userPostsRef: createPostRequest._id } }
      );
    } else {
      await userModel.updateOne({ _id: req.body.userId }, { $push: { userPostsRef: createPostRequest._id }})
    }
    
    console.log(createPostRequest)

    res.json({
      success: true,
      message: "Post creation done",
      postData: createPostRequest,
    });
  } catch (error: any) {
    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: `Error creating post: ${error.message}`,
    });
  }
};

export const fetchUserPostsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const fetchPostRequest: IPost[] = await Post.find({ userId: req.params.userId })
      .populate("userId")
      .populate("campaignId");

    res.json({
      success: true,
      message: "User posts fetched",
      userPosts: fetchPostRequest,
    });
  } catch (error: any) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user posts",
    });
  }
};

export const fetchAllPostsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const fetchPostAllRequest: IPost[] = await Post.find()
      .populate("userId")
      .populate("campaignId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "All posts fetched",
      allPosts: fetchPostAllRequest,
    });
  } catch (error: any) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching all posts",
    });
  }
};
