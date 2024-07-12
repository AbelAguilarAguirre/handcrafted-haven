import Benefit from '../ui/benefit';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Register",
    description: "Register for an account at Handcrafted Haven to start buying and selling unique, handcrafted items.",
};

export default function RegisterPage() {
    return (
        <div className="container pb-8 px-8 mx-auto text-center">
            <Benefit />
        </div>
    );
}