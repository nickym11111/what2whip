import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import supabase from "../../backend/utils/client";
import { useAuth } from "../context/AuthContext";

const FavoritesPage = () => {
  const { token, setToken } = useAuth();  

  useEffect(() => {
    // Example: Check if token is null and redirect to login if necessary
    if (!token) {
      console.log("No token, redirecting to login");
      // You could use `navigate` from `react-router-dom` to redirect
    }
  }, [token]);

  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]);
  //const [favorites, setFavorites] = useState<Set<number>>(new Set());


  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/favorites?user_id=${token}`
        );
        //console.log("response", response);
        const data = await response.json();
        //console.log("data, ", data);
        setFavoriteRecipes(data || []);
        //setFavorites(new Set(data?.map((_, index) => index) || []));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [token]);
  return (
    <div
      className="bg-light"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
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

        <h1 style={{ color: "#660000" }}>your favorite recipes</h1>
        <p style={{ color: "#660000" }}>
          here are the recipes you've saved as favorites!
        </p>

        <div className="row justify-content-center">
          {favoriteRecipes.map((item: any, index: any) => {
            const recipeData = JSON.parse(item.recipe_data);
            return (
              <div key={index} className="">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Recipe {index + 1}</h5>
                    <p className="card-text">{recipeData.recipe}</p>
                    <div className="card mt-3">
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">
                          Instructions
                        </h6>
                        <p className="card-text">{recipeData.instructions}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Navbar />
      </div>
    </div>
  );
};

export default FavoritesPage;
