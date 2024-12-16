export interface TaxResults {
  originalAmount: number;
  amountInBAM: number;
  originalCurrency: string;
  taxableAmount: number;
  zdravstvoTotal: number;
  fondSolidarnosti: number;
  zzotk: number;
  budgetTK: number;
  totalTax: number;
  netAmount: number;
}

export interface CurrencyAmount {
  amount: number;
  currency: string;
}