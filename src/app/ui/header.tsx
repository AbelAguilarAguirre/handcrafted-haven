import React from 'react';
import Nav from './nav';

export default function Header() {
    return (
        <header className='flex justify-between p-10'>
            <h1>Handcrafted Haven</h1>
            <Nav />
        </header>
    );
};