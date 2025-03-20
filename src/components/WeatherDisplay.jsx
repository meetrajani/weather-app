import React from 'react'

const WeatherDisplay = ({ weatherData, isCelsius }) => {
    if (!weatherData) return null;
  
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const iconCode = weatherData.weather[0].icon;
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">{weatherData.name}</h2>
        <div className="flex items-center justify-center mb-4">
          <img 
            src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`} 
            alt="Weather icon"
            className="w-20 h-20"
          />
          <div>
            <p className="text-4xl font-bold">
              {Math.round(temperature)}°{isCelsius ? 'C' : 'F'}
            </p>
            <p className="text-gray-600 capitalize">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-gray-600">Humidity</p>
            <p className="font-bold">{humidity}%</p>
          </div>
          <div>
            <p className="text-gray-600">Wind Speed</p>
            <p className="font-bold">{windSpeed} {isCelsius ? 'm/s' : 'mph'}</p>
          </div>
        </div>
      </div>
    );
  };

export default WeatherDisplay
