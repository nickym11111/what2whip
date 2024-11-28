import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import supabase from "../utils/client";

const FavoritesPage = ({ token }: { token: any }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("recipe_data");

      if (error) {
        console.error("Error fetching favorites:", error);
      } else {
        setFavoriteRecipes(data);
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

       
        <ul>
          {favoriteRecipes.map((item, index) => {
            const recipeData = JSON.parse(item.recipe_data); 
            return (
              <li key={index}>
                <h3>{recipeData.recipe}</h3>
                <p>{recipeData.instructions}</p>
              </li>
            );
          })}
        </ul>

        <Navbar />
      </div>
    </div>
  );
};

export default FavoritesPage;
