const express = require("express");
const { createPost, updatePost, deletePost, allPosts, singlePost, postsByUser, postsByFollowing} = require("../controllers/postController");
const { toggleLike } = require("../controllers/toggleController");
const { authMiddleware } = require("../middleware/auth.middleware");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post("/post/create", authMiddleware, upload.single("file"), createPost); // create a post
router.put("/post/update/:id", authMiddleware, upload.single("file"), updatePost); // update a post
router.delete("/post/delete/:id", authMiddleware, deletePost);     // delete a post
router.get("/post/allposts", authMiddleware, allPosts);                   // get all posts
router.get("/post/:id", authMiddleware, singlePost);             // get single post by id
router.get("/post/user/:id", authMiddleware, postsByUser);     // get posts by user id
router.get("/post/following", authMiddleware, postsByFollowing); // get posts by following users

// Like and Unlike a post
router.post("/post/like/:id", authMiddleware, toggleLike); // like or unlike a post

module.exports = router;
