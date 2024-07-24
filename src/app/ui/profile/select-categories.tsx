import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import { fetchCategories, fetchCategoriesByProductId } from "@/app/lib/data";
import { Category } from "@/app/lib/definitions";
import { z } from "zod";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categorySchema = z.array(z.string()).min(1, "You must select at least one category");

export default function SelectCategories({ productId }: { productId: string }) {
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[] | null | undefined>(
    null
  );
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategories(categories);
    });
    const syntheticEvent = {
      target: { value: categoryNames },
    } as unknown as SelectChangeEvent<typeof categoryNames>;
    handleChange(syntheticEvent);
  }, []);

  useEffect(() => {
    if (productId !== "") {
      const syntheticEvent = {
        target: { value: [""] },
      } as unknown as SelectChangeEvent<typeof categoryNames>;
      handleChange(syntheticEvent);
      fetchCategoriesByProductId(productId).then((categoryNames) => {
        if (categoryNames !== undefined) {
          setCategoryNames(
            (categoryNames as Category[]).map((category) => category.name)
          );
        }
      });
    }
  }, [productId]);

  const handleChange = (event: SelectChangeEvent<typeof categoryNames>) => {
    const {
      target: { value },
    } = event;
    const newCategoryNames =
      typeof value === "string" ? value.split(",") : value;

    const result = categorySchema.safeParse(newCategoryNames);
    if (!result.success) {
      setErrors(result.error.errors[0].message);
    } else {
      setErrors(null);
    }

    setCategoryNames(newCategoryNames);
  };
  return (
    <div>
      <FormControl className="w-full my-4" error={!!errors}>
        <InputLabel id="multiple-select">Category</InputLabel>
        <Select
          labelId="multiple-select"
          id="categories"
          name="categories"
          multiple
          value={categoryNames}
          input={<OutlinedInput label="Category" />}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {categories?.map((category: Category) => (
            <MenuItem key={category.name} value={category.name}>
              <Checkbox checked={categoryNames.indexOf(category.name) > -1} />
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Select>
        {errors && <p className="text-red-500 text-sm">{errors}</p>}
      </FormControl>
    </div>
  );
}
