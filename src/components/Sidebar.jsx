import React from "react";

import { NavLink } from "react-router-dom";

import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { logoutwithgoogle } from "../firebase";

const Pages = [
  {
    name: "Products ",
    path: "/dash/",
    icon: <GridViewRoundedIcon className="mx-2" />,
  },

  {
    name: "Logout",
    path: "/dash/logout",
    icon: <LogoutRoundedIcon className="mx-2" />,
  },
];
const Sidebar = () => {
  return (
    <div className="h-screen w-[150px]  text-sm fixed space-y-2 pt-14 bg-white z-50 ">
      <NavLink
        key={Pages[0].path}
        to={Pages[0].path}
        className={({ isActive }) => {
          return isActive
            ? "mx-3 my-auto p-2 flex cursor-pointer rounded hover:bg-indigo-100 hover:text-indigo-600 text-indigo-600"
            : "mx-3 my-auto p-2 flex cursor-pointer rounded hover:bg-indigo-100 hover:text-indigo-600 text-slate-600";
        }}
      >
        {Pages[0].icon}
        {Pages[0].name}
      </NavLink>

      <button
        onClick={logoutwithgoogle}
        key={Pages[1].path}
        to={Pages[1].path}
        className="mx-3 my-auto p-2 flex cursor-pointer rounded hover:bg-indigo-100 hover:text-indigo-600 text-slate-600"
      >
        {Pages[1].icon}
        {Pages[1].name}
      </button>
    </div>
  );
};

export default Sidebar;
