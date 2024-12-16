import type { CurrencyAmount } from "./types";

export async function convertCurrency({ amount, currency }: CurrencyAmount): Promise<number> {
  if (currency === "BAM") return amount;
  
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currency}`
    );
    const data = await response.json();
    const bamRate = data.rates.BAM;
    return amount * bamRate;
  } catch (error) {
    console.error("Error converting currency:", error);
    // Fallback to approximate rate if API fails
    const approximateBAMRate = 1.84;
    return amount * approximateBAMRate;
  }
}