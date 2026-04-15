import React, { useState } from 'react';
import { 
  Search, MapPin, Wind, Droplets, 
  Sun, Cloud, CloudRain, CloudLightning, CloudSnow, CloudFog 
} from 'lucide-react';
import './App.css';
import { countryData } from './cities';

const allCitiesFlattened = countryData.flatMap(item => 
  item.cities.map(cityName => `${cityName}, ${item.country}`)
);

const WeatherIcon = ({ code }) => {
  if (code === 0) return <Sun size={48} color="#FFD700" />; 
  if (code >= 1 && code <= 3) return <Cloud size={48} color="#bdc3c7" />; 
  if (code >= 45 && code <= 48) return <CloudFog size={48} color="#ecf0f1" />; 
  if (code >= 51 && code <= 67) return <CloudRain size={48} color="#3498db" />; 
  if (code >= 71 && code <= 77) return <CloudSnow size={48} color="#ffffff" />; 
  if (code >= 80 && code <= 82) return <CloudRain size={48} color="#2980b9" />; 
  if (code >= 95) return <CloudLightning size={48} color="#f1c40f" />; 
  return <Sun size={48} />;
};

const getWeatherDescription = (code) => {
  const descriptions = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Slight Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    77: "Snow Grains",
    80: "Slight Rain Showers",
    81: "Moderate Rain Showers",
    82: "Violent Rain Showers",
    95: "Thunderstorm",
    96: "Thunderstorm with Slight Hail",
    99: "Thunderstorm with Heavy Hail"
  };
  return descriptions[code] || "Unknown Conditions";
};

const getWeatherClass = (code) => {
  if (code === 0) return 'clear';
  if (code >= 1 && code <= 3) return 'cloudy';
  if (code >= 51 && code <= 67 || code >= 80 && code <= 82) return 'rain';
  if (code >= 95) return 'storm';
  if (code >= 71 && code <= 77) return 'snow';
  return 'default';
};


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    const cityNameOnly = city.split(',')[0].trim();
    if (!cityNameOnly) return;

    setLoading(true);
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityNameOnly}&count=1`);
      const geoData = await geoRes.json();

      if (!geoData.results) {
        alert("City not found. Please try again");
        setLoading(false);
        return;
      }
      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`);
      const weatherData = await weatherRes.json();
      
      setWeather({
        name,
        country,
        temp: Math.round(weatherData.current_weather.temperature),
        wind: weatherData.current_weather.windspeed,
        condition: weatherData.current_weather.weathercode,
        humidity: weatherData.hourly.relativehumidity_2m[0]
      });
      
      document.activeElement.blur();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${weather ? getWeatherClass(weather.condition) : 'default'}`}>
      <div className="glass-card">
        <h2 className="title">CloudCast</h2>
        
        <div className="search-section">
          <label htmlFor="city-choice" className="label">Search or Select City:</label>
          <div className="input-wrapper">
            <input 
              list="city-list" 
              id="city-choice" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
              onFocus={() => setCity('')}
              placeholder="e.g. Patna, India" 
              className="search-input"
              autoComplete="off"
            />
            <button className="search-btn" onClick={fetchWeather}>
              <Search size={20} />
            </button>
          </div>

          <datalist id="city-list">
            {allCitiesFlattened.map((location, index) => (
              <option key={index} value={location} />
            ))}
          </datalist>
        </div>

        {loading ? (
          <div className="loading">Detecting atmosphere...</div>
        ) : weather && (
          <div className="weather-info fade-in">
            <div className="location">
              <MapPin size={18} />
              <h2>{weather.name}, {weather.country}</h2>
            </div>
            <div className="main-icon">
              <WeatherIcon code={weather.condition} />
            </div>
            <h1 className="temp">{weather.temp}°C</h1>
            <div className="details">
              <div className="col">
                <Wind size={20} />
                <p>{weather.wind} km/h</p>
                <span>Wind</span>
              </div>
              <div className="col">
                <Droplets size={20} />
                <p>{weather.humidity}%</p>
                <span>Humidity</span>
              </div>
              <div className="col">
                <Sun size={20} />
                <p>{getWeatherDescription(weather.condition)}</p>
                <span>Condition</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;