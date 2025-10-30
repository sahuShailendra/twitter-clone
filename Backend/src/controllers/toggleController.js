const mongoose = require("mongoose");
const likeModel = require("../models/like.model");
const postModel = require("../models/post.Model");
const followModel = require("../models/follow.model");
const userModel = require("../models/user.Model");

// Toggle Like/Unlike a post
async function toggleLike(req, res) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const postId = req.params.id; //id from url
    const userId = req.user.id; //id from authmiddleware

    //check if a like already exists
    const existingLike = await likeModel
      .findOne({ user: userId, post: postId })
      .session(session);

    //if exists, remove the like (unlike)
    if (existingLike) {
      await likeModel.findByIdAndDelete(existingLike._id).session(session);
      const updatePost = await postModel
        .findByIdAndUpdate(postId, { $inc: { likeCount: -1 } }, { new: true })
        .session(session);

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        success: true,
        message: "Post unliked successfully",
        data: updatePost,
      });
    }

    //if not exists, create a new like
    await likeModel.create({ user: userId, post: postId }).session(session);
    const updatePost = await postModel
      .findByIdAndUpdate(postId, { $inc: { likeCount: 1 } }, { new: true })
      .session(session);

    await session.commitTransaction();
    session.endSession();

    //response
    res.status(200).json({
      success: true,
      message: "Post liked successfully",
      data: updatePost,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  } finally {
    session.endSession();
  }
}
//Toggle follow/unfollow a user
async function toggleFollow(req, res) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const targetUserId = req.params.id; //id from url
    const userId = req.user.id; //id from authmiddleware

    if (userId === targetUserId) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({
          success: false,
          message: "You cannot follow/unfollow yourself",
        });
    }
    //check if a follow already exists
    const existingFollow = await followModel
      .findOne({ follower: userId, following: targetUserId })
      .session(session);

    //if exists, remove the follow (unfollow) and
    if (existingFollow) {
      await followModel.findByIdAndDelete(existingFollow._id).session(session);
      await userModel
        .findByIdAndUpdate(userId, { $inc: { followingCount: -1 } })
        .session(session);
      await userModel
        .findByIdAndUpdate(targetUserId, { $inc: { followerCount: -1 } })
        .session(session);
      await session.commitTransaction();
      session.endSession();
      return res.status(200).json({
        success: true,
        message: "User unfollowed successfully",
      });
    }

    //if not exists, create a new follow
    await followModel.create(
      [
        { follower: userId, following: targetUserId }, //[] for session transaction compatibility
      ],
      { session }
    );
    await userModel
      .findByIdAndUpdate(userId, { $inc: { followingCount: 1 } })
      .session(session);
    await userModel
      .findByIdAndUpdate(targetUserId, { $inc: { followerCount: 1 } })
      .session(session);
    await session.commitTransaction();
    session.endSession();
    //response
    res.status(200).json({
      success: true,
      message: "User followed successfully",
    });


  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  } finally {
    session.endSession();
  }
}

module.exports = { toggleLike, toggleFollow };
