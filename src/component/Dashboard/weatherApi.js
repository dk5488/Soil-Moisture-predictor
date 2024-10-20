// weatherApi.js
const API_KEY = "164626be607e49c3bd511ef6e4390bf1";

// Function to fetch weather data



// Function to fetch weather data
export const fetchWeatherData = async (latitude, longitude) => {
  if (latitude && longitude) {
    /*
    const FORECAST_API_URL = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}`;
    console.log(FORECAST_API_URL);
    try {
      const response = await fetch(FORECAST_API_URL);
      const data = await response.json();
      const { temp, rh: humidity, wind_spd: windSpeed, weather, precip } = data.data[0];

      return {
        temp: `${temp} °C`,
        humidity: `${humidity}%`,
        windSpeed: `${windSpeed} m/s`,
        forecast: weather[0].description,
        rainfall: `${precip} mm`,
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null; // Return null in case of error
    }
    */
    
    // Hardcoded values
    return {
      temp: "33 °C",
      humidity: "76%",
      windSpeed: "2.22 m/s",
      forecast: "Clear sky",
      rainfall: "0 mm",
    };
  }
  return null; // Return null if no location
};
 

