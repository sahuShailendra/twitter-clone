import React, { useState } from "react";
import ImageIcon from '@mui/icons-material/Image';
import GifBoxIcon from '@mui/icons-material/GifBox';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
// import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

function TweetBox() {
  const [tweet, setTweet] = useState("");

  return (
    <div className="flex space-x-3 border-b border-gray-700 p-4">
      {/* Avatar */}
      <img
        src="https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg"
        alt="avatar"
        className="w-12 h-12 rounded-full"
      />

      {/* Tweet input and icons */}
      <div className="flex-1">
        {/* Input */}
        <textarea
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          placeholder="What’s happening?"
          className="w-full bg-transparent resize-none text-lg placeholder-gray-500 focus:outline-none text-white"
          rows="2"
        />

        {/* Icons and Post button */}
        <div className="flex items-center justify-between mt-2 border-t border-gray-800 pt-2">
          {/* Icons */}
          <div className="flex space-x-4 text-[#1D9BF0]">
            <ImageIcon className="cursor-pointer w-5 h-5 hover:text-[#1A8CD8]" />
            <GifBoxIcon className="cursor-pointer w-5 h-5 hover:text-[#1A8CD8]" />
            <SentimentSatisfiedAltIcon className="cursor-pointer w-5 h-5 hover:text-[#1A8CD8]" />
            {/* <Calendar className="cursor-pointer w-5 h-5 hover:text-[#1A8CD8]" /> */}
            {/* <AddLocationAltIcon className="cursor-pointer w-5 h-5 hover:text-[#1A8CD8]" /> */}
          </div>

          {/* Post Button */}
          <button
            disabled={!tweet.trim()}
            className={`rounded-full px-4 py-1.5 font-bold transition-colors ${
              tweet.trim()
                ? "bg-[#1D9BF0] text-white hover:bg-[#1A8CD8]"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default TweetBox;
