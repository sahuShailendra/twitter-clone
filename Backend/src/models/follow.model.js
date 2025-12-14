const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// ek follower ek hi user ko ek baar follow kare
followSchema.index({ follower: 1, following: 1 }, { unique: true });
/**
 * Safety check:
 * koi bhi user khud ko follow na kar sake
 * controller bypass ho jaye tab bhi DB safe rahe
 */
followSchema.pre("save", function (next) {
  if (this.follower.equals(this.following)) {
    return next(new Error("User cannot follow themselves"));
  }
  next();
});

const followModel = mongoose.model("Follow", followSchema);

module.exports = followModel