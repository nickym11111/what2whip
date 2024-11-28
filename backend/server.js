const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const port = 3000;

// Enable CORS
app.use(cors()); // Allow requests from your frontend origin

// Middleware
app.use(express.json());

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your OpenAI API key
});

const cache = new Map();

// API endpoint to handle requests
app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  
/*
  if (cache.has(prompt)) {
    return res.json({ generatedText : cache.get(prompt) });
  }
*/
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      //max_tokens: 300,
     // temperature: 0.7,
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
