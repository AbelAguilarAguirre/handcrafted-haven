import RegisterForm from "../ui/register-form";
import { Metadata } from 'next';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getUserId } from "../lib/data";

export const metadata: Metadata = {
    title: "Register",
    description: "Register for an account at Handcrafted Haven to start buying and selling unique, handcrafted items.",
};

export default async function RegisterPage() {
    const session = await getServerSession();
    if (session) {
        const userId = await getUserId(session?.user?.email as string);
        if (userId) {
            redirect(`/profile/${userId}`);
        } else {
            redirect('/');
        }
    }
    
    return (
        <main>
            <div className="container pb-8 px-8 mx-auto text-center">
                <RegisterForm />
            </div>
        </main>
    );
}