export class SearchResult {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.stockListElement = containerElement.querySelector("#stockList");
  }

  renderResults(companiesArray) {
    this.stockListElement.innerHTML = "";

    if (!companiesArray || companiesArray.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No results found.";
      this.stockListElement.appendChild(li);
      return;
    }

    companiesArray.forEach((company) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `company.html?symbol=${company.symbol}`;
      link.textContent = `${company.name} (${company.symbol})`;

      li.appendChild(link);
      this.stockListElement.appendChild(li);
    });
  }
}
