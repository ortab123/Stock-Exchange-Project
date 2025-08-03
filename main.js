import { SearchForm } from "./controller/searchForm.js";
import { SearchResult } from "./controller/searchResult.js";
import { Marquee } from "./controller/marquee.js";
import { ComparisonList } from "./controller/comparisonList.js";

import { mockCompanies } from "./models/mockData.js";
// import { API_KEY } from "./secret.js";

const comparisonList = new ComparisonList(
  document.getElementById("comparison-bar")
);

const comparedStocks = new Set();

function handleCompare(company, buttonElement) {
  if (comparedStocks.has(company.symbol)) {
    comparedStocks.delete(company.symbol);
    buttonElement.classList.remove("active");
    console.log("Removed from comparison:", company);
  } else {
    comparedStocks.add(company.symbol);
    buttonElement.classList.add("active");
    comparisonList.add(company.symbol);
    console.log("Added to comparison:", company);
  }

  console.log("Current compared stocks:", [...comparedStocks]);
}

(async function () {
  const marquee = new Marquee(document.getElementById("marquee"));
  await marquee.loadAndRender();

  const form = new SearchForm(document.getElementById("form"));
  const results = new SearchResult(document.getElementById("results"));

  form.onSearch((companies, query) => {
    results.renderResults(companies, query, handleCompare);
  });
})();

// form.onSearch(async (query) => {
//   try {
//     loadingElement.style.display = "block";

//     const response = await fetch(
//       `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${API_KEY}`
//     );

//     if (!response.ok) throw new Error("API error");

//     const data = await response.json();
//     results.renderResults(data);
//   } catch (err) {
//     results.renderResults([]);
//     console.error("Search error:", err);
//   } finally {
//     loadingElement.style.display = "none";
//   }
// });
