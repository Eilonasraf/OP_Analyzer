const express = require("express");
const fetchDataController = require("./controllers/fetchDataController");
const analyzeController = require("./controllers/analyzeController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON

// Route for fetching raw data 
app.get("/fetch", fetchDataController.fetchData); // Fetch data route

// Route for analyzing data
app.get("/analyze", analyzeController.analyzeData); // Analysis route

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});