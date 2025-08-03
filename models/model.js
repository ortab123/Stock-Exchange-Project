import { API_KEY } from "../secret.js";
import { mockProfile, mockHistorical } from "./mockData.js";

export async function getCompanyProfile(symbol, useMock = false) {
  if (useMock) {
    return mockProfile[symbol];
  }

  // const res = await fetch(
  //   `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${API_KEY}`
  // );
  // const data = await res.json();
  // return data[0];
}

export async function getHistoricalData(symbol, useMock = false) {
  if (useMock) {
    return mockHistorical[symbol];
  }
  // const res = await fetch(
  //   `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${API_KEY}`
  // );
  // return await res.json();
}
