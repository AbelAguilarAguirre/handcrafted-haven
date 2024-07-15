import Testimonial from '../ui/testimonial';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Testimonials",
    description: "Read what our customers have to say about us at Handcrafted Haven.",
};

export default function TestimonialPage() {
    return (
        <div className="container pb-8 px-8 mx-auto text-center">
            <Testimonial />
        </div>
    );
}