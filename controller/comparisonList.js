export class ComparisonList {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.selectedSymbols = new Set();

    this.containerElement.classList.add("comparison-bar");

    this.symbolsContainer = document.createElement("div");
    this.symbolsContainer.classList.add("symbols-container");

    this.compareBtn = document.createElement("button");
    this.compareBtn.classList.add("compare-final-btn");

    this.compareBtn.addEventListener("click", () => {
      if (this.selectedSymbols.size < 2) {
        alert("Please select at least 2 companies to compare.");
        return;
      }

      const query = [...this.selectedSymbols].join(",");
      window.location.href = `compare.html?symbols=${query}`;
    });

    this.containerElement.appendChild(this.symbolsContainer);
    this.containerElement.appendChild(this.compareBtn);
  }

  add(symbol) {
    if (this.selectedSymbols.has(symbol)) return;

    this.selectedSymbols.add(symbol);
    this.render();
  }

  remove(symbol) {
    this.selectedSymbols.delete(symbol);
    this.render();
  }

  render() {
    this.symbolsContainer.innerHTML = "";

    this.selectedSymbols.forEach((symbol) => {
      const btn = document.createElement("button");
      btn.innerHTML = `${symbol} <span class="remove-x">×</span>`;
      btn.classList.add("symbol-btn");

      btn.querySelector(".remove-x").addEventListener("click", (e) => {
        e.stopPropagation();
        this.remove(symbol);
      });

      this.symbolsContainer.appendChild(btn);
    });
    this.compareBtn.textContent = `Compare ${this.selectedSymbols.size} ${
      this.selectedSymbols.size === 1 ? "company" : "companies"
    }`;

    this.containerElement.style.display =
      this.selectedSymbols.size > 0 ? "flex" : "none";
  }
}
