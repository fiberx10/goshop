import React from "react";
import Header from "../components/Header";
import {Routes , Route} from "react-router-dom" ;
import Publications from "./Publications";

const Landing = () => {
  return (
   <>
    <Header />
    <Routes>
      <Route path="/" element={<Publications />} ></Route>
    </Routes>
   </>
  );
};

export default Landing;
