import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import WhoToFollow from "./WhoToFollow";

const Widgets = () => {
  return (
    <div className="flex-[0.3]">
      {/* Search Box */}
      <div className="flex items-center bg-[#e6ecf0] p-2.5 rounded-full mt-2 ml-5">
        <SearchIcon className="text-gray-500" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="border-none bg-[#e6ecf0] outline-none ml-2 w-full text-sm text-gray-700 placeholder-gray-500"
        />
      </div>

      {/* Widget Container */}
      <div className="mt-4 ml-5 p-5 rounded-2xl">
        < WhoToFollow />
      </div>
    </div>
  )
}

export default Widgets
