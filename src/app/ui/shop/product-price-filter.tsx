import React from "react";

const priceRanges = [
  { label: "$50", value: 50 },
  { label: "$100", value: 100 },
  { label: "$200", value: 200 },
  { label: "$500", value: 500 },
  { label: "$1000", value: 1000 },
  { label: "$5000", value: 5000 },
];

interface ProductPriceFilterProps {
  maxPrice: number;
  onPriceChange: (value: number) => void;
}

export default function ProductPriceFilter({
  maxPrice,
  onPriceChange,
}: ProductPriceFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-50 rounded-md shadow-sm">
      {priceRanges.map((range) => (
        <button
          key={range.value}
          onClick={() => onPriceChange(range.value)}
          className={`px-4 py-2 rounded-lg border border-gray-300 bg-[#feffea] text-center shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            maxPrice === range.value ? "bg-blue-200" : ""
          }`}
          aria-label={`Filter products under ${range.label}`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
