import ProductsTable from '@/app/ui/profile/table';
import ProfileDetails from '@/app/ui/profile/profile-details';
import { fetchProductsByUserId, fetchProductsPages, fetchUserById, getUserId } from '@/app/lib/data';
import { UUID } from 'crypto';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Your Handcrafted Haven profile where you can start buying and selling unique, handcrafted items.",
};


export default async function Page({ params }: { params: { id: UUID } }) {
    const session = await getServerSession();
    let userId: UUID | undefined;
    if (session) {
      userId = await getUserId(session?.user?.email ?? "");
    }
    const id = params.id;
    try {
        const products = await fetchProductsByUserId(id);
        const totalPages = await fetchProductsPages(id);
        const user = await fetchUserById(id);
        return (
            <div className="flex flex-col items-center min-h-[70vh]">
                <ProfileDetails user={user} userId={userId}/>
                <div>

                    <ProductsTable products={products ?? []} params={params} totalPages={totalPages ?? 1} userId={userId}/>

                </div>
            </div>
        );
    } catch (error) {
        console.error("Database error:", error);
    }
}
