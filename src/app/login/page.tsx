import LoginForm from "../ui/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
    description: "Login to your Handcrafted Haven account to start buying and selling unique, handcrafted items.",
};

export default function LoginPage() {
    return (
        <div className="container pb-8 px-8 mx-auto text-center">
            <LoginForm />
        </div>
    );
}
