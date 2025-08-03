import { CompanyInfo } from "./controller/CompanyInfo.js";

(async function () {
  const params = new URLSearchParams(location.search);
  const symbol = params.get("symbol");

  const container = document.getElementById("compInfo");
  const compInfo = new CompanyInfo(container, symbol);

  await compInfo.load();
  await compInfo.addChart();
})();
