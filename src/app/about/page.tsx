import Benefit from '../ui/benefit';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn more about Handcrafted Haven and our mission to provide quality handcrafted goods.",
};

export default function AboutPage() {
    return (
        <div className="container pb-8 px-8 mx-auto text-center">
            <Benefit />
        </div>
    );
}