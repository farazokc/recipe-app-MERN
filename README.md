# Recipes App Documentation

## Overview

The Recipes app is a web application built on the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides users with the ability to create accounts, post recipes, view recipes shared by others, and save their favorite recipes.

## Features

- **User Authentication**
  - Users can register and login securely to access the app.
  
- **Recipe Management**
  - Users can create, edit, and delete their own recipes.
  
- **Recipe Sharing**
  - Users can view recipes posted by other users.
  
- **Recipe Saving**
  - Users can save recipes posted by others to their profile.
  
## Technology Stack

- **Frontend**
  - React.js
  - React Router
  - Axios (for API requests)
  
- **Backend**
  - Node.js
  - Express.js
  - MongoDB (using MongoDB Atlas for cloud hosting)
  - Mongoose (for MongoDB object modeling)
  - JSON Web Tokens (JWT) for authentication
  
## System Requirements

- Node.js (latest LTS version)
- MongoDB Atlas account for database hosting (or use local server)
- Git (for version control)
- IDE (e.g., Visual Studio Code) 

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/farazokc/recipe-app-MERN/
   ```

2. Install dependencies:
   ```bash
   cd client
   npm install
   
   cd ../server
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `server` directory and set the following variables:
     ```plaintext
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

4. Start the development server:
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```

   - Start the frontend server (in a separate terminal):
     ```bash
     cd client
     npm run dev
     ```

5. Access the app:
   - Open a web browser and navigate to `http://localhost:5173` to use the Recipes app.

## Usage

1. Register a new account or login with existing credentials.
2. Navigate to the recipes section to view and post recipes.
3. Save recipes from other users to your profile for quick access.
