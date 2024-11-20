# ITIS 5166 Project
Parts 1, 2: Diego Lopez, Andy Ha
Parts 3, 4, 5: Andy

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Project Structure](#project-structure)
3. [Setup and Installation](#setup-and-installation)

## Technologies Used
- Node.js
- Express.js
- MongoDB

## Project Structure
The project follows a typical MVC (Model-View-Controller) structure:

- `app.js`: Main application file
- `models/`: Contains data models
- `views/`: EJS templates for rendering pages
- `controllers/`: Logic for handling requests
- `routes/`: Express routes
- `public/`: Static assets (CSS, images)

## Setup and Installation
1. Clone the repository
2. Run `npm install` to install dependencies
3. Copy `.env.example` to `.env`
4. Update the `H_MONGODB_URL` environment variable in `.env` to point to your MongoDB address
5. Start the server with `node app.js`
6. Access the application at `http://localhost:3000`
