import React from "react";

// Icon is used as a component parameter and rendered below
function SidebarOption({ text, Icon }) {
  return (
    <div
      className="
        flex items-center cursor-pointer
        hover:bg-[#4b4d4e] hover:text-sky-500
        rounded-[30px] transition-colors duration-100 ease-out
      "
    >
      {Icon && <Icon className="p-5 text-[1.75rem] text-amber-50" />}
      <h2 className="font-bold text-[20px]">{text}</h2>
    </div>
  );
}

export default SidebarOption;