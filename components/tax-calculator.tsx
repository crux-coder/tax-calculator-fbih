"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaxBreakdown } from "@/components/tax-breakdown";
import { CurrencySelector } from "@/components/currency-selector";
import { calculateTaxes } from "@/lib/tax-calculations";
import { convertCurrency } from "@/lib/currency";
import type { TaxResults } from "@/lib/types";

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Please enter a valid amount"
  ),
});

export function TaxCalculator() {
  const [loading, setLoading] = useState(false);
  const [taxResults, setTaxResults] = useState<TaxResults | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const amount = Number(values.amount);
      const amountInBAM = selectedCurrency === "USD" 
        ? await convertCurrency({ amount, currency: "USD" })
        : amount;
      
      const calculations = calculateTaxes({
        amount,
        amountInBAM,
        currency: selectedCurrency,
      });
      
      setTaxResults(calculations);
    } catch (error) {
      console.error("Error calculating taxes:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormLabel>Select Currency</FormLabel>
            <CurrencySelector
              value={selectedCurrency}
              onValueChange={setSelectedCurrency}
            />
          </div>

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount ({selectedCurrency})</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={`Enter amount in ${selectedCurrency}`} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Calculate Taxes
          </Button>
        </form>
      </Form>

      {taxResults && <TaxBreakdown results={taxResults} />}
    </div>
  );
}