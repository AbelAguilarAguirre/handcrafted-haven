import ProductsTable from '@/app/ui/profile/table';
import Pagination from '@/app/ui/profile/pagination';
import { fetchProductsByUserId } from '@/app/lib/data';
import { UUID } from 'crypto';
import AuthoriseComponent from '@/app/ui/authorise-test'; // This is just a test component for showing authorisation, delete later
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
        return (
            <div className="flex flex-col items-center min-h-[70vh]">
                {/* Delete this later, this is just an example component checking if user logged in is the owner of profile */}
                <AuthoriseComponent params={params}/>
                <div>
                    <div>
                        <ProductsTable products={products ?? []} />
                    </div>
                </div>
                <div className=" mt-7 mb-2 flex w-full justify-center">
                    <Pagination totalPages={1} />
                </div>
            </div>
        );
    } catch (error) {
        console.error("Database error:", error);
    }
}
