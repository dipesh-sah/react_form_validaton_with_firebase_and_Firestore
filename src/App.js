import React from "react";
import {  Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import "./Link.css";
import Home from "./components/Home";
const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
};

export default App;
