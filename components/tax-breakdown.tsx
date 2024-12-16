import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TaxResults } from "@/lib/types";

interface TaxBreakdownProps {
  results: TaxResults;
}

export function TaxBreakdown({ results }: TaxBreakdownProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Tax Breakdown</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount (BAM)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Original Amount ({results.originalCurrency})</TableCell>
            <TableCell className="text-right">{results.originalAmount.toFixed(2)}</TableCell>
          </TableRow>
          {results.originalCurrency !== "BAM" && (
            <TableRow>
              <TableCell>Amount in BAM</TableCell>
              <TableCell className="text-right">{results.amountInBAM.toFixed(2)}</TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell>Taxable Amount (80%)</TableCell>
            <TableCell className="text-right">{results.taxableAmount.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Healthcare (Zdravstvo) Total</TableCell>
            <TableCell className="text-right">{results.zdravstvoTotal.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Solidarity Fund (10.2%)</TableCell>
            <TableCell className="text-right">{results.fondSolidarnosti.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ZZOTK (89.8%)</TableCell>
            <TableCell className="text-right">{results.zzotk.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Budget TK (10%)</TableCell>
            <TableCell className="text-right">{results.budgetTK.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="font-semibold">
            <TableCell>Total Tax</TableCell>
            <TableCell className="text-right">{results.totalTax.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="font-bold">
            <TableCell>Net Amount</TableCell>
            <TableCell className="text-right">{results.netAmount.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}