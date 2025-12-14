import React from "react";
import userAPI from "../api/userApi";
import XIcon from "@mui/icons-material/X";
import CloseIcon from "@mui/icons-material/Close";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import Username from "./Username";

function Sidebar({ closeSidebar }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    try {
      await userAPI.logoutUser();
      localStorage.removeItem("token");
      navigate("/login");
      closeSidebar?.(); // mobile pe logout ke baad close
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-between h-screen text-white relative px-5">

      {/* ===== MOBILE CLOSE BUTTON ===== */}
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 md:hidden"
      >
        <CloseIcon className="text-white text-2xl" />
      </button>

      {/* ===== TOP SECTION ===== */}
      <div>
        {/* Logo */}
        <XIcon className="text-[#1DA1F2] text-[30px] ml-5 mb-5 mt-3" />

        <Link to="/" onClick={closeSidebar}>
          <SidebarOption Icon={HomeIcon} text="Home" />
        </Link>

        <Link to="/" onClick={closeSidebar}>
          <SidebarOption Icon={SearchIcon} text="Explore" />
        </Link>

        <Link to="/" onClick={closeSidebar}>
          <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
        </Link>

        <Link to="/" onClick={closeSidebar}>
          <SidebarOption Icon={MailOutlineIcon} text="Messages" />
        </Link>

        <Link to="/">
          <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
        </Link>

        <Link to="/profile" onClick={closeSidebar}>
          <SidebarOption Icon={PermIdentityIcon} text="Profile" />
        </Link>

        <button className="bg-[#1DA1F2] text-white font-extrabold text-lg rounded-[30px] h-[50px] w-full mt-5">
          Post
        </button>

        <button
          onClick={handleLogout}
          className="border border-gray-500 text-white font-extrabold text-lg rounded-[30px] h-[50px] w-full mt-3"
        >
          Logout
        </button>
      </div>

      {/* ===== BOTTOM PROFILE ===== */}
      <div className="flex items-center justify-between mb-5 p-2 hover:bg-gray-800 rounded-[30px] cursor-pointer">
        <Avatar user={user} alt={user?.name} size="md" />

        <div className="flex-1 ml-3">
          <Username user={user} />
        </div>

        <MoreHorizIcon className="text-gray-500" />
      </div>
    </div>
  );
}

export default Sidebar;
