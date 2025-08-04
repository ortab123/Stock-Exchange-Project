import {
  calculatePercentageChange,
  renderStockChart,
  createCompareCard,
} from "../utils/utils.js";
import { getCompanyProfile, getHistoricalData } from "../models/model.js";

const urlParams = new URLSearchParams(window.location.search);
const symbolsParam = urlParams.get("symbols");
const symbols = symbolsParam ? symbolsParam.split(",") : [];

if (symbols.length > 3) {
  alert("You can compare up to 3 companies only.");
}

const selectedSymbols = symbols.slice(0, 3);
const container = document.getElementById("compare-container");

for (const symbol of selectedSymbols) {
  const company = await getCompanyProfile(symbol, false);
  const histData = await getHistoricalData(symbol, false);

  if (!company || !histData) continue;

  const percentChange = calculatePercentageChange(
    company.changes,
    company.price
  );

  const card = createCompareCard({ ...company, symbol }, percentChange);

  const canvas = document.createElement("canvas");
  canvas.classList.add("stock-chart");
  card.appendChild(canvas);

  container.appendChild(card);

  const sortedData = [...histData.historical].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const labels = sortedData.map((p) => p.date);
  const prices = sortedData.map((p) => p.close);

  renderStockChart(canvas, labels, prices, symbol);
}
