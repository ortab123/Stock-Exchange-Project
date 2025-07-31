import { SearchForm } from "./controller/searchForm.js";
import { SearchResult } from "./controller/searchResult.js";
import { Marquee } from "./controller/marquee.js";
import { mockCompanies } from "./models/mockData.js";
// import { API_KEY } from "./secret.js";

const form = new SearchForm(document.getElementById("form"));
const results = new SearchResult(document.getElementById("results"));
const loadingElement = document.getElementById("loading");

const marquee = new Marquee(document.getElementById("marquee"));
marquee.loadAndRender();

form.onSearch((companies) => {
  loadingElement.style.display = "block";
  results.renderResults(companies);
  loadingElement.style.display = "none";
});

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
