# OP Analyzer 

The OP Analyzer API is a RESTful API built with Node.js and Express.js that:
1. **Fetches data** dynamically from external sources (**Stack Overflow, GitHub**).
2. **Processes data** using **predefined analysis flows (`analysisFlowId`)**.
3. **Returns structured JSON responses** for easy integration with other applications.
4. **Allows testing** using **`api.rest`** in **VS Code** for quick API requests.

---

## **🔹 How It Works**
1. **Step 1:** Fetch raw data using `/https://api.stackexchange.com/2.2/tags/highcharts/faq?site=stackoverflow` or `https://api.github.com/repos/highcharts/highcharts/commits`.
2. **Step 2:** Analyze the fetched data using `/analyze` with `analysisFlowId`:
   - **For Stack Overflow** (`analysisFlowId = 1`) → Detect **Top Technologies**.
   - **For GitHub** (`analysisFlowId = 1`) → Detect **Most Mentioned Issues**.
3. **Step 3:** Returns a **JSON response** containing processed insights.

---

## **🔹 API Example Calls (`api.rest`)**
### **Fetch Data**
```http
### Fetch Stack Overflow Titles
GET http://localhost:3000/fetch?dataSourceName=Stackoverflow

### Fetch GitHub Commits
GET http://localhost:3000/fetch?dataSourceName=Github
```
---
### **Analyze Data**
```http
### Analyze Stack Overflow Data (Detect Top Technologies)
POST http://localhost:3000/analyze
Content-Type: application/json

{
    "dataSourceName": "Stackoverflow",
    "analysisFlowId": 1,
    "data": [
        "Why are Bootstrap tabs displaying tab-pane divs with incorrect widths?",
        "Set Data to highcharts series",
        "Vue issue"
    ]
}
```
```http
### Analyze GitHub Data (Detect Most Mentioned Issues)
POST http://localhost:3000/analyze
Content-Type: application/json

{
    "dataSourceName": "Github",
    "analysisFlowId": 1,
    "data": [
        "Merge pull request #22550 from highcharts/docs/version-12",
        "Fixed issue #21375, error when adding new chart component.",
        "Resolved bug in feature #22450"
    ]
}
```

---

## **🔹 Expected API Responses**
### **Stack Overflow Analysis (`detectTopTechnologies`)**
```json
{
    "message": "Analysis completed!",
    "dataSourceName": "Stackoverflow",
    "analysisFlowId": 1,
    "result": [
        "highcharts: 1",
        "bootstrap: 1"
    ]
}
```
---
### **GitHub Analysis (`detectMentionedIssues`)**
```json
{
    "message": "Analysis completed!",
    "dataSourceName": "Github",
    "analysisFlowId": 1,
    "result": [
        "#22550: 1",
        "#21375: 1",
        "#22450: 1"
    ]
}
```

---

## **🔹 Conclusion**
🚀 **The OP Analyzer API** effectively extracts **insights** from Stack Overflow & GitHub using **predefined analysis flows**.  
🔥 **It is structured, flexible, and easy to extend with more features in the future!**  

---

