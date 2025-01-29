const axios = require("axios");

async function fetchGitHubData() {
    const url = "https://api.github.com/repos/highcharts/highcharts/commits";

    try {
        const response = await axios.get(url);
        return response.data.map(commit => commit.commit.message);
    } catch (error) {
        throw new Error(`Error fetching GitHub data: ${error.message}`);
    }
}

module.exports = { fetchGitHubData };