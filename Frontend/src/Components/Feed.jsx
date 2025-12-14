import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import { fetchPosts } from "../store/actions/postAction.jsx";
import { useDispatch, useSelector } from "react-redux";

// import FlipMove from "react-flip-move";

function Feed() {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts.posts);
  // const [posts, setPosts] = useState(allPosts || []);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div
      className="
        flex-[0.4]
        border
        border-gray-800
        min-w-fit
        overflow-y-scroll
        no-scrollbar
        feed
      "
    >
      {/* Feed Header */}
      

      {/* TweetBox */}
      <TweetBox />

      {/* Posts List */}
      <div className="text-white">
        {allPosts?.map((post, index) => (
          <Post
            key={post._id || index}
            user ={post.user}
            text={post.content}
            image={post.image?.url}
          />
        ))}
      </div>
    </div>
  );
}

export default Feed;
