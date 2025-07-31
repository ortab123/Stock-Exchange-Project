import { getCompanyProfile, getHistoricalData } from "../models/model.js";
import { API_KEY } from "../secret.js";
const USE_MOCK = true;

(async function () {
  const param = new URLSearchParams(location.search);
  const symbol = param.get("symbol");
  const container = document.getElementById("compInfo");

  if (!symbol) {
    container.textContent = "No symbol provided.";
    return;
  }

  container.textContent = "Loading company info...";

  try {
    const profile = await getCompanyProfile(symbol, USE_MOCK);
    const histData = await getHistoricalData(symbol, USE_MOCK);
    // const res = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${API_KEY}`);
    // const data = await res.json();
    // const profile = data[0];

    container.innerHTML = `
    <div class="company-container">
    
        <div class="company-header">
            <img src="${profile.image}" alt="${
      profile.companyName
    }" class="company-logo" />
            <h1 class="company-name">
                <a href="${profile.website}" target="_blank">${
      profile.companyName
    }</a>
            </h1>
        </div>

        <div class="stock-info">
        <p class="stock-price">Stock price: $${profile.price}</p>
        <p class="stock-change ${
          profile.changesPercentage.includes("-") ? "negative" : "positive"
        }">
    (${profile.changesPercentage})
        </p>
        </div>

        <p class="company-description">${profile.description}</p>
    </div>
    `;

    // const histRes = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${API_KEY}`);
    // const histData = await histRes.json();
    const sortedData = [...histData.historical].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const labels = sortedData.map((point) => point.date);
    const prices = sortedData.map((point) => point.close);
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `${symbol} stock price`,
            data: prices,
            borderColor: "#2980b9",
            backgroundColor: "rgba(52, 152, 219, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 2,
          },
        ],
      },
    });
  } catch (err) {
    container.textContent = "Failed to load company data.";
    console.error(err);
  }
})();
