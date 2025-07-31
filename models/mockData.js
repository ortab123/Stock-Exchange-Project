export const mockCompanies = [
  {
    name: "Apple Inc",
    symbol: "AAPL",
  },
  {
    name: "Microsoft Corporation",
    symbol: "MSFT",
  },
  {
    name: "Tesla Inc",
    symbol: "TSLA",
  },
  {
    name: "Amazon.com Inc",
    symbol: "AMZN",
  },
  {
    name: "Alphabet Inc",
    symbol: "GOOGL",
  },
];

export const mockProfile = {
  AAPL: {
    symbol: "AAPL",
    companyName: "Apple Inc.",
    description: "Apple is a technology company...",
    website: "https://www.apple.com",
    image: "https://logo.clearbit.com/apple.com",
    price: 198.23,
    changesPercentage: "+1.65%",
  },
  MSFT: {
    symbol: "MSFT",
    companyName: "Microsoft Corporation",
    description: "Microsoft develops software...",
    website: "https://www.microsoft.com",
    image: "https://logo.clearbit.com/microsoft.com",
    price: 345.61,
    changesPercentage: "+0.85%",
  },
  GOOGL: {
    symbol: "GOOGL",
    companyName: "Alphabet Inc.",
    description: "Alphabet is the parent company of Google...",
    website: "https://www.abc.xyz",
    image: "https://logo.clearbit.com/abc.xyz",
    price: 132.12,
    changesPercentage: "-0.25%",
  },
  META: {
    symbol: "META",
    companyName: "Meta Platforms Inc.",
    description: "Meta develops social media platforms...",
    website: "https://about.meta.com",
    image: "https://logo.clearbit.com/meta.com",
    price: 289.1,
    changesPercentage: "+1.40%",
  },
  TSLA: {
    symbol: "TSLA",
    companyName: "Tesla Inc.",
    description: "Tesla makes electric vehicles...",
    website: "https://www.tesla.com",
    image: "https://logo.clearbit.com/tesla.com",
    price: 701.32,
    changesPercentage: "-2.12%",
  },
};

export const mockHistorical = {
  AAPL: {
    historical: [
      { date: "2024-07-01", close: 185.5 },
      { date: "2024-07-02", close: 186.2 },
      { date: "2024-07-03", close: 187.9 },
      { date: "2024-07-04", close: 189.3 },
      { date: "2024-07-05", close: 191.0 },
      { date: "2024-07-06", close: 193.4 },
      { date: "2024-07-07", close: 195.2 },
      { date: "2024-07-08", close: 196.9 },
      { date: "2024-07-09", close: 198.23 },
    ],
  },
};
