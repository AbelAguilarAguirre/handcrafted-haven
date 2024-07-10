import Image from "next/image";
import Rating from "@mui/material/Rating";
import { ProfileProductCard } from "../product-cards";

export default async function ProductsTable({ products }: { products: any[] }) {
    return (
      <div className="grid cards:grid-cols-2 gap-8 lg:grid-cols-4">
        {products?.map((product) => (
            <ProfileProductCard key={product.product_id} product={product} />
        ))}
      </div>
    );
}
