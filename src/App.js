import "./App.css";

import Dashboard from "./layouts/dashboard";
import Landing from "./layouts/landing";
import Login from "./layouts/Login";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { getAuth } from "firebase/auth";
import {  useState } from "react";

function App() {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((u) => {
    setUser(u);
  });
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/dash/*"
            element={user ? <Dashboard user={user} /> : <Login />}
          />
          <Route path="/*" element={<Landing />} />
          <Route path="/login" element={<Login></Login>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
