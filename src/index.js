const express = require("express");
const analyzeController = require("./controllers/analyzeController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON

// Define the main API route
app.get("/analyze", analyzeController.analyze);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});