import supabase from "../utils/client.js";

// Add a favorite
export const addFavorite = async (req, res) => {
  const { user_id, recipe_id, recipe_data } = req.body;

  try {
    const { data, error } = await supabase.from("favorites").insert([
      {
        user_id,
        recipe_id,
        recipe_data: JSON.stringify(recipe_data),
      },
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: "Favorite added", data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Remove a favorite
export const removeFavorite = async (req, res) => {
  const { user_id, recipe_data } = req.body;

  try {
    const { data, error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user_id)
      .eq("recipe_data", JSON.stringify(recipe_data));

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Favorite removed", data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

