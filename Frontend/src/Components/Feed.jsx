import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";

// import FlipMove from "react-flip-move";

function Feed() {
    const [posts, setPosts] = useState([]);

  // Dummy data for testing UI
  useEffect(() => {
    const dummyPosts = [
      {
        displayName: "Shailendra Sahu",
        username: "sks99sahu",
        verified: true,
        text: "Building my own Twitter clone with React + Tailwind 🔥",
        avatar:
          "https://i.pravatar.cc/150?img=3",
        image:
          "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80",
      },
      {
        displayName: "Frontend Dev",
        username: "frontend_guy",
        verified: false,
        text: "TailwindCSS makes styling so easy! 💙 #ReactJS #Tailwind",
        avatar:
          "https://i.pravatar.cc/150?img=12",
        image:
          "https://images.unsplash.com/photo-1581276879432-15a43c55c1b6?auto=format&fit=crop&w=800&q=80",
      },
      {
        displayName: "CodeWithJS",
        username: "js_coder",
        verified: true,
        text: "Just connected my MongoDB Atlas backend with the frontend! 🚀",
        avatar:
          "https://i.pravatar.cc/150?img=22",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      },
    ];

    setPosts(dummyPosts);
  }, []);

  

  return (
    <div
      className="
        flex-[0.4]
        border-r
        border-gray-800
        min-w-fit
        overflow-y-scroll
        no-scrollbar
        feed
      "
    >
      {/* Feed Header */}
      <div
        className="
          sticky top-0 
          bg-black 
          z-50 
          border-b 
          border-gray-800 
          px-5 py-4
        "
      >
        <h2 className="text-xl font-extrabold text-white">Home</h2>
      </div>

      {/* TweetBox */}
      <TweetBox />

      {/* Posts List */}
      <div className="text-white">
        {posts.map((post, index) => (
          <Post
            key={index}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Feed;