const express = require("express");
const router = express.Router();
const MoistureReading = require("./models/MoistureReading");

// Route to fetch moisture data
router.get("/showData", async (req, res) => {
  try {
    const data = await MoistureReading.find()
      .sort({ timestamp: -1 })
      .limit(100);
    console.log("Fetched Data:", data); // Log the fetched data
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
