import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaPen } from "react-icons/fa"; 

const Navbar = () => {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#333",
        color: "#fff",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "0.5rem 0",
        boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      <Link to="/ingredients" style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ textAlign: "center" }}>
          <FaPen size={24} /> 
          <p style={{ fontSize: "0.9rem", margin: "0.2rem 0" }}>ingredients</p>
        </div>
      </Link>

      <Link to="/favorites" style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ textAlign: "center" }}>
          <FaHeart size={24} /> 
          <p style={{ fontSize: "0.9rem", margin: "0.2rem 0" }}>favorites</p>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
