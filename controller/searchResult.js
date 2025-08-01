export class SearchResult {
  constructor(containerElement) {
    this.containerElement = containerElement;

    this.stockListElement = document.createElement("ul");
    this.stockListElement.id = "stockList";
    this.containerElement.appendChild(this.stockListElement);
    this.compareCallback = null;
  }

  onCompare(callback) {
    this.compareCallback = callback;
  }

  renderResults(companiesArray, query, handleCompare) {
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
      nameSpan.innerHTML = this.highlightMatch(company.name, query);

      const symbolSpan = document.createElement("span");
      symbolSpan.classList.add("company-symbol");
      symbolSpan.innerHTML = ` (${this.highlightMatch(company.symbol, query)})`;

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

      const compareBtn = document.createElement("button");
      compareBtn.textContent = "Compare";
      compareBtn.classList.add("compare-btn");

      compareBtn.addEventListener("click", () => {
        handleCompare(company, compareBtn);
      });

      li.appendChild(img);
      li.appendChild(link);
      li.appendChild(changeSpan);
      li.appendChild(compareBtn);

      this.stockListElement.appendChild(li);
    });
  }

  highlightMatch(text, query) {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    if (lowerText.startsWith(lowerQuery)) {
      const matchLength = query.length;
      const highlightedPart = text.substring(0, matchLength);
      const rest = text.substring(matchLength);
      return `<span class="highlight">${highlightedPart}</span>${rest}`;
    }

    return text;
  }
}
