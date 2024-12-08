import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import supabase from "../../backend/utils/client";

const FavoritesPage = ({ token }: { token: any }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token value in useEffect:", token);

    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/favorites?user_id=${token.user.id}`
        );
        const data = await response.json();
        setFavoriteRecipes(data || []);
        setFavorites(new Set(data?.map((_, index) => index) || []));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [token]);

  // Save favorite to Supabase
  const toggleFavorite = async (
    index: number,
    recipeData: { recipe: string; instructions: string }
  ) => {
    const isFavorite = favorites.has(index);

    // Remove from favorites if it's already favorited
    if (isFavorite) {
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        newFavorites.delete(index);
        return newFavorites;
      });

      const normalizedRecipeData = favoriteRecipes[index].recipe_data;
      console.log("normalized recipe data");
      console.log(normalizedRecipeData);

      // Remove from Supabase
      const { data, error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", token)
        .eq("recipe_data", normalizedRecipeData);

      if (error) {
        console.error("Error removing favorite:", error);
      } else {
        console.log("user_id", token);
        console.log("recipe_id", index);
        console.log("recipe_data", normalizedRecipeData);
        console.log("Favorite successfully removed!", data);
      }
    } else {
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        newFavorites.add(index);
        return newFavorites;
      });

      // Insert into Supabase
      await supabase.from("favorites").insert([
        {
          user_id: token, // store the user's ID or token
          recipe_id: index,
          recipe_data: JSON.stringify(recipeData), // store the recipe data (or just the ID)
        },
      ]);
    }
  };
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
                    <button
                      className={`btn ${
                        favorites.has(index)
                          ? "btn-danger"
                          : "btn-outline-danger"
                      } mt-3`}
                      onClick={() => toggleFavorite(index, recipeData)}
                    >
                      {favorites.has(index) ? "unfavorite" : "favorite"} ❤️
                    </button>
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
