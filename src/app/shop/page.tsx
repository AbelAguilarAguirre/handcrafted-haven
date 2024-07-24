
import ProductList from "../ui/shop/product-list";
import ProductSearch from "../ui/shop/product-search";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Shop",
  description:
    "View our catalogue of unique, handcrafted items from Handcrafted Haven's artisans.",
};

export default function Page() {

  return (
    <main>
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-center">Artisan Shop</h1>
      </div>
      <div className="m-4">
        <ProductSearch />
        <ProductList />
      </div>
    </main>
  );
}
