import Link from "next/link";
import { ProfileProductCard } from "../product-cards";
import { Product } from "@/app/lib/definitions";

export default async function ProductsTable({ products }: { products: Product[] }) {
    return (
      <div className="grid cards:grid-cols-2 gap-8 lg:grid-cols-4">
        {products?.map((product) => (
          <Link 
          key={product.product_id} 
          href={`/product/${product.product_id}`}
          >
            <ProfileProductCard key={product.product_id} product={product} />
          </Link>
        ))}
      </div>
    );
}
