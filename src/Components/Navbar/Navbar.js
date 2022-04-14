import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../Assets/Image/logo.png";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../../firebase-config";

const Navbar = () => {
  const [user, setUser] = useState({});
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  const handleLogOut = () => {
    navigate('/login')
    signOut(auth)
      .then(() => setUser({}))
      .catch((err) => console.log(err));
  };
  return (
    <nav
      style={
        pathname.includes("blog") ? { display: "none" } : { display: "flex" }
      }
    >
      <div className="logo-container">
        <img src={Logo} alt="" />
      </div>
      <div className="link-container">
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to="/videos"
        >
          Videos
        </NavLink>
        {user.uid ? (
          <button className="logout-button" onClick={handleLogOut}>
            Log out
          </button>
        ) : (
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "link")}
            to="/login"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
