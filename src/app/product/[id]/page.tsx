import { ProductDetails } from "../../ui/product/product";
import { UUID } from 'crypto';
import { fetchProductByProductId, fetchUserById, getUserId } from "../../lib/data";
import { Metadata } from "next";
import {ReviewProvider} from "@/app/ui/review/ReviewContext";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Product Details",
  description:
    "View the details of a product from Handcrafted Haven.",
};


export default async function Page({ params }: { params: { id: UUID } }) {
  const session = await getServerSession();
  let userId: UUID | undefined;
  if (session) {
    userId = await getUserId(session?.user?.email ?? "");
  }
  const id = params.id;
  const product = await fetchProductByProductId(id);
  const user = await fetchUserById(product.user_id);
  return (
    <main>
      <ReviewProvider>
        <ProductDetails product={product} user={user} id={userId} />
      </ReviewProvider>
    </main>
    );
      
}