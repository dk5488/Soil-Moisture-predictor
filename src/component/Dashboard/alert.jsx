import React, { useEffect, useState } from "react";

const API_KEY = "71168e41928a428bbb416337b9b89e5c";
const FORECAST_API_URL = `https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=${API_KEY}`;
const PEST_PREDICTION_API_URL = "http://127.0.0.1:5000/predict_pest"; // Update with your backend URL

const RICE_TEMP_MIN = 15;
const RICE_TEMP_MAX = 35;
const MOISTURE_MIN = 50;
const MOISTURE_MAX = 70;

function Alert() {
  const [alert, setAlert] = useState("");
  const [pestTypes, setPestTypes] = useState([]);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    // Fetch weather data
    fetch(FORECAST_API_URL)
      .then(response => response.json())
      .then(weatherData => {
        const currentTemp = weatherData.data[0].temp;
        const currentMoisture = 32; // Example value; replace with actual data

        let alertMessage = "";
        if (currentTemp < RICE_TEMP_MIN || currentTemp > RICE_TEMP_MAX) {
          alertMessage += `Temperature is ${currentTemp} °C, which is not ideal for rice crops.\n`;
        }
        
        if (currentMoisture < MOISTURE_MIN) {
          alertMessage += `Soil moisture level is ${currentMoisture}%, which is not optimal for rice crops. Please water the soil immediately. `;
        }

        if (currentMoisture > MOISTURE_MAX) {
          alertMessage += `Soil moisture level is ${currentMoisture}%, which is not optimal for rice crops. Please start the drainage process immediately. `;
        }

        setAlert(alertMessage || "Conditions are favorable for rice crops.");
        setIsBlinking(alertMessage !== "");

        // Fetch pest prediction from backend
        return fetch(PEST_PREDICTION_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            crop: "Rice", // Adjust according to your application
            soil_moisture: currentMoisture,
            temperature: currentTemp,
            weather_condition: "Humid", // Replace with actual condition if available
          }),
        });
      })
      .then(response => response.json())
      .then(pestData => {
        if (pestData.possible_pests) {
          setPestTypes(pestData.possible_pests);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <section className="flex flex-col items-center p-5 bg-[#242424] text-white rounded shadow-md mt-10 w-full max-w-4xl">
      <h2 className={`text-xl font-bold ${isBlinking ? 'animate-blink text-alert' : ''}`}>Alert</h2>
      <p className="mt-2">{alert}</p>
      {pestTypes.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Possible Pests:</h3>
          <ul className="list-disc list-inside">
            {pestTypes.map((pest, index) => (
              <li key={index}>{pest}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default Alert;
