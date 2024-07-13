import { ProductDetails } from "../../ui/product/product";
import { UUID } from 'crypto';
import { fetchProductByProductId } from "../../lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details",
  description:
    "View the details of a product from Handcrafted Haven.",
};


export default async function Page({ params }: { params: { id: UUID } }) {
  const id = params.id;
  const product = await fetchProductByProductId(id);
  return (
      <ProductDetails product={product} />
    );
}