import express from "express";
import {addFavorite, removeFavorite} from "../controllers/ingredientsListController.js";
const router = express.Router();

router.post("/", addFavorite);
router.delete("/", removeFavorite);

export default router;