# what2whip
what2whip is a web application that allows users to input a list of ingredients they have at home, and it generates a set of easy-to-follow recipes using those ingredients. It leverages OpenAI for generating the recipes, Supabase for managing user data and favorites, and integrates React with Bootstrap for the frontend.

# Recipe Generation

A key feature of what2whip is the recipe generation, which is powered by OpenAI's GPT model. After users enter their ingredients, the app sends the input to OpenAI, and it returns a list of recipes with instructions on how to prepare them. This feature is a great way for users to explore new dishes using the ingredients they already have at home.

# Software I Built it with:

- React.js: A JavaScript library used to build the interactive front-end of the application.

- Vite: A next-generation, fast bundler for building and running the app.

- Bootstrap: A popular CSS framework that helps style the app with ready-made components.

- Supabase: A backend-as-a-service (BaaS) used to handle authentication and store favorite recipes.

- OpenAI GPT: The model used to generate recipe suggestions based on the ingredients provided by the user.

- Axios: A library used to make HTTP requests for API calls to OpenAI and Supabase.

  # To Use:
- Download Node.js
- Sign up for a Supabase account
- Get your OpenAI API key

Then fork and clone this repository,
- Install dependencies (npm install)
- Create an .env file in root backend directory and set OPENAI_API_KEY="your key"
- Run application (npm run dev)

# DEMO:
