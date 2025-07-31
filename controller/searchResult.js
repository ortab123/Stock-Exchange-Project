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
      li.classList.add("search-item");

      const img = document.createElement("img");
      img.src = company.image;
      img.alt = company.symbol;
      img.classList.add("company-logo");

      const link = document.createElement("a");
      link.href = `company.html?symbol=${company.symbol}`;
      link.classList.add("company-link");

      const nameSpan = document.createElement("span");
      nameSpan.classList.add("company-name");
      nameSpan.textContent = company.name;

      const symbolSpan = document.createElement("span");
      symbolSpan.classList.add("company-symbol");
      symbolSpan.textContent = ` (${company.symbol})`;

      link.appendChild(nameSpan);
      link.appendChild(symbolSpan);

      const changeSpan = document.createElement("span");
      changeSpan.classList.add("stock-change");

      if (company.changesPercentage.includes("-")) {
        changeSpan.classList.add("red");
      } else {
        changeSpan.classList.add("green");
      }

      changeSpan.textContent = `(${company.changesPercentage})`;

      li.appendChild(img);
      li.appendChild(link);
      li.appendChild(changeSpan);

      this.stockListElement.appendChild(li);
    });
  }
}
