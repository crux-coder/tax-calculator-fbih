"use client";

import { Card } from "@/components/ui/card";
import { TaxCalculator } from "@/components/tax-calculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bosnia Tax Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate your taxes including healthcare and solidarity fund contributions
          </p>
        </div>
        
        <Card className="p-6">
          <TaxCalculator />
        </Card>
      </div>
    </main>
  );
}