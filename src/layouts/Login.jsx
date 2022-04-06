import { Component, useState, useEffect } from "react";
import "../stylesheet/login.scss";
import { signinwithgoogle } from "..//firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";


const Login = () => {



    return (
      <section id="entry-page">
        <main>
          <h2>Welcome to goShop!</h2>
          <button
            onClick={signinwithgoogle}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            Login With Google
          </button>
        </main>
      </section>
    );
  
};

export default Login;
