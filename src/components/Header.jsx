'use client';

import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Header() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(searchParams);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [searchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(searchParams);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        router.push(`/search?${searchQuery}`);
    };

    return (
        <header className='bg-white shadow-md sticky top-0 z-50'>
            <div className='flex justify-between items-center max-w-7xl mx-auto p-4'>

                {/* Logo */}
                <Link href='/'>
                    <h1 className='text-2xl font-extrabold flex items-center space-x-1'>
                        <span className='text-blue-600'>Rent</span>
                        <span className='text-gray-800'>Easy</span>
                    </h1>
                </Link>

                {/* Search Bar */}
                <form
                    className='flex items-center bg-gray-100 px-4 py-2 rounded-full shadow-sm transition-all w-40 sm:w-64 lg:w-96'
                    onSubmit={handleSubmit}
                >
                    <input
                        type='text'
                        placeholder='Search listings...'
                        className='bg-transparent focus:outline-none text-gray-700 flex-grow placeholder-gray-400'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className='text-gray-600 hover:text-gray-900'>
                        <FaSearch className='w-5 h-5' />
                    </button>
                </form>

                {/* Navigation Links */}
                <nav className='flex items-center gap-6'>
                    <Link href='/'>
                        <span className='hidden md:block text-gray-700 font-medium hover:text-blue-600 transition'>
                            Home
                        </span>
                    </Link>
                    <Link href='/about'>
                        <span className='hidden md:block text-gray-700 font-medium hover:text-blue-600 transition'>
                            About
                        </span>
                    </Link>

                    {/* User Authentication */}
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <Link href='/sign-in'>
                            <span className='text-gray-700 font-medium hover:text-blue-600 transition'>
                                Sign In
                            </span>
                        </Link>
                    </SignedOut>
                </nav>
            </div>
        </header>
    );
}
