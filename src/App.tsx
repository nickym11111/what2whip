import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Open from "./pages/Open";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { useEffect, useState } from "react";
import IngredientsPage from "./pages/IngredientsPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  const [token, setToken] = useState(false);
  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const data = JSON.parse(token); // safe to parse since token is confirmed to be a string
      setToken(data);
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Open />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/login"} element={<Login setToken={setToken} />} />
        <Route
          path="/ingredients"
          element={<IngredientsPage token={token} />}
        />
        <Route path="/favorites" element={<FavoritesPage token={token} />} />


        {token ? (
          <Route path={"/homepage"} element={<Homepage token={token} />} />
        ) : (
          ""
        )}
      </Routes>
    </div>
  );
}
export default App;
