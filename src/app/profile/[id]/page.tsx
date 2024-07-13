import ProductsTable from '@/app/ui/profile/table';
import { fetchProductsByUserId, fetchProductsPages } from '@/app/lib/data';
import { UUID } from 'crypto';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Product Details",
  description:
    "Login to your Handcrafted Haven account to start buying and selling unique, handcrafted items.",
};


export default async function Page({ params }: { params: { id: UUID } }) {
    const session = await getServerSession();
    if (!session) {
        redirect("/login");
    }
    const id = params.id;
    try {
        const products = await fetchProductsByUserId(id);
        const totalPages = await fetchProductsPages(id);
        return (
            <div className="flex flex-col items-center min-h-[70vh]">
                {/* Add profile bio here */}
                <div>
                    <ProductsTable products={products ?? []} params={params} totalPages={totalPages}/>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Database error:", error);
    }
}
