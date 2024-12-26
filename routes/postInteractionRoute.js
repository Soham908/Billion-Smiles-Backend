const express = require('express')
const { uploadCommentOnPostController, likePostController } = require('../controllers/postInteractionController')
const router = express.Router()

// base route -> "/posts/post-interaction"

router.post("/upload-comment-onpost", uploadCommentOnPostController)

router.post("/like-post", likePostController)

module.exports = router