import React from "react";
import InfoCard from "./InfoCard";

const cardData = [
  {
    title: "Sensor Integration",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b3f227ef8652a0126810042b9c47dfabb9b8516b22c8d72b0b5313c158afeec8?placeholderIfAbsent=true&apiKey=cdd4be375e274f5caa50a54b1c2c5464",
    content: [
      "Soil Moisture Sensors: Utilize specialized sensors to measure the moisture content in the soil. These sensors are connected to the Raspberry Pi via GPIO (General Purpose Input/Output) pins.",
      "Continuous Monitoring: Sensors provide real-time data on soil hydration, which is essential for understanding current soil conditions.",
      "Data Collection: The Raspberry Pi collects and logs sensor data, ensuring accurate and timely information about soil moisture levels.",
    ],
  },
  {
    title: "Data Transmission",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d6d249c50df7936cf00e02b33dab160c2e24c8b8ffc68c0a4485ad2369ab5b92?placeholderIfAbsent=true&apiKey=cdd4be375e274f5caa50a54b1c2c5464",
    content: [
      "Data Reading: The Raspberry Pi periodically reads moisture data from the connected sensors, capturing accurate soil hydration levels.",
      "Data Logging: Sensor readings are stored on the Raspberry Pi, creating a historical record of soil moisture levels for analysis.",
      "Data Accessibility: The logged data is made accessible through a user interface, allowing users to view and monitor soil conditions over time.",
    ],
  },
  {
    title: "Data Analysis",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/69772310e5ad607643a7e517e9c0287cf4bfaa0b7579833913f3b08b57f08f3e?placeholderIfAbsent=true&apiKey=cdd4be375e274f5caa50a54b1c2c5464",
    content: [
      "Processing: The Raspberry Pi processes the collected data to identify trends and patterns in soil moisture levels.",
      "Visualization: Data is presented through graphs and charts, providing a clear visual representation of soil moisture trends and variations.",
      "Insights Generation: Analysis helps in understanding soil conditions and predicting future moisture levels based on historical data.",
    ],
  },
  {
    title: "Actionable Insights",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bf5cc91bab18175ec0ec12e50d121061cded2fe1a15db6e3976c4ee96978d518?placeholderIfAbsent=true&apiKey=cdd4be375e274f5caa50a54b1c2c5464",
    content: [
      "Recommendations: Based on the data analysis, users receive actionable recommendations for irrigation and soil management to optimize water usage.",
      "Alerts: Users are notified of significant changes in soil moisture levels, allowing for timely interventions to address potential issues.",
      "Improved Decision-Making: The insights provided support informed decision-making, helping users manage soil conditions and enhance crop health effectively.",
    ],
  },
];

function MyComponent() {
  return (
    <main className="w-full min-h-screen bg-[#1b1b1b] text-white">
      <div className="flex flex-col items-center p-10 max-w-screen-lg mx-auto mt-10">
        <header className="w-full text-center p-5 bg-[#242424] text-white rounded-lg mb-10">
          <h1 className="text-3xl font-bold">Discover How Our Product Works</h1>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {cardData.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default MyComponent;
