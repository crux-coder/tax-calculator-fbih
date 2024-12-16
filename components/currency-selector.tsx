"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CurrencySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function CurrencySelector({ value, onValueChange }: CurrencySelectorProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(value) => {
        if (value) onValueChange(value);
      }}
      className="justify-start"
    >
      <ToggleGroupItem value="USD" aria-label="Toggle USD">
        USD
      </ToggleGroupItem>
      <ToggleGroupItem value="BAM" aria-label="Toggle BAM">
        BAM
      </ToggleGroupItem>
    </ToggleGroup>
  );
}