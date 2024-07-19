import ProductsTable from '@/app/ui/profile/table';
import ProfileDetails from '@/app/ui/profile/profile-details';
import { fetchProductsByUserId, fetchProductsPages, fetchUserById } from '@/app/lib/data';
import { UUID } from 'crypto';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Your Handcrafted Haven profile where you can start buying and selling unique, handcrafted items.",
};


export default async function Page({ params }: { params: { id: UUID } }) {
    const id = params.id;
    try {
        const products = await fetchProductsByUserId(id);
        const totalPages = await fetchProductsPages(id);
        const user = await fetchUserById(id);
        return (
            <div className="flex flex-col items-center min-h-[70vh]">
                <ProfileDetails user={user}/>
                <div>

                    <ProductsTable products={products ?? []} params={params} totalPages={totalPages ?? 1}/>

                </div>
            </div>
        );
    } catch (error) {
        console.error("Database error:", error);
    }
}
