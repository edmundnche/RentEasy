'use client';

import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/image/logo.png';

export default function Header() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useUser();

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
        <header className='bg-white shadow-sm sticky top-0 z-50'>
            <div className='flex justify-between items-center max-w-7xl mx-auto p-4'>

                 {/* logo */}
            <Link 
                    href="/" 
                    
                >
                    <Image 
                        src={logo} 
                        alt="RentEasy Logo"
                        width={160}
                        height={60}
                        className='object-contain'
                        priority
                    />
                </Link>

                {/* Search Bar */}
                <form
                    className='flex items-center bg-[#E1ECFF] px-4 py-2 rounded-full shadow-sm transition-all w-40 sm:w-64 lg:w-96 border border-[#A6C7FF]'
                    onSubmit={handleSubmit}
                >
                    <input
                        type='text'
                        placeholder='Search listings...'
                        className='bg-transparent focus:outline-none text-[#282930] flex-grow placeholder-[#5E5F66] font-dm-sans text-sm'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className='text-[#5E5F66] hover:text-[#204FA0]'>
                        <FaSearch className='w-5 h-5' />
                    </button>
                </form>

                {/* Navigation Links */}
                <nav className='flex items-center gap-6'>
                    <Link href='/'>
                        <span className='hidden md:block text-[#282930] font-rubik font-medium hover:text-[#204FA0] transition'>
                            Home
                        </span>
                    </Link>
                    <Link href='/about'>
                        <span className='hidden md:block text-[#282930] font-rubik font-medium hover:text-[#204FA0] transition'>
                            About
                        </span>
                    </Link>

                    {/* Auth */}
                    <SignedIn>
                        {user?.imageUrl && (
                            <Link href='/profile'>
                                <img
                                    src={user.imageUrl}
                                    alt='Profile'
                                    className='h-8 w-8 rounded-full object-cover cursor-pointer border-2 border-[#A6C7FF]'
                                />
                            </Link>
                        )}
                    </SignedIn>
                    <SignedOut>
                        <Link href='/sign-in'>
                            <span className='text-[#204FA0] font-rubik font-medium hover:text-[#A6C7FF] transition bg-[#E1ECFF] px-4 py-2 rounded-full'>
                                Sign In
                            </span>
                        </Link>
                    </SignedOut>
                </nav>
            </div>
        </header>
    );
}
