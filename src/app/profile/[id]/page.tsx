import ProductsTable from '@/app/ui/profile/table';
import { fetchProductsByUserId, fetchProductsPages, fetchProfileByUserId } from '@/app/lib/data';
import { UUID } from 'crypto';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { ProfileDetails } from '@/app/ui/profile/profile';

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Your Handcrafted Haven profile where you can start buying and selling unique, handcrafted items.",
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
        const profile = await fetchProfileByUserId(id);
        return (
            <div className="flex flex-col items-center min-h-[70vh]">
                <ProfileDetails user={profile ?? []} />
                <div>

                    <ProductsTable products={products ?? []} params={params} totalPages={totalPages}/>

                </div>
            </div>
        );
    } catch (error) {
        console.error("Database error:", error);
    }
}
