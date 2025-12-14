import React, { useState } from 'react'

const ToggleFollowBtn = ({ isFollowing, targetUserId, onToggle }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    console.log("ToggleFollowBtn clicked for userId:", targetUserId);
    setLoading(true);
    await onToggle(targetUserId);   // Parent ko request pass
    setLoading(false);
  };
  return  (
    <button
      onClick={handleClick}
      className={`px-4 py-1 rounded-full border mt-2 ${
        isFollowing
          ? "bg-white text-black border-white"
          : "bg-blue-600 text-white border-blue-600"
      }`}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
}

export default ToggleFollowBtn