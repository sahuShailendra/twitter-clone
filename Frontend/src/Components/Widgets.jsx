import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import WhoToFollow from "./WhoToFollow";

const Widgets = ({ closeWidgets }) => {
  return (
    <div className="flex flex-col h-screen text-white relative p-4">

      {/* ===== MOBILE CLOSE BUTTON ===== */}
      <button
        onClick={closeWidgets}
        className="absolute top-4 right-4 md:hidden"
      >
        <CloseIcon className="text-white text-2xl" />
      </button>

      {/* ===== SEARCH BOX ===== */}
      <div className="flex w-full items-center bg-[#202327] p-2.5 rounded-full">
        <SearchIcon className="text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="
            border-none bg-transparent outline-none ml-2 w-full
            text-sm text-white placeholder-gray-500
          "
        />
      </div>

      {/* ===== WHO TO FOLLOW ===== */}
      <div className="mt-4 w-full rounded-2xl">
        <WhoToFollow closeWidgets={closeWidgets} />
      </div>
    </div>
  );
};

export default Widgets;
