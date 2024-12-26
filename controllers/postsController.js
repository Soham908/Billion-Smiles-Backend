const Post = require("../models/postsModel");
const userModel = require("../models/userModel");


exports.createPostController = async (req, res) => {
    console.log(req.body);
    
    const createPostRequest = await Post.create(req.body)
    console.log(createPostRequest);
    
    const userPosts = await Post.find({ userId: req.body.userId });
    if (userPosts.length === 1) {
      await userModel.updateOne(
        { _id: req.body.userId },
        { $push: { badgesEarned: "First Post Pioneer" } }
      );
    }

    res.json({
        success: true,
        message: "post creation done",
        postData: createPostRequest
    })
}

exports.fetchUserPostsController = async (req, res) => {
    // console.log(req.params);
    
    const fetchPostRequest = await Post.find({ userId: req.params.userId })
    .populate('userId').populate('campaignId')

    console.log(fetchPostRequest);


    res.json({
        success: true,
        message: "user post fetched",
        fetchPostRequest
    })
}

exports.fetchAllPostsController = async (req, res) => {
    const fetchPostAllRequest = await Post.find().populate('userId').populate('campaignId').sort({ createdAt: -1 })
    console.log(fetchPostAllRequest);
    
    res.json({
        success: true,
        message: "all posts fetched",
        allPosts: fetchPostAllRequest
    })
}
