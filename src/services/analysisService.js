// Function: Apply analysis flow for Stack Overflow data
function applyStackOverflowAnalysis(data, flowId) {
    const flowSteps = {
        1: [
            { name: "Detect Top Technologies", func: detectTopTechnologies } // Identifies most mentioned technologies
        ]
    };

    if (!flowSteps[flowId]) {
        return { error: "Invalid analysisFlowId for Stack Overflow" };
    }

    let processedData = [...data]; // Create a copy of the original data

    for (let step of flowSteps[flowId]) {
        processedData = step.func(processedData); // Apply each analysis step sequentially
    }

    return processedData; // Return processed data after applying all steps
}

// Function: Apply analysis flow for GitHub data
function applyGitHubAnalysis(data, flowId) {
    const flowSteps = {
        1: [
            { name: "Detect Mentioned Issues", func: detectMentionedIssues } // Extracts most referenced GitHub issues
        ]
    };

    if (!flowSteps[flowId]) {
        return { error: "Invalid analysisFlowId for GitHub" };
    }

    let processedData = [...data]; // Create a copy of the original data

    for (let step of flowSteps[flowId]) {
        processedData = step.func(processedData); // Apply each analysis step sequentially
    }

    return processedData; // Return processed data after applying all steps
}

// Function: Detect the most frequently mentioned technologies in Stack Overflow titles
const TECH_TERMS = new Set([
    "bootstrap", "react", "angular",
    "vue", "javascript", "css", "html", "node.js",
    "highcharts", "json", "django", "c#", "pandas", "image",
]);

function detectTopTechnologies(data, k = 3) {
    let freq = {}; // Object to store frequency counts

    for (let sentence of data) {
        let words = sentence.toLowerCase().split(/\s+/); // Convert to lowercase and split into words
        for (let word of words) {
            if (TECH_TERMS.has(word)) { // Check if word is a known technology
                freq[word] = (freq[word] || 0) + 1; // Increment frequency count
            }
        }
    }

    return Object.entries(freq)
        .sort((a, b) => b[1] - a[1]) // Sort by most frequently mentioned
        .slice(0, k) // Take top K results
        .map(([word, count]) => `${word}: ${count}`); // Format output
}

// Function: Detect the most mentioned GitHub issues in commit messages
function detectMentionedIssues(data) {
    let issues = new Map(); // Use a Map to store unique issue numbers with their count

    for (let sentence of data) {
        let matches = sentence.match(/#\d+/g); // Extract issue numbers like #22550, #21375
        if (matches) {
            matches.forEach(issue => {
                issues.set(issue, (issues.get(issue) || 0) + 1); // Count occurrences of each issue number
            });
        }
    }

    return Array.from(issues.entries())
        .sort((a, b) => b[1] - a[1]) // Sort by most referenced issue numbers
        .map(([issue, count]) => `${issue}: ${count}`); // Format output
}

module.exports = { applyStackOverflowAnalysis, applyGitHubAnalysis };