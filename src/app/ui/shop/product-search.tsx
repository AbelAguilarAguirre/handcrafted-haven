"use client";

import React from "react";
import CategoriesInput from "./categories-input";
import PriceInput from "./price-input";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/navigation";


export default function ProductSearch() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const category = formData.get('category');
    const query = formData.get('query');
    const minPrice = (formData.get('price') as string).split('-')[0];
    const maxPrice = (formData.get('price') as string).split('-')[1];

    router.push(`/shop?q=${(query ? query : '')}&category=${category ? category : ''}&min=${minPrice ? minPrice : ''}&max=${maxPrice? maxPrice : ''}&page=1`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-center mb-[4rem]">
      <CategoriesInput />
      <PriceInput />
      <TextField
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: 0,
            },
          },
        }}
        label="Search Products"
        name="query"
      />
      <Button type="submit" className="md:rounded-r-xl rounded-none" variant='outlined' startIcon={<SearchIcon />}>Search</Button>
    </form>
  );
}
