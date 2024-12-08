import React, { useEffect, useState } from "react";
import Configuration from "openai";
import OpenAI from "openai";
import { ApiKey } from "aws-cdk-lib/aws-apigateway";
import axios from "axios";
import supabase from "../../backend/utils/client";

const IngredientsList = ({ token }: { token: any }) => {
  const [ingredient, setIngredient] = useState<string>(
    sessionStorage.getItem("ingredient") || ""
  );
  const [ingredients, setIngredients] = useState<string[]>(
    JSON.parse(sessionStorage.getItem("ingredients") || "[]")
  );
  const [recipes, setRecipes] = useState<
    { recipe: string; instructions: string }[]
  >(JSON.parse(sessionStorage.getItem("recipes") || "[]"));
  const [favorites, setFavorites] = useState<Set<number>>(
    new Set(JSON.parse(sessionStorage.getItem("favorites") || "[]"))
  );

  const [loading, setLoading] = useState<boolean>(false);
  //const [cachedResponses, setCachedResponses] = useState<
  //  Record<string, string[]>
  // >({});

  // Save states to localStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("ingredient", ingredient);
  }, [ingredient]);

  useEffect(() => {
    sessionStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    sessionStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    sessionStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const addIngredient = () => {
    if (ingredient.trim() !== "") {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient(""); // Clear the input field
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addIngredient();
    }
  };

  const dismissIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const callBackendAPI = async () => {
    if (ingredients.length === 0) {
      alert("Please add some ingredients before generating recipes!");
      return;
    }
    console.log(ingredients);
    // set the prompt for the backend
    const prompt = `Briefly generate 3 concise recipes with these ingredients: ${ingredients.join(
      ", "
    )}. Please provide the recipes with their instructions in a readable format and label "Recipe 1","Recipe 2", "Recipe 3",`;
    /*
    if (cachedResponses[prompt]) {
      setRecipes(cachedResponses[prompt]); // Split and update recipes
      return;
    }
*/
    setLoading(true);

    try {
      // POST request to my backend server
      const response = await axios.post("http://localhost:3000/api/generate", {
        prompt,
      });

      // set the generated recipes
      const generatedText = response.data.generatedText || "No recipes found.";
      const recipeArray =
        generatedText
          .match(/Recipe \d+:.*?(?=\nRecipe \d+:|$)/gs) // extracts each numbered recipe as a block
          ?.map((recipe: string) =>
            recipe.replace(/^Recipe \d+:\s*/gs, "").trim()
          ) || [];

      const recipeInstructionDict = recipeArray.map(
        (recipe: { split: (arg0: RegExp) => [any, any] }) => {
          const [ingredientsPart, instructionsPart] =
            recipe.split(/Instructions:/i);
          return {
            recipe: ingredientsPart.trim(),
            instructions: instructionsPart ? instructionsPart.trim() : "",
          };
        }
      );
      setRecipes(recipeInstructionDict);

      // Update cache
      // setCachedResponses({ ...cachedResponses, [prompt]: recipeArray });
    } catch (error) {
      console.error("Error calling the backend API:", error);
      setRecipes([
        {
          recipe: "An error occurred while generating recipes.",
          instructions: "",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };



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

      
      // Remove from Supabase
      await fetch("http://localhost:3000/ingredientsList", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: token,
          recipe_data: index,
        }),
      });
    } else {
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        newFavorites.add(index);
        return newFavorites;
      });

      // Insert into Supabase
      // Call backend to add favorite
    await fetch("http://localhost:3000/ingredientsList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: token,
        recipe_id: index,
        recipe_data: recipeData,
      }),
    });
  }
  };
  

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h1 className="mb-3 text-center" style={{ color: "#660000" }}>
            ingredients list
          </h1>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="enter an ingredient"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="btn btn-light-red"
              data-bs-toggle="button"
              onClick={addIngredient}
            >
              add ingredient
            </button>
          </div>
          <ul className="list-group">
            {ingredients.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item}
                <button
                  type="button"
                  className="btn-close btn-sm"
                  aria-label="Close"
                  onClick={() => dismissIngredient(index)}
                ></button>
              </li>
            ))}
          </ul>
          <button
            className="btn btn-light-red justify-content-center mt-4"
            onClick={callBackendAPI}
            disabled={loading}
          >
            {loading ? "generating..." : "generate Recipes"}
          </button>
          {recipes.length > 0 && (
            <div className="mt-4">
              <h2>generated recipes:</h2>
              <div className="row justify-content-center">
                {recipes.map((recipeData, index) => (
                  <div key={index} className="">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Recipe {index + 1}</h5>
                        <p className="card-text">{recipeData.recipe}</p>

                        {/* Nested card for instructions */}
                        <div className="card mt-3">
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">
                              Instructions
                            </h6>
                            <p className="card-text">
                              {recipeData.instructions}
                            </p>
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
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientsList;
