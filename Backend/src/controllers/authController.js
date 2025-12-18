const userModel = require("../models/user.Model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { uploadImage, deleteImage } = require("../services/storage.service");
const { v4: uuid } = require("uuid");

// User Registration
async function userRegister(req, res) {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existing = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          existing.email === email
            ? "Email already exists"
            : "Username already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      name,
      email,
      username,
      password: hashPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
}
// User Login
async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", password, email);
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }
    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // change to true in production
      sameSite: "None", // change to 'None' in production
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
}
// User Logout
async function userLogout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
}
//user Update
async function userUpdate(req, res) {
  try {
    const userId = req.user.id; //id from authmiddleware
    const { id } = req.params; //id from url
    //authorize
    if (userId !== id) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to update this user" });
    }
    //prevent email and password update
    if (req.body.password || req.body.email) {
      return res.status(400).json({
        success: false,
        message: "Cannot update email or password here",
      });
    }
    //update fields
    const { name, username, bio } = req.body;

    //get existing user
    const user = await userModel.findById(id);
    let avaterUrl = user.avatar;
    let bannerUrl = user.banner;

    //handle avatar upload
    if (req.files?.avatar) {
      //delete existing avatar
      if (user.avatar?.fileId) {
        await deleteImage(user.avatar.fileId);
      }
      //upload new avatar
      const uploadAvaterResult = await uploadImage(
        req.files.avatar[0].buffer,
        uuid()
      );
      avaterUrl = {
        url: uploadAvaterResult.url,
        fileId: uploadAvaterResult.fileId,
      };
    }
    //handle banner upload
    if (req.files?.banner) {
      //delete existing banner
      if (user.banner?.fileId) {
        await deleteImage(user.banner.fileId);
      }
      //upload new banner
      const uploadBannerResult = await uploadImage(
        req.files.banner[0].buffer,
        uuid()
      );
      bannerUrl = {
        url: uploadBannerResult.url,
        fileId: uploadBannerResult.fileId,
      };
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { name, username, bio, avatar: avaterUrl, banner: bannerUrl },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
}
//get my profile
async function getMyProfile(req, res) {
  try {
    const userId = req.user.id; //id from authmiddleware
    const user = await userModel.findById(userId).select("-password");
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
}
//get user profile by id
async function getUserProfile(req, res) {
  try {
    const { id } = req.params; //id from url
    const loggedInUserId = req.user.id;
    const user = await userModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "user",
          as: "userPosts",
          pipeline: [{ $sort: { createdAt: -1 } }],
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "following",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "follower",
          as: "following",
        },
      },
      {
        $addFields: {
          followersCount: { $size: "$followers" },
          followingCount: { $size: "$following" },
          isFollowing: {
            $in: [
             new mongoose.Types.ObjectId(loggedInUserId),
              "$followers.follower",
            ],
          },
        },
      },
      {
        $project: {
          password: 0,
          __v: 0,
          followers: 0,
          following: 0,
          "posts.__v": 0,
        },
      },
    ]);
    if (!user.length) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
}
//get all users
async function getAllUsers(req, res) {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
}

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  userUpdate,
  getMyProfile,
  getUserProfile,
  getAllUsers,
};
