import { ProductDetails } from "../../ui/product/product";
import { UUID } from 'crypto';
import { fetchProductByProductId, fetchUserById } from "../../lib/data";
import { Metadata } from "next";
import {ReviewProvider} from "@/app/ui/review/ReviewContext";

export const metadata: Metadata = {
  title: "Product Details",
  description:
    "View the details of a product from Handcrafted Haven.",
};


export default async function Page({ params }: { params: { id: UUID } }) {
  
  const id = params.id;
  const product = await fetchProductByProductId(id);
  const user = await fetchUserById(product.user_id);
  return (
    <ReviewProvider>
      <ProductDetails product={product} user={user} />
    </ReviewProvider>
    );
      
}