import CartTable from "@/app/ui/cart/table";
import { getServerSession } from "next-auth";
import { getCartItemsByUserId } from "@/app/lib/data";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { UUID } from "crypto";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "View your cart and checkout with unique, handcrafted items from Handcrafted Haven.",
};

export default async function CartPage({ params }: { params: { id: UUID } }) {
  const id = params.id;
    const session = await getServerSession();
    if (!session) {
      redirect("/login");
    }
  return (
    <main>
      <CartTable id={id}/>
    </main>
  );
}