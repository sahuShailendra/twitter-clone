import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ToggleFollowBtn from "./ToggleFollowBtn.jsx";
import { useDispatch } from "react-redux";
import {toggleFollowUser }from "../store/actions/userAction.jsx";

const ProfileCom = ({ profile, isCurrentUser }) => {
  const dispatch = useDispatch();
  console.log("Rendering ProfileCom for user:", profile._id);
  const handleFollowToggle = async (userId) => {
    dispatch(toggleFollowUser(userId));
  };

  return (
    <div className="text-white">
      {/* Top Header */}
      <div className="w-full flex items-center bg-black sticky top-0 z-50 border-b border-gray-800">
        <ArrowBackIcon className="cursor-pointer m-4" />
        <h2 className="text-xl font-bold">{profile.name}</h2>
      </div>

      {/* Banner */}
      <div>
        <img
          src={profile.banner?.url}
          alt="banner"
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Profile section */}
      <div className="px-4 border-b border-gray-800 pb-4">
        <div className="flex justify-between items-start">
          <img
            src={profile.avatar?.url}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-black -mt-12"
          />

          {/* Action Button */}
          {isCurrentUser ? (
            <button className="px-4 py-1 rounded-full border border-gray-600 hover:bg-gray-800 mt-2">
              Edit profile
            </button>
          ) : (
            <ToggleFollowBtn
              isFollowing={profile.isFollowing}
              targetUserId={profile._id}
              onToggle={handleFollowToggle}
            />
          )}
        </div>

        {/* Bio & info */}
        <div className="mt-2">
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-gray-400">@{profile.username}</p>
          <p className="mt-2 text-sm">{profile.bio}</p>

          {/* Counts */}
          <div className="flex gap-4 mt-3 text-sm">
            <span>
              <strong>{profile.following}</strong> Following
            </span>
            <span>
              <strong>{profile.followers}</strong> Followers
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex space-x-8 text-center text-sm">
          <div className="w-full cursor-pointer hover:text-blue-400">
            <h1>Posts</h1>
          </div>
          <div className="w-full cursor-pointer hover:text-blue-400">
            <h1>Media</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCom;
