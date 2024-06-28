import React from 'react';
import Nav from './nav';

export default function Header() {
    return (
        <header className='flex flex-wrap justify-around p-10'>
            <h1 className='mb-10'>Handcrafted Haven</h1>
            <Nav />
        </header>
    );
};