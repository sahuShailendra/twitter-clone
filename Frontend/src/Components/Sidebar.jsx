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
import { Link } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await userAPI.logoutUser();
      console.log("Logout response:", response);

      // Clear local auth data (optional, recommended)
      localStorage.removeItem("token");

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-between h-screen text-black dark:text-white ">
      {/* TOP SECTION */}
      <div>
        {/* Logo */}
        <XIcon className="text-[#1DA1F2] text-[30px] ml-5 mb-5" />

        {/* Sidebar Navigation */}
        <Link to="/">
          <SidebarOption Icon={HomeIcon} text="Home" />
        </Link>
        <Link to="/">
          <SidebarOption Icon={SearchIcon} text="Explore" />
        </Link>
        <Link to="/">
          <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
        </Link>
        <Link to="/">
          <SidebarOption Icon={MailOutlineIcon} text="Messages" />
        </Link>
        <Link to="/">
          <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
        </Link>
        <Link to="/profile">
          <SidebarOption Icon={PermIdentityIcon} text="Profile" />
        </Link>

        {/* Post Button */}
        <button className="bg-[#1DA1F2] text-white font-extrabold text-lg rounded-[30px] h-[50px] w-full mt-5 hover:bg-[#1a8cd8] transition-colors duration-150">
          Post
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-transparent border border-gray-500 text-white font-extrabold text-lg rounded-[30px] h-[50px] w-full mt-3 hover:bg-gray-600 transition-colors duration-150"
        >
          Logout
        </button>
      </div>

      {/* BOTTOM PROFILE SECTION */}
      <div className="flex items-center justify-between mt-5 mb-5 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-[30px] cursor-pointer transition-colors duration-150">
        {/* Avatar */}
        <img
          src="https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />

        {/* Username */}
        <div className="flex-1 ml-3">
          <h4 className="font-bold leading-tight">Shailendra Sahu</h4>
          <p className="text-gray-500 text-sm">@sks99sahu</p>
        </div>

        {/* More Options */}
        <MoreHorizIcon className="text-gray-500" />
      </div>
    </div>
  );
}

export default Sidebar;
