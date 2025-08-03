import { mockProfile, mockHistorical } from "../models/mockData.js";

const urlParams = new URLSearchParams(window.location.search);
const symbolsParam = urlParams.get("symbols");
const symbols = symbolsParam ? symbolsParam.split(",") : [];

if (symbols.length > 3) {
  alert("You can compare up to 3 companies only.");
}

const selectedSymbols = symbols.slice(0, 3);

const container = document.getElementById("compare-container");

selectedSymbols.forEach((symbol) => {
  const company = mockProfile[symbol];
  const histData = mockHistorical[symbol];

  if (!company || !histData) return;

  const card = document.createElement("div");
  card.classList.add("compare-card");

  card.innerHTML = `
    <div class="top-row">
      <img src="${company.image}" alt="${symbol}" class="company-logo">
<a href="${company.website}" target="_blank" class="company-name">${
    company.companyName
  }</a>      <span class="symbol">(${symbol})</span>
    </div>
    <div class="price-row">
      <h4>Stock Price:</h4>
      <span class="price">$${company.price}</span>
      <span class="percentage ${
        company.changesPercentage.includes("-") ? "red" : "green"
      }">(${company.changesPercentage})</span>
    </div>
    <p class="description">${company.description}</p>
  `;

  const canvas = document.createElement("canvas");
  canvas.classList.add("stock-chart");
  card.appendChild(canvas);

  container.appendChild(card);

  const sortedData = [...histData.historical].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const labels = sortedData.map((p) => p.date);
  const prices = sortedData.map((p) => p.close);

  new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: `${symbol} stock price`,
          data: prices,
          borderColor: "#7FCDCD",
          backgroundColor: "rgba(127, 205, 205, 0.1)",
          fill: true,
          tension: 0.3,
          pointRadius: 2,
        },
      ],
    },
  });
});
