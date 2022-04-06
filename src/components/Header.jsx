import React from "react";

import { NavLink } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";

import { getAuth } from "firebase/auth";

const Pages = [
  { name: "Home", path: "/" },
  { name: "Members", path: "/members" },
  { name: "Projects", path: "/publications/post" },
  { name: "About", path: "/about" },
  { name: "Publications", path: "/publications" },
];
const Header = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <div className="w-full h-[50px] flex shadow-lg text-sm place-items-center fixed bg-white z-[99] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <NavLink
        className="mx-5 my-auto p-2 rounded  text-white font-bungee text-lg"
        to="/"
      >
        GOSHOPE
      </NavLink>

      <NavLink
        className="mx-5 my-auto p-2 rounded  text-white text-md"
        to="/"
      >
        home
      </NavLink>

      <div className="h-[60%] cursor-pointer hover:text-indigo-600 grid place-items-center px-4 w-auto text-slate-400 bg-white rounded-md shadow-lg right-5 absolute">
        <a href="dash/" className="flex place-items-center space-x-4">
          <LoginIcon className="mr-2"></LoginIcon>{" "}
          {user ? "Dashboard" : "login"}
        </a>
      </div>
    </div>
  );
};

export default Header;
