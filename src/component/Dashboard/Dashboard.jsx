import React, { useEffect, useState } from "react";
import ChartComponent from "./Chart1";
import Recommendations from "./Recommendations";
import WeatherData from "./WeatherData";
import Alert from "./alert";

const API_KEY = "f7b9f529ddf845beaff8fd4d92160f44"; // Your Weather API key
const MOISTURE_API_URL = "http://localhost:5000/get_latest_moisture"; // Ensure this route is correct
const PREDICTION_API_URL = "http://localhost:5000/predict_pest"; // Route for pest prediction

const initialTemperatureData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Weekday Average",
  ],
  label: "Temperature (°C)",
  values: [26.5, 28.3, 27.7, 29.0, 25.6, 24.8, 26.9, 27.0],
  backgroundColor: "rgba(75,192,192,0.2)",
  borderColor: "rgba(75,192,192,1)",
};

const initialMoistureData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Weekday Average",
  ],
  label: "Moisture (%)",
  values: [30.6, 67.1, 90, 35, 30.6, 67.1, 90, 35, 27.7],
  backgroundColor: "rgba(153,102,255,0.2)",
  borderColor: "rgba(153,102,255,1)",
};

function Dashboard() {
  const [temperatureData, setTemperatureData] = useState(initialTemperatureData);
  const [moistureData, setMoistureData] = useState(initialMoistureData);
  const [cropInput, setCropInput] = useState(""); // State for crop input
  const [prediction, setPrediction] = useState(null); // State for the pest prediction result


   // Depend on lat and lon

  // Handle form submission for pest prediction
  const handlePredict = (e) => {
    e.preventDefault();
    fetch(PREDICTION_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ crop: cropInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming data.prediction has the format "Pest Type, Chance"
        const [pestType, chance] = data.prediction.split(",");
        const infestationChance = parseFloat(chance).toFixed(2); // Format to 2 decimal places
        const chanceLevel = infestationChance >= 80 ? "high" : "low"; // Determine chance level
        const color = chanceLevel === "high" ? "text-red-500" : "text-green-500"; // Set color based on chance level

        setPrediction({ pestType, infestationChance, color });
      })
      .catch((error) => console.error("Error fetching prediction:", error));
  };

  return (
    <main className="flex flex-col items-center p-5 bg-[#1b1b1b] text-white min-h-screen mt-16">
      <header className="w-full text-center py-5">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </header>
      <section className="w-full flex flex-col items-center mb-10">
        <h2 className="py-4 text-center bg-[#242424] text-white font-bold w-full max-w-4xl rounded">
          TRENDS AND CHARTS
        </h2>
        <div className="flex justify-around w-full max-w-5xl mt-5 space-x-5">
          <div className="flex-1 p-5 bg-[#242424] rounded shadow-md">
            <h3 className="text-center bg-[#ff6f61] text-white p-2 rounded">
              Moisture Trends
            </h3>
            <ChartComponent data={moistureData} />
          </div>
          <div className="flex-1 p-5 bg-[#242424] rounded shadow-md">
            <h3 className="text-center bg-[#f4a261] text-white p-2 rounded">
              Temperature Trends
            </h3>
            <ChartComponent data={temperatureData} />
          </div>
        </div>
      </section>

      {/* Add Crop Input Form */}
      <section className="w-full flex flex-col items-center mb-10">
        <h2 className="py-4 text-center bg-[#242424] text-white font-bold w-full max-w-4xl rounded">
          Pest Prediction
        </h2>
        <form
          onSubmit={handlePredict}
          className="flex flex-col items-center space-y-3"
        >
          <input
            type="text"
            placeholder="Enter Crop Name"
            value={cropInput}
            onChange={(e) => setCropInput(e.target.value)}
            className="px-3 py-2 rounded bg-[#242424] text-white"
          />
          <button
            type="submit"
            className="bg-[#ff6f61] text-white px-4 py-2 rounded"
          >
            Predict Pest Infestation
          </button>
        </form>

        {/* Display Prediction Result */}
        {prediction && (
          <div className={`mt-5 p-4 rounded ${prediction.color}`}>
            <h3 className="font-bold">Predicted Pest Infestation:</h3>
            <p>{`${prediction.pestType} ${prediction.infestationChance}%`}</p>
            <p className="italic">{`${
              prediction.infestationChance >= 80 ? "High" : "Low"
            } chances`}</p>
          </div>
        )}
      </section>

      <WeatherData />
      <Alert />
      <Recommendations currentMoisture={moistureData.values[0]} />
    </main>
  );
}

export default Dashboard;
