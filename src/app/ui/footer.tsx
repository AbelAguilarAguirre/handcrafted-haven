import React, { Component } from 'react';
import Link from 'next/link';

export default function Footer() {
    const current_year = new Date().getFullYear();
    return (
        <div id="section_footer">
            <div className='bg-gray-300  flex justify-evenly space-x-8'>
                <Link href="/about" target="_blank" className='btn btn-link hover:font-bold hover:text-gray-400'>
                About
                </Link>
                <span> | </span>
                <Link href="/testimonial" target="_blank" className='btn btn-link hover:font-bold hover:text-gray-400'>
                Testimonials
                </Link>
                <span> | </span>
                <Link href="mailto:Julie<jlcrowther@byui.edu>" className='btn btn-link hover:font-bold hover:text-gray-400'>
                Contact
                </Link>
            </div>
            <div className='bg-gray-300 flex justify-center space-x-8 mb-4'>
                <p>1234 Happy Street, Rexburg, ID 83460, USA</p>
                <span> | </span>
                <p>{`© ${current_year} HandcraftHaven/Group 6`}</p>
            </div>
            
        </div>
    );
}

