'use client';
import React from 'react';
import Link from 'next/link';

export default function ProductPriceFilter({ maxPrice }: { maxPrice: string }) {
    return (
        <div className="flex justify-center gap-4">
        <Link href={`/shop?maxPrice=5000`}>
            <button
            className={`px-4 py-2 rounded-lg border border-gray-300 bg-[#feffea] text-center shadow-lg transition hover:scale-110`}
            >
            $5000
            </button>
        </Link>
        <Link href={`/shop?maxPrice=10000`}>
            <button
            className={`px-4 py-2 rounded-lg border border-gray-300 bg-[#feffea] text-center shadow-lg transition hover:scale-110`}
            >
            $10000
            </button>
        </Link>
        <Link href={`/shop?maxPrice=15000`}>
            <button
            className={`px-4 py-2 rounded-lg border border-gray-300 bg-[#feffea] text-center shadow-lg transition hover:scale-110`}
            >
            $15000
            </button>
        </Link>
        <Link href={`/shop?maxPrice=20000`}>
            <button
            className={`px-4 py-2 rounded-lg border border-gray-300 bg-[#feffea] text-center shadow-lg transition hover:scale-110`}
            >
            $20000
            </button>
        </Link>
        </div>
    );
    }