import RegisterForm from "../ui/register-form";
import { Metadata } from 'next';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
    title: "Register",
    description: "Register for an account at Handcrafted Haven to start buying and selling unique, handcrafted items.",
};

export default async function RegisterPage() {
    const session = await getServerSession();
    if (session) {
        redirect("/");
    }
    return (
        <div className="container pb-8 px-8 mx-auto text-center">
            <RegisterForm />
        </div>
    );
}