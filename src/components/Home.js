import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Home = (props) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const logOut = (navigate) => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {});
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);
  const logOutHandler = () => {
    logOut(navigate);
  };
  return (
    <div>
      <h2>{userName ? `Welcome - Mr.  ${userName}` : "Sorry Please Login Your Account"}</h2>
      {/* Logout */}
      <button className="btn" onClick={logOutHandler}>Logout</button>
    </div>
  );
};

export default Home;
