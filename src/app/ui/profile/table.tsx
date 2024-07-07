import Image from "next/image";
import Rating from "@mui/material/Rating";
import { ProfileProductCard } from "../product-cards";

export default async function ProductsTable({ products }: { products: any[] }) {
    return (
        <div className="border-2 border-slate-200 p-4 w-[212px] h-[300px] md:h-[400px]">
            <div className="md:hidden">
                {products?.map((product) => (
                    <ProfileProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
