import React from "react";
import { useNavigate } from "react-router-dom";

const Open = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <div className="text-center">
        <h1 className="mb-3" style={{ fontWeight: "bold", color: "#660000" }}>
          welcome to what2whip!
        </h1>
        <h2
          className="mb-4"
          style={{
            fontSize: "1.2rem",
            color: "#660000",
          }}
        >
          discover new recipes tailored to your ingredients and track your
          favorites.
        </h2>
        <div className="d-flex gap-3 justify-content-center">
          <button
            onClick={() => navigate("/login")}
            className="btn btn-light-red px-4 py-2 rounded-pill"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="btn btn-light-red px-4 py-2 rounded-pill"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Open;
