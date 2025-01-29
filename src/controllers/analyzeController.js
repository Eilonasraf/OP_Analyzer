const stackoverflowService = require("../services/stackoverflowService");
const githubService = require("../services/githubService");
const analysisService = require("../services/analysisService");
exports.analyzeData = async (req, res) => {
    const { dataSourceName, analysisFlowId } = req.query;

    if (!dataSourceName || !analysisFlowId) {
        return res.status(400).json({
            message: "Missing parameters: dataSourceName or analysisFlowId" 
            });
    }

    try {
        let data;
        let processedData;

        if (dataSourceName.toLowerCase() === "stackoverflow") {
            data = await stackoverflowService.fetchStackOverflowData();
            processedData = analysisService.applyStackOverflowAnalysis(data, Number(analysisFlowId));
        } else if (dataSourceName.toLowerCase() === "github") {
            data = await githubService.fetchGitHubData();
            processedData = analysisService.applyGitHubAnalysis(data, Number(analysisFlowId));
        } else {
            return res.status(400).json({ message: "Invalid dataSourceName" });
        }

        res.json({
            message: "Analysis completed!",
            dataSourceName,
            analysisFlowId,
            resultCount: processedData.length,
            result: processedData
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};