export function calculatePercentageChange(change, price) {
  if (typeof change !== "number" || typeof price !== "number" || price === 0) {
    return "N/A";
  }

  const percentage = (change / (price - change)) * 100;
  return percentage.toFixed(2) + "%";
}

export function renderStockChart(canvas, labels, prices, symbol) {
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
}

export function createCompanyCard(profile, percentChange) {
  const isNegative = percentChange.startsWith("-");

  return `
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
          isNegative ? "negative" : "positive"
        }">(${percentChange})</p>
      </div>
      <p class="company-description">${profile.description}</p>
    </div>
  `;
}

export function createCompareCard(profile, percentChange) {
  const colorClass =
    percentChange === "N/A"
      ? ""
      : percentChange.includes("-")
      ? "red"
      : "green";

  const card = document.createElement("div");
  card.classList.add("compare-card");

  card.innerHTML = `
    <div class="top-row">
      <img src="${profile.image}" alt="${profile.symbol}" class="company-logo">
      <a href="${profile.website}" target="_blank" class="company-name">${profile.companyName}</a>
      <span class="symbol">(${profile.symbol})</span>
    </div>
    <div class="price-row">
      <h4>Stock Price:</h4>
      <span class="price">$${profile.price}</span>
      <span class="percentage ${colorClass}">(${percentChange})</span>
    </div>
    <p class="description">${profile.description}</p>
  `;

  return card;
}

export function createMarqueeItems(stocks) {
  return stocks
    .map((stock) => {
      const price = Number(stock.price).toFixed(2);
      const change = stock.changesPercentage;
      const colorClass = change.includes("-") ? "marquee-red" : "marquee-green";

      return `
        <span class="marquee-item">
          ${stock.ticker}: $${price}
          <span class="${colorClass}">${change}</span>
        </span>
      `;
    })
    .join("");
}

export function highlightMatch(text, query) {
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

export function createSymbolButton(symbol, onRemove) {
  const btn = document.createElement("button");
  btn.innerHTML = `${symbol} <span class="remove-x">×</span>`;
  btn.classList.add("symbol-btn");

  btn.querySelector(".remove-x").addEventListener("click", (e) => {
    e.stopPropagation();
    onRemove(symbol);
  });

  return btn;
}
