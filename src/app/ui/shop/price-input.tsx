import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const priceRangeList = [
  { name: "$0.01 to $9.99", value: "0.01-9.99" },
  { name: "$10 to $49.99", value: "10-49.99" },
  { name: "$50 to $99.99", value: "50-99.99" },
  { name: "$100 to $249.99", value: "100-249.99" },
  { name: "$250 to $499.99", value: "250-499.99" },
  { name: "$500 to $999.99", value: "500-999.99" },
  { name: "$1000 to $1999.99", value: "1000-1999.99" },
  { name: "$2000 & above", value: "2000-" },
]

export default function PriceInput() {
  const [priceRange, setPriceRange] = useState('');

  return (
    <div>
      <FormControl className='w-full md:min-w-[80px]'>
        <InputLabel id="price-select">Price</InputLabel>
        <Select
          labelId="price-select"
          id="price"
          name='price'
          value={(priceRange === '') ? '' : priceRange}
          autoWidth
          label='Price'
          onChange={(ev: SelectChangeEvent) => setPriceRange(ev.target.value)}
          className='rounded-none'
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {priceRangeList.map((range) => (
            <MenuItem key={range.value} value={range.value}>
              {range.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}