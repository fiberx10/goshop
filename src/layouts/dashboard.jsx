import React from "react";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { DashProjects} from "../views/index";

const Dashboard = () => {
  return (
    <div>
      <div className="grid  mx-auto pt-2  px-2 bg-indigo-50 min-h-screen">
        <div className="w-full   bg-white-600  flex-1  rounded-lg  min-h-[90%] bg-white shadow-lg ">
          <Routes>
            <Route path="/" element={<DashProjects />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
