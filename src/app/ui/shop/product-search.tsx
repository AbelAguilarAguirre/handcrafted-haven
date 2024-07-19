import React, { useState } from "react";

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

export default function ProductSearch({ onSearch }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex justify-center gap-4 p-4 bg-gray-50 rounded-md shadow-sm">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="px-4 py-2 rounded-lg border border-gray-300"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 rounded-lg bg-blue-500 text-white shadow-lg transition-transform transform hover:scale-105"
      >
        Search
      </button>
    </div>
  );
}
