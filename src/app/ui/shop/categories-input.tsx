import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { fetchCategories } from '@/app/lib/data';
import { Category } from '@/app/lib/definitions';

export default function CategoriesInput() {
  const [categories, setCategories] = useState<Category[] | null | undefined>(null);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchCategories()
      .then(categories => setCategories(categories));
  }, []);

  return (
    <div>
      <FormControl className='w-full md:min-w-[110px]'>
        <InputLabel id="simple-select">Category</InputLabel>
        <Select
          labelId="simple-select"
          id="category"
          name='category'
          value={category}
          autoWidth
          label='Category'
          onChange={(ev: SelectChangeEvent) => setCategory(ev.target.value)}
          className='md:rounded-l-xl md:border-r-0 rounded-none'
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories?.map((category: Category) => (
            <MenuItem key={category.name} value={category.category_id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}