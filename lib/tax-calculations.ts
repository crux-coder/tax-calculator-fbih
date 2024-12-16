import type { TaxResults, CurrencyAmount } from "./types";

interface TaxCalculationInput extends CurrencyAmount {
  amountInBAM: number;
}

export function calculateTaxes({
  amount,
  amountInBAM,
  currency,
}: TaxCalculationInput): TaxResults {
  // Calculate taxable amount (80% of total)
  const taxableAmount = amountInBAM * 0.8;

  // Calculate 4% zdravstvo
  const zdravstvoTotal = taxableAmount * 0.04;

  // Split zdravstvo into FOND SOLIDARNOSTI (10.2%) and ZZOTK (89.8%)
  const fondSolidarnosti = zdravstvoTotal * 0.102;
  const zzotk = zdravstvoTotal * 0.898;

  // Calculate remaining amount after zdravstvo
  const afterZdravstvo = taxableAmount - zdravstvoTotal;

  // Calculate 10% for BUDZET TK
  const budgetTK = afterZdravstvo * 0.1;

  // Calculate total tax
  const totalTax = zdravstvoTotal + budgetTK;

  // Calculate net amount
  const netAmount = amountInBAM - totalTax;

  return {
    originalAmount: amount,
    amountInBAM,
    originalCurrency: currency,
    taxableAmount,
    zdravstvoTotal,
    fondSolidarnosti,
    zzotk,
    budgetTK,
    totalTax,
    netAmount,
  };
}