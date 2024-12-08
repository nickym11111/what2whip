
import IngredientsList from "../components/IngredientsList";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FavoritesPage from "./FavoritesPage";
import IngredientsPage from "./IngredientsPage";
import React from "react";


const Homepage = ({ token }: { token: any }) => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
     
      <Routes>
        <Route
          path="/ingredients"
          element={<IngredientsPage />}
        />
        <Route path="/favorites" element={<FavoritesPage/>} />
      </Routes>

     
      <Navbar />
    </div>
  );
};

export default Homepage;
