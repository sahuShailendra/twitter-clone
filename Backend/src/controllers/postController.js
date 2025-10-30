const e = require("express");
const postModel = require("../models/post.Model");
const userModel = require("../models/user.Model");
const followModel = require("../models/follow.model")
const imagekit = require("../services/storage.service");
const { v4: uuid } = require("uuid");

// createPost
async function createPost(req, res) {
  try {
    const userid = req.user.id; //id from authmiddleware
    const { content } = req.body;
    let imageUrl = {}; //default null

    //if there is an image, upload it to imagekit
    if (req.file) {
      const uploadImageResult = await imagekit.uploadImage(
        req.file.buffer,
        uuid()
      );
      imageUrl = {
        url: uploadImageResult.url,
        fileId: uploadImageResult.fileId,
      };
    }

    //create post
    const newPost = await postModel.create({
      user: userid,
      content,
      image: imageUrl,
    });
    const totalPosts = await userModel.findByIdAndUpdate(
      userid,
      { $inc: { postCount: 1 } },
      { new: true }
    );
    //return response
    return res
      .status(201)
      .json({ message: "Post created successfully", post: newPost, data: totalPosts, success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error cre", err: err.message });
  }
}
// updatePost,
async function updatePost(req, res) {
  try {
    const postId = req.params.id; //id from url
    const userId = req.user.id; //id from authmiddleware
    const { content } = req.body;

    //find the post first
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }
    //check if the user is the owner of the post
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    //delete the old image from imagekit if new exists
    let imageUrl = post.image; //default to existing image
    if (req.file) {
      if (post.image && post.image.fileId) {
        await imagekit.deleteImage(post.image.fileId);
      }
      //upload the new image
      const uploadImageResult = await imagekit.uploadImage(
        req.file.buffer,
        uuid()
      );
      imageUrl = {
        url: uploadImageResult.url,
        fileId: uploadImageResult.fileId,
      };
    }

    //update the post
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      {
        $set: {
          content: content || post.content,
          image: imageUrl,
        },
      },
      { new: true } //return the updated document
    );

    // responce
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error upd", err: err.message });
  }
}
// deletePost
async function deletePost(req, res) {
  try {
    const postId = req.params.id; //id from url
    const userId = req.user.id; //id from authmiddleware

    //find the post first
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }
    //check if the user is the owner of the post
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }
    //delete the image from imagekit if exists
    if (post.image && post.image.fileId) {
      await imagekit.deleteImage(post.image.fileId);
    }
    //delete the post
    await postModel.findByIdAndDelete(postId);
    await userModel.findByIdAndUpdate(
      userId,
      { $inc: { postCount: -1 } },
      { new: true }
    );

    // responce
    return res.status(200).json({ message: "Post deleted successfully", success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error del", err: err.message });
  }
}
//get all posts
async function allPosts(req, res) {
  try {
    const posts = await postModel
      .find() // Fetch all posts
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .populate("user", "name username avater") // Populate user details (name and username)
      .lean(); // Convert Mongoose documents to plain JS objects

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
}
//get single post
async function singlePost(req, res) {
  try {
    const postId = req.params.id; //id from url
    const post = await postModel
      .findById(postId)
      .populate("user", "name username avater") // Populate user details (name and username)
      .lean(); // Convert Mongoose documents to plain JS objects

    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }
    return res.status(200).json({
      message: "Post fetched successfully",
      post: post,
      success: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error single", err: err.message });
  }
}
//get posts by user
async function postsByUser(req, res) {
  try {
    const userId = req.params.id; //id from url
    const posts = await postModel
      .find({ user: userId }) // Fetch posts by user
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .populate("user", "name username avater") // Populate user details (name and username)
      .lean(); // Convert Mongoose documents to plain JS objects

    // If no posts found, return an empty array with a message
    if (posts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No posts found for this user",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error byuser", err: err.message });
  }
}
//get posts by folllowing users
async function postsByFollowing(req, res) {
  try {
    const userId = req.user.id; //id from authmiddleware
    //get the list of following users
    const user = await followModel.find({ follower: userId}).select("following -_id"); //select only following field
    const followings = user.map((f) => f.following); //extract following ids
    followings.push(userId); //include own posts

    const posts = await postModel
      .find({user: {$in: followings}}) // Fetch posts by following users $in operator
      .sort({createdAt: -1}) // Sort by creation date (newest first)
      .populate("user", "name username avater") // Populate user details (name and username)
      .lean(); // Convert Mongoose documents to plain JS objects

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
    });
  }catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error byfollow", err: err.message });
  }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  allPosts,
  singlePost,
  postsByUser,
  postsByFollowing,
};
