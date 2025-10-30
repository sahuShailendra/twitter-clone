import React from "react";
import Sidebar from "./Components/Sidebar";
import Feed from "./Components/Feed";
import Widgets from "./Components/Widgets";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex h-screen max-w-7xl mx-auto px-2.5 bg-black text-white overflow-y-scroll scrollbar-hide">
      <div className="flex-[0.2] h-screen sticky top-0 "><Sidebar /></div>
      <div className="flex-[0.5] border-x border-gray-800 overflow-y-scroll h-screen scrollbar-hide "><Outlet /></div>
      <div className="flex-[0.3]"><Widgets /></div>
    </div>
  );
}

export default App;
