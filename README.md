🌦️ CloudCast: Dynamic Weather Dashboard
CloudCast is a high-performance, responsive weather application built with React and Vite. It features a "catchy" Glassmorphism UI that adapts its entire color theme based on the real-time weather conditions of the searched city.

🔗 [Live Demo](https://salmon6934.github.io/weather-app/)

🚀 Key Features
Dynamic UI Engine: The background and card styles change dynamically (Clear, Cloudy, Rainy, Stormy, Snowy) using custom CSS classes tied to API weather codes.

Intelligent Search: A searchable datalist featuring 50+ global cities, allowing users to select from a list or search manually.

Real-time Data: Integrated with the Open-Meteo API for high-accuracy weather data without the need for an API key.

Glassmorphism Design: A modern UI/UX approach using backdrop filters for a premium "frosted glass" look.

Responsive & Animated: Fully optimized for mobile devices with smooth fade-in and floating animations for icons.

🛠️ Tech Stack
Frontend: React 19 (Vite)

Icons: Lucide-React

Styling: Custom CSS3 (Flexbox, CSS Variables, Glassmorphism)

API: Open-Meteo (Geocoding & Forecast)

Deployment: GitHub Pages

📐 Technical Implementation
1. The "Double-Fetch" Pattern
The app first hits the Geocoding API to convert a city string into latitude and longitude coordinates, then passes those coordinates to the Forecast API to get current weather data.

2. State Management
Used React useState and useEffect hooks to manage loading states, weather data objects, and the search input logic.

3. Data Modularization
Location data is stored in a standalone cities.js module, ensuring the logic in App.jsx remains clean and the dataset can be scaled easily without affecting the core code.
