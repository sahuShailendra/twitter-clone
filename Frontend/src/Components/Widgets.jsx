import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import WhoToFollow from "./WhoToFollow";

const Widgets = () => {
  return (
    <div className="
    flex-col items-center
     h-screen 
    text-black dark:text-white 
">
      {/* Search Box */}
      <div className="flex w-full items-center bg-[#e6ecf0] p-2.5 rounded-full">
        <SearchIcon className="text-gray-500" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="border-none bg-[#e6ecf0] outline-none ml-2 w-full text-sm text-gray-700 placeholder-gray-500"
        />
      </div>

      {/* Widget Container */}
      <div className="mt-4 w-full rounded-2xl">
        < WhoToFollow />
      </div>
    </div>
  )
}

export default Widgets
