import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const current_year = new Date().getFullYear();
    return (
        <div id="section_footer" className="bg-white">
            <div className='grid grid-cols-5 py-4 justify-items-center'>
                <div className='flex justify-center'>
                    <Link 
                    href="/about" 
                    target="_blank"
                    className='btn btn-link text-gray-600 hover:font-bold hover:text-gray-800'>
                        About
                    </Link>
                </div>
                <span className="text-gray-400"> | </span>
                <div className='flex justify-center'>
                    <Link 
                    href="/testimonial" 
                    target="_blank"
                    className='btn btn-link text-gray-600 hover:font-bold hover:text-gray-800'
                    >
                        Testimonials
                    </Link>
                </div>
                <span className="text-gray-400"> | </span>
                <div className='flex justify-center'>
                    <Link 
                    href="mailto:Julie<jlcrowther@byui.edu>"
                    className='btn btn-link text-gray-600 hover:font-bold hover:text-gray-800'
                    >
                        Contact
                    </Link>
                </div>
            </div>
            <div className='grid grid-cols-3 py-2 mb-4 justify-items-center'>
                <p className="text-gray-600 text-center">1234 Happy Street, Rexburg, ID 83460, USA</p>
                <span className="text-gray-400"> | </span>
                <p className="text-gray-600 text-center">{`© ${current_year} Handcrafted Haven / Group 6`}</p>
            </div>
        </div>
    );
}

