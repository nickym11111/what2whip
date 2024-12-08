import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Open from "./pages/Open";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { useEffect, useState } from "react";
import IngredientsPage from "./pages/IngredientsPage";
import FavoritesPage from "./pages/FavoritesPage";
import React from "react";
import { AuthProvider } from "./context/AuthContext";

function App() {

  return (
    <div>
      <AuthProvider> 
      <Routes>
        <Route path={"/"} element={<Open />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/login"} element={<Login  />} />
        <Route
          path="/ingredients"
          element={<IngredientsPage  />}
        />
        <Route path="/favorites" element={<FavoritesPage  />} />
        
      </Routes>
      </AuthProvider>
    </div>
  );
}
export default App;
