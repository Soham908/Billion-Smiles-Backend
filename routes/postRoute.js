const express = require('express')
const { createPostController, fetchUserPostsController, fetchAllPostsController } = require('../controllers/postsController')
const router = express.Router()

// base route: "/posts"

router.post("/create-post", createPostController)

router.get("/fetch-user-posts/:userId", fetchUserPostsController)

router.get("/fetch-all-posts", fetchAllPostsController)

module.exports = router