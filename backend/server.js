import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import ingredientsListRoutes from "./routes/ingredientsListRoutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";
dotenv.config();


const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json());
app.use("/ingredientsList", ingredientsListRoutes);
app.use("/favorites", favoritesRoutes);


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

const cache = new Map();

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    console.log("OpenAI API Response:",  response.choices[0].message.content);
    const result = response.choices[0].message.content;

    console.log("Made it here");
    cache.set(prompt, result);

    res.json({ generatedText: result });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).json({ error: "An error occurred while generating recipes." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
