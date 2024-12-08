import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IngredientsList from "../components/IngredientsList";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const IngredientsPage = () => {
  const navigate = useNavigate();

  const { token, setToken } = useAuth();

  useEffect(() => {
    // Example: Check if token is null and redirect to login if necessary
    if (!token) {
      console.log("No token, redirecting to login");
      // You could use `navigate` from `react-router-dom` to redirect
    }
  }, [token]);

  return (
    <div
      className="bg-light"
      style={{
        minHeight: "100vh", // makes sure the background spans the full viewport height
        display: "flex", // Optional: Ensures child elements can stack vertically
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "2rem",
          paddingBottom: "4rem", // makes sure content doesn't overlap with the navbar
        }}
      >
        {/* Logout Button */}
        <button
          onClick={() => navigate("/")}
          className="btn btn-light-yellow"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            border: "none",
            borderRadius: "5px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          log out
        </button>

        <h1 style={{ color: "#660000" }}>enter your ingredients</h1>
        <p style={{ color: "#660000" }}>
          type the ingredients you have, and we'll generate recipes for you!
        </p>
        <div>
          <IngredientsList/>
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default IngredientsPage;
