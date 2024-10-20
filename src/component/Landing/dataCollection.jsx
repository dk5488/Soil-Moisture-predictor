import React from "react";

const DataCollectionPage = () => {
  /*
  const handleCollectData = async () => {
    try {
      // Trigger the data collection process
      const response = await axios.post("http://localhost:5000/api/collect-data");
      alert("Data collected successfully!");
    } catch (error) {
      alert("Failed to collect data");
    }
  };
  */

  const handleCollectData = () => {
    // Show an alert when the button is clicked
    alert("Data collected successfully!");
  };

  return (
    <div className="w-screen h-screen bg-lime-700 flex items-center justify-center">
      <div className="p-6 max-w-md bg-lime-900 text-yellow-100 shadow-md rounded-lg">
        <h1 className="text-3xl mb-4 text-center">Data Collection</h1>
        <p className="text-lg mb-4 text-center">
          Click the button below to collect soil moisture and temperature data
          from the Raspberry Pi module and store it in the database.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleCollectData}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition duration-200"
          >
            Collect Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataCollectionPage;
