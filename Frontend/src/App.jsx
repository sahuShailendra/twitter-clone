import React from "react";
import Sidebar from "./Components/Sidebar";
import Feed from "./Components/Feed";
import Widgets from "./Components/Widgets";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex h-screen w-full lg:max-w-7xl mx-auto px-2.5 bg-black text-white overflow-y-scroll scrollbar-hide">
      <div className="hidden sm:block sm:flex-[0.3] lg:flex lg:flex-[0.2] h-screen sticky top-0 px-3 py-5 border-r border-gray-800"><Sidebar /></div>
      <div className="flex-1 sm:flex-[0.7] lg:flex-[0.5] overflow-y-scroll h-screen scrollbar-hide "><Outlet /></div>
      <div className="hidden  lg:block lg:flex-[0.3] px-3 py-5 border-l border-gray-800"><Widgets /></div>
    </div>
  );
}

export default App;
