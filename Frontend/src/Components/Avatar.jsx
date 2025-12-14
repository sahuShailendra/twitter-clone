import React from "react";
import { useNavigate } from "react-router-dom";
import MuiAvatar from "@mui/material/Avatar";

const Avatar = ({ user }) => {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate(`/profile/${user._id}`); // same path for both own & other user
  };
  const avatar = user?.avatar?.url

  return (
    <div onClick={handleProfile} className="cursor-pointer">
      <MuiAvatar src={avatar} />
    </div>
  );
};

export default Avatar;
