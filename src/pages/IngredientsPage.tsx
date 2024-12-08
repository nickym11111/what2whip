import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IngredientsList from "../components/IngredientsList";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const IngredientsPage = () => {
  const navigate = useNavigate();

  const { token, setToken } = useAuth();

  useEffect(() => {
    if (!token) {
      console.log("No token, redirecting to login");
      
    }
  }, [token]);

  return (
    <div
      className="bg-light"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "6rem",
      }}
    >
      <div
        style={{
          padding: "2rem",
          paddingBottom: "4rem", 
        }}
      >
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
