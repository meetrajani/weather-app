import { useState } from "react";
import WeatherInput from "./components/WeatherInput";
import WeatherDisplay from "./components/WeatherDisplay";
import UnitToggle from "./components/UnitToggle";
import weather_bg from "../public/IMG/weather_bg.jpg";
import axios from "axios";
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);

  const apiKey = import.meta.env.VITE_APP_WEATHER_API_KEY;

  const fetchWeather = async (city, unit) => {
    console.log("🚀 ~ fetchWeather ~ unit:", unit);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
      );
      setWeatherData(res.data);
      setError("");
    } catch (err) {
      setError(err.response.data.message);
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    setCurrentCity(city);
    fetchWeather(city, isCelsius ? "metric" : "imperial");
  };

  const toggleUnit = () => {
    const newIsCelsius = !isCelsius;
    setIsCelsius(newIsCelsius);
    if (currentCity) {
      fetchWeather(currentCity, newIsCelsius ? "metric" : "imperial");
    }
  };

  return (
    <div>
      <div
        className={`min-h-screen bg-[url(${weather_bg})] py-8 px-4 bg-cover bg-center`}
      >
        <div className="max-w-md mx-auto bg_blor p-5">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">Weather App</h1>

          <WeatherInput
            city={city}
            setCity={setCity}
            handleSubmit={handleSubmit}
          />

          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

          <UnitToggle
            isCelsius={isCelsius}
            toggleUnit={toggleUnit}
            disabled={!currentCity}
          />

          {weatherData && (
            <WeatherDisplay weatherData={weatherData} isCelsius={isCelsius} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
