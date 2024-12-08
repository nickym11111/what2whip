import express from "express";
const router = express.Router();
import {getFavorites, addFavorite, removeFavorite} from "../controllers/favoritesController.js";

// Define routes
router.get("/", getFavorites);
router.post("/", addFavorite);
router.delete("/", removeFavorite);

export default router;