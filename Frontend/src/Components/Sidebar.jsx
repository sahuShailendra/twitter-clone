import React from "react";
import userAPI from "../api/userApi";
import XIcon from "@mui/icons-material/X";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const response = userAPI.logoutUser();
    console.log("Logout response:", response);
    // Additional logout handling (e.g., redirect to login page) can be done here
    navigate("/login");
  }
  return (
    <div className="flex flex-col justify-between border-r border-gray-500 flex-[0.3] mt-5 px-5 h-screen text-black dark:text-white">
      {/* TOP SECTION */}
      <div>
        {/* Twitter Icon */}
        <XIcon className="text-[#1DA1F2] text-[30px] ml-5 mb-5" />

        {/* Sidebar Options */}
        <SidebarOption Icon={HomeIcon} text="Home" />
        <SidebarOption Icon={SearchIcon} text="Explore" />
        <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
        <SidebarOption Icon={MailOutlineIcon} text="Messages" />
        <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
        <SidebarOption Icon={ListAltIcon} text="Lists" />
        <SidebarOption Icon={PermIdentityIcon} text="Profile" />
        <SidebarOption Icon={MoreHorizIcon} text="More" />

        {/* Tweet Button */}
        <button
          className="
            bg-[#1DA1F2] 
            text-white font-extrabold text-lg 
            rounded-[30px] h-[50px] w-full mt-5
            hover:bg-[#1a8cd8] transition-colors duration-150
          "
        >
          Post
        </button>
        {/* logoutbutton */}
        <button
          className="
            bg-transparent border border-gray-500
            text-white font-extrabold text-lg 
            rounded-[30px] h-[50px] w-full mt-3
            hover:bg-gray-600 transition-colors duration-150
          "
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>

      {/* BOTTOM PROFILE SECTION */}
      <div
        className="
          flex items-center justify-between
          mt-5 mb-5 p-2 
          hover:bg-gray-100 dark:hover:bg-gray-800
          rounded-[30px] cursor-pointer
          transition-colors duration-150
        "
      >
        {/* Profile Avatar */}
        <img
          src="https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />

        {/* Username + Handle */}
        <div className="flex-1 ml-3">
          <h4 className="font-bold leading-tight">Shailendra Sahu</h4>
          <p className="text-gray-500 text-sm">@sks99sahu</p>
        </div>

        {/* 3 Dots */}
        <MoreHorizIcon className="text-gray-500" />
      </div>
    </div>
  );
}

export default Sidebar;
