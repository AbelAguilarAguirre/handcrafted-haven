import React, { Component } from 'react';
import Link from 'next/link';

export default function Footer() {
    const current_year = new Date().getFullYear();
    return (
        <div id="section_footer">
            <div className='flex justify-center space-x-8'>
                <Link href="" target="_blank" className='btn btn-link'>
                Features
                </Link>
                <span> | </span>
                <Link href="" target="_blank" className='btn btn-link'>
                About
                </Link>
                <span> | </span>
                <Link href="" target="_blank" className='btn btn-link'>
                Testimonials
                </Link>
                <span> | </span>
                <Link href="" className='btn btn-link'>
                Contact
                </Link>
            </div>
            <div className='text-center py-4'>
                <p>1234 Happy Street, Rexburg, ID 83460, USA</p>
                <p>{`© ${current_year} HandcraftHaven/Group 6`}</p>
            </div>
        </div>
    );
}

