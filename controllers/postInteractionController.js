const mongoose = require("mongoose");
const Post = require("../models/postsModel");

exports.uploadCommentOnPostController = async (req, res) => {
  try {
    const { postId, userId, commentText, commentUsername } = req.body;

    if (!postId || !userId || !commentText || !commentUsername) {
      return res.status(400).json({ message: "postId, userId, and commentText are required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      userId: userId,
      commentText: commentText,
      commentUsername: commentUsername
    };

    post.comments.push(newComment);
    await post.save();

    res.status(200).json({ message: "Comment added successfully", post, success: true });
    
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: "Server error", error });
  }
};


exports.likePostController = async (req, res) => {
  try {
    const { postId, userId, likedUsername } = req.body
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error('Post not found');
    }

    const hasLiked = post.likedBy.some(like => like.userId.toString() === userId.toString());
    console.log(hasLiked);
    
    if (hasLiked) {
      post.likes -= 1;
      post.likedBy = post.likedBy.filter((user) => user.userId.toString() !== userId.toString());
    } else {
      post.likes += 1;
      post.likedBy.push({userId: userId, likedUsername: likedUsername})
    }

    await post.save();
    res.json({
      message: "like done",
      success: true,
      post
    })
  } catch (error) {
    throw new Error(`Error liking post: ${error.message}`);
  }
}
