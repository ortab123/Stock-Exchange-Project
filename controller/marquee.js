import { API_KEY } from "../secret.js";

const marqueeContent = document.getElementById("marquee-content");

async function loadMarquee() {
  try {
    const res = await fetch(
      `https://financialmodelingprep.com/api/v3/actives?apikey=${API_KEY}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Marquee data:", data);
    const topStocks = data.slice(0, 30);

    marqueeContent.innerHTML = topStocks
      .map((stock) => {
        const colorClass = stock.changesPercentage.includes("-")
          ? "marquee-red"
          : "marquee-green";

        const price = Number(stock.price).toFixed(2);
        const change = stock.changesPercentage;

        return `<span class="marquee-item">
          ${stock.ticker}: $${price} 
          <span class="${colorClass}">${change}</span>
        </span>`;
      })
      .join("");
  } catch (err) {
    console.error("Failed to load marquee data:", err);
    marqueeContent.textContent = "Failed to load stock data.";
  }
}

loadMarquee();
