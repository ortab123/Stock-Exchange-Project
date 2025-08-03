import { API_KEY } from "../secret.js";

export class Marquee {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.containerElement.classList.add("marquee-container");

    this.contentElement = document.createElement("div");
    this.contentElement.id = "marquee-content";
    this.contentElement.classList.add("marquee-content");

    this.containerElement.appendChild(this.contentElement);
  }

  async loadAndRender() {
    try {
      // const res = await fetch(
      //   `https://financialmodelingprep.com/api/v3/actives?apikey=${API_KEY}`
      // );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      const topStocks = data.slice(0, 30);

      this.contentElement.innerHTML = topStocks
        .map((stock) => {
          const price = Number(stock.price).toFixed(2);
          const change = stock.changesPercentage;
          const colorClass = change.includes("-")
            ? "marquee-red"
            : "marquee-green";

          return `
            <span class="marquee-item">
              ${stock.ticker}: $${price}
              <span class="${colorClass}">${change}</span>
            </span>
          `;
        })
        .join("");
    } catch (err) {
      console.error("Failed to load marquee data:", err);
      this.contentElement.textContent = "Failed to load stock data.";
    }
  }
}
