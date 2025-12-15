import React from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const HeadBar = ({ onMenuClick, onSearchClick }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-black sticky top-0 z-50 md:hidden">
      <MenuIcon
        className="text-white cursor-pointer"
        onClick={onMenuClick}
      />

      <h2 className="text-white font-bold">Home</h2>

      <SearchIcon
        className="text-white cursor-pointer"
        onClick={onSearchClick}
      />
    </div>
  )
}

export default HeadBar 

/**
 * 

const Topbar = ({ onMenuClick, onSearchClick }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-black sticky top-0 z-50 md:hidden">
      <MenuIcon
        className="text-white cursor-pointer"
        onClick={onMenuClick}
      />

      <h2 className="text-white font-bold">Home</h2>

      <SearchIcon
        className="text-white cursor-pointer"
        onClick={onSearchClick}
      />
    </div>
  );
};

export default Topbar;
 */