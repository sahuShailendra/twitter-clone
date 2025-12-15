import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Feed from "./Components/Feed";
import Widgets from "./Components/Widgets";
import { Outlet } from "react-router-dom";
import HeadBar from "./Components/HeadBar";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showWidgets, setShowWidgets] = useState(false);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden scrollbar-hide mx-auto">
      {/* ========== SIDEBAR ========== */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-black
          transform transition-transform duration-300
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-[20%]
        `}
      >
        <Sidebar closeSidebar={() => setShowSidebar(false)} />
      </div>

      {/* ========== FEED ========== */}
      <div className="flex-1 md:w-[50%] border-x border-gray-800 overflow-y-auto scrollbar-hide ">
        {/* Mobile Top Bar */}
        <HeadBar
          onMenuClick={() => setShowSidebar(true)}
          onSearchClick={() => setShowWidgets(true)}
        />

        <Outlet />
      </div>

      {/* ========== WIDGETS ========== */}
      <div
        className={`
    fixed inset-y-0 right-0 z-50 w-72 bg-black
    transform transition-transform duration-300
    ${showWidgets ? "translate-x-0" : "translate-x-full"}
    lg:static lg:translate-x-0 lg:w-[30%]
  `}
      >
        <Widgets closeWidgets={() => setShowWidgets(false)} />
      </div>
    </div>
  );
  // return (
  //   <div className="flex h-screen w-full lg:max-w-7xl mx-auto px-2.5 bg-black text-white overflow-y-scroll scrollbar-hide">
  //     <div className="hidden sm:block sm:flex-[0.3] lg:flex lg:flex-[0.2] h-screen sticky top-0 px-3 py-5 border-r border-gray-800"><Sidebar /></div>
  //     <div className="flex-1 sm:flex-[0.7] lg:flex-[0.5] overflow-y-scroll h-screen scrollbar-hide "><Outlet /></div>
  //     <div className="hidden  lg:block lg:flex-[0.3] px-3 py-5 border-l border-gray-800"><Widgets /></div>
  //   </div>
  // );
}

export default App;
