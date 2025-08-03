import { getCompanyProfile } from "../models/model.js";
import { API_KEY } from "../secret.js";

const USE_MOCK = true;

export class SearchForm {
  constructor(containerElement) {
    this.containerElement = containerElement;

    this.containerElement.innerHTML = `
      <input type="text" id="inputField" placeholder="Search your stock" />
      <button id="searchButton">Search</button>
    `;
    this.inputElement = containerElement.querySelector("#inputField");
    this.buttomElement = containerElement.querySelector("#searchButton");
  }

  onSearch(callback) {
    this.buttomElement.addEventListener("click", async () => {
      const query = this.inputElement.value.trim();
      if (!query) {
        return;
      }

      const searchResults = await this.getSearchResults(query);
      console.log("Raw search results:", searchResults);
      if (!searchResults || searchResults.length === 0) {
        console.warn("No search results from API");
        return;
      }
      const enrichedResults = [];

      for (const result of searchResults) {
        const profile = await getCompanyProfile(result.symbol, USE_MOCK);

        if (!profile) {
          console.warn(`No profile found for symbol: ${result.symbol}`);
          continue;
        }

        enrichedResults.push({
          image: profile.image || "fallback.png",
          name: result.name,
          symbol: result.symbol,
          changesPercentage: profile.changesPercentage,
        });
      }
      callback(enrichedResults, query);
    });
  }

  async getSearchResults(query) {
    if (USE_MOCK) {
      const allCompanies = [
        { symbol: "AAPL", name: "Apple Inc." },
        { symbol: "MSFT", name: "Microsoft Corporation" },
        { symbol: "GOOGL", name: "Alphabet Inc." },
        { symbol: "META", name: "Meta Platforms Inc." },
        { symbol: "AMZN", name: "Amazon.com Inc." },
        { symbol: "TSLA", name: "Tesla Inc." },
      ];

      return allCompanies.filter((company) => {
        const queryLower = query.toLowerCase();
        return (
          company.name.toLowerCase().startsWith(queryLower) ||
          company.symbol.toLowerCase().startsWith(queryLower)
        );
      });
    }

    // const res = await fetch(
    //   `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${API_KEY}`
    // );
    // return await res.json();
  }
}
