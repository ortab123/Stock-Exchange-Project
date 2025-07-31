import { getCompanyProfile } from "../models/model.js";

const USE_MOCK = true;

export class SearchForm {
  constructor(containerElement) {
    this.containerElement = containerElement;
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
      const enrichedResults = [];

      for (const result of searchResults) {
        const profile = await getCompanyProfile(result.symbol, USE_MOCK);
        if (profile) {
          enrichedResults.push({
            image: profile.image,
            name: result.name,
            symbol: result.symbol,
            changesPercentage: profile.changesPercentage,
          });
        }
      }
      console.log("Results ready:", enrichedResults);
      callback(enrichedResults);
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

      // מסנן לפי החיפוש
      return allCompanies.filter(
        (company) =>
          company.name.toLowerCase().includes(query.toLowerCase()) ||
          company.symbol.toLowerCase().includes(query.toLowerCase())
      );
    }

    // const res = await fetch(
    //   `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${API_KEY}`
    // );
    // return await res.json();
  }
}
