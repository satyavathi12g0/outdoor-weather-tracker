Outdoor Weather Tracker
Project Overview
This is a single-page weather application that allows users to quickly retrieve current weather conditions for any city worldwide. The application demonstrates asynchronous data fetching, state management, and a responsive user interface built using modern web development practices.
The app uses a two-step API process: first, it converts a city name into geographical coordinates (latitude/longitude), and second, it uses those coordinates to fetch the detailed weather data.
Technology Stack
Category
Technology Used
Rationale
Framework
React (with Vite)
Meets the assignment requirement (React or Svelte). Utilizes functional components and Hooks.
Styling
CSS-in-JS (Inline <style> tag)
Provides custom, clean, and fully contained styling within the single React component file.
Data Fetching
Open-Meteo API (Geocoding & Forecast)
Utilizes public APIs that require no API key or authentication, meeting a core requirement.
State Management
React Hooks (useState, useEffect, useCallback)
Uses the framework's built-in state management for loading, errors, and weather data display.

Installation and Local Setup
This project was initialized using Vite with the React template.
Clone the Repository:
git clone [YOUR_REPO_URL]
cd weather-updates 
# (or whatever your project folder is named)


Install Dependencies:
npm install
# or 
# yarn install


Run the Application:
npm run dev
# or 
# yarn dev

The application will typically be available at http://localhost:5173 (or similar port).
Features
Initial Load: Automatically fetches weather for London on component mount.
Search Functionality: Allows users to search for any city by name.
Detailed Metrics: Displays temperature, wind speed, humidity, sunrise, and sunset times.
Responsive Design: Optimized for viewing on both mobile and desktop screens.
