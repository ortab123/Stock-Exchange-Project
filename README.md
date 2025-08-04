# 📈 StockView — Web App for Real-Time Stock Insights

StockView is a modern web application that allows users to **search**, **view**, and **compare** companies' stock data using real-time financial information.

> Built with modular JavaScript architecture and powered by the [Financial Modeling Prep API](https://site.financialmodelingprep.com/).

---

## 🗂️ Project Structure

📁 controller
├── companyInfo.js # Displays full company info
├── compare.js # Handles comparison logic
├── comparisonList.js # Manages list of compared symbols
├── marquee.js # Ticker/marquee of stock symbols
├── searchForm.js # Search input logic
└── searchResult.js # Renders search results

📁 models
├── mockData.js # Mock data for testing
└── model.js # API calls to FMP

📁 public
└── favicon.ico # Site icon

📁 styles
├── CompanyStyle.css
├── CompareStyle.css
└── IndexStyle.css # Page-specific styling

📁 utils
└── utils.js # Utility functions (e.g., % calculation)

📄 company.html # Company info page
📄 compare.html # Company comparison page
📄 index.html # Homepage with search
📄 main.js # App initialization
📄 companyMain.js # Loads company page
📄 secret.js # Your API key (not committed)
📄 .gitignore # Ignores secret.js, node_modules, etc.

---

## 🌟 Features

- 🔍 **Search Stocks** by symbol or company name.
- 📊 **View Company Info** — logo, stock price, daily change, and description.
- 📈 **Compare up to 3 Companies** — side-by-side charts and statistics.
- 📉 **Line Chart** of historical stock prices.
- 🔁 **Support for mock data** (for local development or offline use).

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/stock-view.git
cd stock-view
Add your API key
Create a file called secret.js in the root and add your FMP API key:

export const API_KEY = "your_api_key_here";
Open index.html in your browser
That's it! You can now:

Use the search to find companies

Click a result to view details (company.html)

Add companies to compare (compare.html)
```

## 🛠️ Tech Stack

HTML/CSS/JS (Vanilla)

Financial Modeling Prep API

Chart.js — for interactive stock graphs

Modular JS (ES6 Modules) — clean separation of concerns

Mocking support — for dev/testing without live API

## 🧪 Development Notes

Toggle USE_MOCK to true/false in controllers to switch between live API and mock data.

To compare companies, URL param format:
compare.html?symbols=AAPL,GOOGL,AMZN
