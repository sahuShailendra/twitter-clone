import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Post from "../Components/Post";

function Profile() {
  const user = {
    name: "Harsh Vandana Sharma",
    username: "@harshbhaiyaa",
    bio: "Founder | Sheryians Coding School 🧠 Talks about students, their problems, their life & their goals. Connect if you care about students as well.",
    followers: 4104,
    following: 25,
    avatar:
      "https://images.pexels.com/photos/32146479/pexels-photo-32146479.jpeg",
    banner:
      "https://images.pexels.com/photos/33148790/pexels-photo-33148790.jpeg",
    posts: [
      {
        id: 1,
        text: "If ReactJS is where you get stuck, this 15+ hour tutorial will change that forever 💪🔥",
        date: "Oct 9",
      },
      {
        id: 2,
        text: "Design the future 🚀 — one student at a time.",
        date: "Oct 5",
      },
      {
        id: 3,
        text: "Join our coding bootcamp and transform your career in just 12 weeks! 💻✨ #CodingBootcamp #LearnToCode",
        date: "Sep 28",
      }
    ],
  };

  return (
    <div className="flex flex-col no-scrollbar">
        {/* header */}
        <div className="w-full flex items-center justify-start bg-black sticky top-0 z-50 border-b border-gray-800"> 
        <ArrowBackIcon className="cursor-pointer m-4 "/> 
        <h2 className="text-xl font-bold text-white">{user.name}</h2>
        </div>
      {/* Banner */}
      <div>
        <img src={user.banner} alt="banner" className="w-full h-48 object-cover" />
      </div>

      {/* Profile Info */}
      <div className="px-4 border-b border-gray-800 pb-4">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full border-4 border-black -mt-12"
        />
        <div className="mt-2">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-400">{user.username}</p>
          <p className="mt-2 text-sm">{user.bio}</p>


          <div className="flex gap-4 mt-3 text-sm">
            <span>
              <strong>{user.following}</strong> Following
            </span>
            <span>
              <strong>{user.followers}</strong> Followers
            </span>
          </div>
        </div>

        <div className=" mt-4 flex space-x-8 ">
            <div className="w-full text-white text-center">
                <h1>Post</h1>
            </div>
            <div className="w-full text-white text-center">
                <h1>Media</h1>
            </div>
        </div>
        
      </div>
      {/* Posts */}
      <div className="text-white">
        {user.posts.map((post, index) => (
          <Post
            key={index}
            displayName={user.name}
            username={user.username.slice(1)}
            verified={true}
            text={post.text}
            avatar={user.avatar}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;

