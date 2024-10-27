import React from 'react';

function Recommendations({ currentMoisture }) {
  const plantingTime = "April to June";
  const harvestTime = "September to November";

  const recommendationItems = [
    { label: "Watering Suggestion:", value: wateringSuggestion },
    { label: "Optimal Planting Time:", value: plantingTime },
    { label: "Optimal Harvest Time:", value: harvestTime },
  ];
   
  let wateringSuggestion = "";
  if (currentMoisture < 35) {
    wateringSuggestion = "The moisture level is low. It is recommended to increase watering to ensure optimal growth.";
  } else if (currentMoisture >= 35 && currentMoisture <= 70) {
    wateringSuggestion = "The moisture level is adequate. No additional watering is required at the moment.";
  } else {
    wateringSuggestion = "The moisture level is high. Ensure proper drainage to avoid waterlogging.";
  }

 

  return (
    <section className="flex flex-col items-center bg-[#242424] text-white p-5 rounded shadow-md mt-10 w-full max-w-4xl">
      <h2 className="text-xl font-bold">Recommendations</h2>
      <ul className="pt-4">
        {recommendationItems.map((item, index) => (
          <li key={index} className={index > 0 ? "mt-4" : ""}>
            {item.label} {item.value}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Recommendations;
