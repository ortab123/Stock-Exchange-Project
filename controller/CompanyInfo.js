import { getCompanyProfile, getHistoricalData } from "../models/model.js";
import {
  calculatePercentageChange,
  renderStockChart,
  createCompanyCard,
} from "../utiles/utiles.js";
import { API_KEY } from "../secret.js";

const USE_MOCK = false;

export class CompanyInfo {
  constructor(containerElement, symbol) {
    this.containerElement = containerElement;
    this.symbol = symbol;
    this.profile = null;
    this.histData = null;
  }

  async load() {
    if (!this.symbol) {
      this.containerElement.textContent = "No symbol provided.";
      return;
    }

    //this.containerElement.textContent = "Loading company info...";

    try {
      this.profile = await getCompanyProfile(this.symbol, USE_MOCK);
      this.histData = await getHistoricalData(this.symbol, USE_MOCK);

      if (!this.profile) {
        throw new Error(`No profile found for symbol: ${this.symbol}`);
      }

      //console.log("Loaded profile:", this.profile);
      const rawChange = this.profile.changes;
      const currentPrice = this.profile.price;

      const percentChange = calculatePercentageChange(rawChange, currentPrice);
      this.containerElement.innerHTML = createCompanyCard(
        this.profile,
        percentChange
      );
    } catch (err) {
      this.containerElement.textContent = "Failed to load company data.";
      console.error(err);
    }
  }

  async addChart() {
    if (!this.histData?.historical) return;

    const sortedData = [...this.histData.historical].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const labels = sortedData.map((p) => p.date);
    const prices = sortedData.map((p) => p.close);

    const canvas = document.createElement("canvas");
    this.containerElement.appendChild(canvas);

    renderStockChart(canvas, labels, prices, this.symbol);
  }
}
