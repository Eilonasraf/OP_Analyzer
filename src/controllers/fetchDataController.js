const stackoverflowService = require("../services/stackoverflowService");
const githubService = require("../services/githubService");

exports.fetchData = async (req, res) => {
    const { dataSourceName } = req.query;

    if (!dataSourceName) {
        return res.status(400).json({ message: "Missing dataSourceName parameter" });
    }

    try {
        let data;
        if (dataSourceName.toLowerCase() === "stackoverflow") {
            data = await stackoverflowService.fetchStackOverflowData();
        } else if (dataSourceName.toLowerCase() === "github") {
            data = await githubService.fetchGitHubData();
        } else {
            return res.status(400).json({ message: "Invalid dataSourceName" });
        }

        res.json({
            message: "Data fetched successfully!",
            dataSourceName,
            resultCount: data.length,
            result: data
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};