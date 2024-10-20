import React, { useEffect, useState } from "react";
import { WiThermometer, WiHumidity, WiStrongWind, WiCloud, WiRaindrop } from "react-icons/wi"; // Import weather icons from react-icons
import { fetchWeatherData } from './weatherApi'; // Import the fetchWeatherData function

function WeatherData() {
  const [weather, setWeather] = useState({
    temp: '',
    humidity: '',
    windSpeed: '',
    forecast: '',
    rainfall: '',
  });

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    // Get user's geolocation
    const getGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log("lat+long:  ", lat, lon);
            setLocation({ latitude: lat, longitude: lon }); // Set latitude and longitude in state
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    getGeolocation(); // Call the geolocation function
  }, []); // Run only once on mount

  useEffect(() => {
    // Fetch weather data when location is available
    const { latitude, longitude } = location; // Destructure latitude and longitude from location state
    const fetchData = async () => {
      const weatherData = await fetchWeatherData(latitude, longitude);
      if (weatherData) {
        setWeather(weatherData);
      }
    };
    fetchData(); // Call the weather fetching function
  }, [location]); // Depend on location

  // Weather items with icons
  const weatherItems = [
    { label: "Current temperature:", value: weather.temp, icon: <WiThermometer className="text-blue-400 w-6 h-6" /> },
    { label: "Humidity:", value: weather.humidity, icon: <WiHumidity className="text-blue-400 w-6 h-6" /> },
    { label: "Wind speed:", value: weather.windSpeed, icon: <WiStrongWind className="text-blue-400 w-6 h-6" /> },
    { label: "Forecast:", value: weather.forecast, icon: <WiCloud className="text-blue-400 w-6 h-6" /> },
    { label: "Probable rainfall:", value: weather.rainfall, icon: <WiRaindrop className="text-blue-400 w-6 h-6" /> },
  ];

  return (
    <section className="flex flex-col items-center bg-[#242424] text-white p-5 rounded shadow-md mt-10 w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4">Weather Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
        {weatherItems.map((item, index) => (
          <div key={index} className="flex flex-row items-center p-4 bg-gray-800 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-2">
              {item.icon}
            </div>
            <span className="text-center">{item.label} {item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WeatherData;
