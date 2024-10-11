# Project 1: Web Site Prototyping
ITIS 5166 - Project 1 Info
Diego Lopez, Andy Ha

## Table of Contents
1. [Screenshots of Application Pages](#1-screenshots-of-application-pages)
2. [Explanation of Additional Features](#2-explanation-of-additional-features)
3. [Status, Stopping Point, and Issues](#3-status-stopping-point-and-issues)
4. [Easy and Challenging Parts](#4-easy-and-challenging-parts)
5. [Technologies Used](#5-technologies-used)
6. [Project Structure](#6-project-structure)
7. [Setup and Installation](#7-setup-and-installation)

## 1. Screenshots of Application Pages
- Home
- Events page
- Events Detail
- New Event
- Login
- Sign up
- About
- Contact

(Note: Screenshots to be added here)

## 2. Explanation of Additional Features
- JavaScript for inserting headers and footers, allowing for easy across-the-board changes in one location (js/script.js)
- Preliminary code for dynamic event data storage (currently non-functional)
- Contact page for future implementation of direct user communication

## 3. Status, Stopping Point, and Issues
- Frontend is mostly complete
- Areas for improvement:
  - More information about the organization and website purpose
  - Styling for login/signup pages (intentionally left unstyled as a reminder of incompleteness)
- Incomplete and unused code files await backend establishment

  - Considered JSON file approach, but decided against due to CORS issues and anticipated database implementation

## 4. Easy and Challenging Parts
Easy:
- Initial source code setup (similar to previous lab requirements)
- Consistent header and footer implementation using js/script.js

Challenging:
- Proper alignment and grouping of header and footer elements
- Conceptualizing dynamic event population without a backend

## 5. Technologies Used
- Node.js
- Express.js
- EJS (Embedded JavaScript templating)
- CSS
- JavaScript
- Luxon (for date handling)
- UUID (for generating unique IDs)

## 6. Project Structure
The project follows a typical MVC (Model-View-Controller) structure:

- `models/`: Contains data models (e.g., event.js)
- `views/`: EJS templates for rendering pages
- `controllers/`: Logic for handling requests (e.g., eventController.js)
- `routes/`: Express routes (e.g., eventRoutes.js)
- `public/`: Static assets (CSS, client-side JavaScript, images)
- `app.js`: Main application file

## 7. Setup and Installation
1. Clone the repository
2. Run `npm install` to install dependencies
3. Start the server with `node app.js`
4. Access the application at `http://localhost:3000`
