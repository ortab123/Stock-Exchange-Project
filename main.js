import { SearchForm } from "./controller/searchForm.js";
import { SearchResult } from "./controller/searchResult.js";
import { mockCompanies } from "./models/mockData.js";

const form = new SearchForm(document.getElementById("form"));
const results = new SearchResult(document.getElementById("results"));
const loadingElement = document.getElementById("loading");

form.onSearch((query) => {
  loadingElement.style.display = "block";

  setTimeout(() => {
    const filtered = mockCompanies.filter(
      (company) =>
        company.name.toLowerCase().startsWith(query.toLowerCase()) ||
        company.symbol.toLowerCase().startsWith(query.toLowerCase())
    );

    results.renderResults(filtered);
    loadingElement.style.display = "none";
  }, 500);
});
