import LoginForm from "../ui/login-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Login",
    description: "Login to your Handcrafted Haven account to start buying and selling unique, handcrafted items.",
};

export default async function LoginPage() {
    const session = await getServerSession();
    if (session) {
        redirect("/");
    }
    return (
        <div className="container pb-8 px-8 mx-auto text-center">
            <LoginForm />
        </div>
    );
}
