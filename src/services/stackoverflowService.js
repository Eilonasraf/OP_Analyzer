const axios = require("axios");

async function fetchStackOverflowData() {
    const url = "https://api.stackexchange.com/2.2/tags/highcharts/faq?site=stackoverflow";

    try {
        const response = await axios.get(url);
        return response.data.items.map(item => item.title);
    } catch (error) {
        throw new Error(`Error fetching Stack Overflow data: ${error.message}`);
    }
}

module.exports = { fetchStackOverflowData };