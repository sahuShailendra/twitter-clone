import React from "react";
import { useNavigate } from "react-router-dom";

const Username = ({ user }) => {
    const navigate = useNavigate();
    const handleProfile = () => {
      navigate(`/profile/${user._id}`); // same path for both own & other user
    }
    const displayName = user?.name;
    const username = user?.username;

  return (
    <h3 className="text-[15px] mb-1 cursor-pointer " onClick={handleProfile}>
      {displayName}{" "}
      <span className="font-semibold text-sm text-gray-500">
        {username}
      </span>
    </h3>
  );
};

export default Username;
