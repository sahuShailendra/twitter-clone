import React, { useState } from "react";

const WhoToFollow = () => {
  const usersData = [
  {
    name: "Jessica Livingston",
    username: "@jesslivingston",
    avatar: "https://images.pexels.com/photos/27570794/pexels-photo-27570794.jpeg",
  },
  {
    name: "Discover Hechi",
    username: "@DiscoverHechi",
    avatar: "https://images.pexels.com/photos/15790618/pexels-photo-15790618.jpeg",
  },
  {
    name: "Ben Shapiro",
    username: "@benshapiro",
    avatar: "https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg",
  },
];

const [users, setUsers] = useState(
    usersData.map((u) => ({ ...u, isFollowed: false }))
  );

  const toggleFollow = (index) => {
    setUsers((prev) =>
      prev.map((user, i) =>
        i === index ? { ...user, isFollowed: !user.isFollowed } : user
      )
    );
  };

  return  (
    <div className="w-full bg-black text-white rounded-2xl border border-[#2f3336] p-4">
      <h2 className="text-lg font-semibold mb-2">Who to follow</h2>

      {users.map((user, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-2 border-b border-[#2f3336] last:border-none"
        >
          <div className="flex items-center gap-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-1 font-semibold">
                {user.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#1d9bf0"
                  className="w-4 h-4"
                >
                  <path d="M22.25 12c0 5.66-4.59 10.25-10.25 10.25S1.75 17.66 1.75 12 6.34 1.75 12 1.75 22.25 6.34 22.25 12zM11 16.5l6-6-1.06-1.06L11 14.38l-2.94-2.94L7 12.5l4 4z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">{user.username}</p>
            </div>
          </div>

          {/* Follow / Unfollow Button */}
          <button
            onClick={() => toggleFollow(index)}
            className={`text-sm font-semibold rounded-full px-4 py-1 transition
              ${
                user.isFollowed
                  ? "bg-black text-white border border-gray-600 hover:bg-[#181818]"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
          >
            {user.isFollowed ? "Unfollow" : "Follow"}
          </button>
        </div>
      ))}

      <button className="text-sm text-[#1d9bf0] hover:underline mt-2">
        Show more
      </button>
    </div>
  )
}

export default WhoToFollow