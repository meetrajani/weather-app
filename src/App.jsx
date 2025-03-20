import { useState } from 'react';
import WeatherInput from './components/WeatherInput';
import WeatherDisplay from './components/WeatherDisplay';
import UnitToggle from './components/UnitToggle';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);

  const apiKey = import.meta.env.VITE_APP_WEATHER_API_KEY;

  const fetchWeather = async (city, unit) => {
    console.log("🚀 ~ fetchWeather ~ unit:", unit)
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);
      setWeatherData(res.data);
      setError('');
    } catch (err) {
      setError(err.response.data.message);
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    setCurrentCity(city);
    fetchWeather(city, isCelsius ? 'metric' : 'imperial');
  };

  const toggleUnit = () => {
    const newIsCelsius = !isCelsius;
    setIsCelsius(newIsCelsius);
    if (currentCity) {
      fetchWeather(currentCity, newIsCelsius ? 'metric' : 'imperial');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Weather App</h1>
        
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

        {weatherData && <WeatherDisplay weatherData={weatherData} isCelsius={isCelsius} />}
      </div>
    </div>
  );
}

export default App;