
import IngredientsList from "../components/IngredientsList";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FavoritesPage from "./FavoritesPage";
import IngredientsPage from "./IngredientsPage";


const Homepage = ({ token }: { token: any }) => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
     
      <Routes>
        <Route
          path="/ingredients"
          element={<IngredientsPage token={token} />}
        />
        <Route path="/favorites" element={<FavoritesPage token={token} />} />
      </Routes>

     
      <Navbar />
    </div>
  );
};

export default Homepage;
