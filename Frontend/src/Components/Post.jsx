import React, { forwardRef } from "react";
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';

const Post = forwardRef(
  ({ displayName, username, verified, text, image, avatar }, ref) => {
    return (
      <div
        ref={ref}
        className="flex items-start border-b border-gray-800 pb-2 px-2 text-white"
      >
        {/* Avatar */}
        <div className="p-5">
          <Avatar src={avatar} />
        </div>

        {/* Body */}
        <div className="flex-1 p-2">
          <div className="flex flex-col">
            {/* Header */}
            <div>
              <h3 className="text-[15px] mb-1">
                {displayName}{" "}
                <span className="font-semibold text-sm text-gray-500">
                  {verified && (
                    <VerifiedIcon className="text-sky-500 text-[14px] inline-block align-middle" />
                  )}{" "}
                  @{username}
                </span>
              </h3>
            </div>

            {/* Description */}
            <div className="mb-2 text-[15px]">
              <p>{text}</p>
            </div>
          </div>

          {/* Image (if any) */}
          {image && (
            <img
              src={image}
              alt="post"
              className="rounded-2xl w-full max-h-[500px] object-cover"
            />
          )}

          {/* Footer Icons */}
          <div className="flex justify-between mt-5 text-gray-400">
            <ChatBubbleOutlineIcon fontSize="small" className="cursor-pointer hover:text-sky-500" />
            <RepeatIcon fontSize="small" className="cursor-pointer hover:text-green-500" />
            <FavoriteBorderIcon fontSize="small" className="cursor-pointer hover:text-pink-500" />
            <PublishIcon fontSize="small" className="cursor-pointer hover:text-sky-500" />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;

