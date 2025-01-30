const express = require("express");
const fetchDataController = require("./controllers/fetchDataController");
const analyzeController = require("./controllers/analyzeController");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON 
app.use(express.json()); 

// Route for fetching raw data 
app.get("/fetch", fetchDataController.fetchData); 

// Route for analyzing data
app.get("/analyze", analyzeController.analyzeData); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});