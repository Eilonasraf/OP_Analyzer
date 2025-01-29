## **OP Analyzer - Documentation**

The OP Analyzer API is a RESTful API built with Node.js and Express.js that:
1. Fetches data dynamically from external sources (Stack Overflow, GitHub).
2. Processes data using predefined analysis flows (`analysisFlowId`).
3. Returns structured JSON responses for easy integration with other applications.
4. Allows testing using **`api.rest`** in VS Code for quick API requests.

---

## **🔹 How It Works**
1. **Step 1 - Basic API Implementation:** Fetch raw data using `https://api.stackexchange.com/2.2/tags/highcharts/faq?site=stackoverflow` or `https://api.github.com/repos/highcharts/highcharts/commits`.
   - Example request:
     ```http
     GET http://localhost:3000/fetch?dataSourceName=Stackoverflow
     ```
   - Example response:
     ```json
     {
         "message": "Data fetched successfully!",
         "dataSourceName": "Stackoverflow",
         "resultCount": 30,
         "result": [
             "Why are Bootstrap tabs displaying tab-pane divs with incorrect widths when using highcharts?",
             "Set Additional Data to highcharts series",
             "How do you change the colour of each category within a highcharts column chart?"
         ]
     }
     ```

2. **Step 2 - Enhance the API:** Analyze the fetched data using `/analyze` with `analysisFlowId`:
   - **For Stack Overflow** (`analysisFlowId = 1`) → Detect **detectTopTechnologies**.
   - **For GitHub** (`analysisFlowId = 1`) → Detect **detectMentionedIssues**.
   - Example request:
     ```http
     GET http://localhost:3000/analyze?dataSourceName=Stackoverflow&analysisFlowId=1
     ```
   - Example response:
     ```json
     {
         "message": "Analysis completed!",
         "dataSourceName": "Stackoverflow",
         "analysisFlowId": 1,
         "result": [
             "highcharts: 20",
             "javascript: 3",
             "json: 2"
         ]
     }
     ```

---

## **🔹 More API Example Calls (`api.rest`)**
### **Fetch Data**
```http
### Fetch raw Stack Overflow data
GET http://localhost:3000/fetch?dataSourceName=Stackoverflow

### Fetch raw GitHub commit messages
GET http://localhost:3000/fetch?dataSourceName=Github
```
---
### **Analyze Data**
```http
### Detect Top Technologies in Stack Overflow Titles
GET http://localhost:3000/analyze?dataSourceName=Stackoverflow&analysisFlowId=1

### Detect Mentioned Issues in GitHub Commits
GET http://localhost:3000/analyze?dataSourceName=Github&analysisFlowId=1
```

---

## **🔹 Expected API Responses**
### **Step 1 - Fetch data from Github: (`detectMentionedIssues`)**
```json
{
    "message": "Analysis completed!",
    "dataSourceName": "GitHub",
    "analysisFlowId": 1,
    "result": [
    "Merge pull request #22550 from highcharts/docs/version-12",
    "Fixed issue #21375, error when adding new chart component.",
    "Resolved bug in feature #22450",
    "Merge branch 'feature/update-ui' into main",
    "Fix security vulnerability in dependency #22030",
    "Bugfix for broken chart rendering #22450"
    ]
}
```
---
### **Step 2 - Fetch data from Github and analyzing: (`detectMentionedIssues, analysisFlowId = 1`)**
```json
{
    "message": "Analysis completed!",
    "dataSourceName": "Github",
    "analysisFlowId": 1,
    "result": [
        "#22450: 2",
        "#22550: 1",
        "#21375: 1",
        "#22030: 1",
        "#22571: 1"
    ]
}
```

---

## **🔹 Conclusion**
The OP Analyzer API effectively extracts insights from Stack Overflow & GitHub using predefined analysis flows.  
It is structured, flexible, and easy to extend with more features in the future! 

---