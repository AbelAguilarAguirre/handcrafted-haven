'use client';
// This is a simple example for checking user authorisation

import { UUID } from 'crypto';
import { useSession } from 'next-auth/react';

export default function AuthoriseComponent({ params }: { params: { id: UUID } }) {
    const { data: session } = useSession();
    const id = params.id;

    // Comparing user id from client session is the same as the one in params
    // return message if so, otherwise return generic message
    
    return (
        (session?.user.id === id) ? 
        <>
            <h1 className='text-2xl'>Welcome, {session?.user.name}!</h1>
            <p className='mb-4'>This is your profile page!</p>
        </> :
        <>
            <h1 className='text-2xl'>Welcome!</h1>
            <p className='mb-4'>This is not your profile page!</p>
        </>
    );

}