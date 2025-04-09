'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/image/logo.png';

export default function Header() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(searchParams);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
    }, [searchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(searchParams);
        urlParams.set('searchTerm', searchTerm);
        router.push(`/search?${urlParams.toString()}`);
    };

    return (
        <header className='bg-white shadow-sm sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto p-4 flex justify-between items-center'>
                {/* Logo */}
                <Link href="/">
                    <Image src={logo} alt="RentEasy Logo" width={160} height={60} className='object-contain' priority />
                </Link>

                {/* Desktop Search */}
                <form
                    onSubmit={handleSubmit}
                    className='hidden sm:flex items-center bg-[#E1ECFF] px-4 py-2 rounded-full shadow-sm border border-[#A6C7FF] w-40 sm:w-64 lg:w-96'
                >
                    <input
                        type='text'
                        placeholder='Search listings...'
                        className='bg-transparent focus:outline-none text-[#282930] flex-grow placeholder-[#5E5F66] text-sm'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className='text-[#5E5F66] hover:text-[#204FA0]'>
                        <FaSearch className='w-5 h-5' />
                    </button>
                </form>

                {/* Mobile Menu Toggle */}
                <button className='sm:hidden text-[#204FA0]' onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Desktop Nav */}
                <nav className='hidden sm:flex items-center gap-6'>
                    <Link href='/'><span className='text-[#282930] hover:text-[#204FA0]'>Home</span></Link>
                    <Link href='/about'><span className='text-[#282930] hover:text-[#204FA0]'>About</span></Link>
                    <SignedIn>
                        {user?.imageUrl && (
                            <Link href='/profile'>
                                <img src={user.imageUrl} alt='Profile' className='h-8 w-8 rounded-full border-2 border-[#A6C7FF]' />
                            </Link>
                        )}
                    </SignedIn>
                    <SignedOut>
                        <Link href='/sign-in'>
                            <span className='text-[#204FA0] bg-[#E1ECFF] px-4 py-2 rounded-full'>Sign In</span>
                        </Link>
                    </SignedOut>
                </nav>
            </div>

            {menuOpen && (
                <div className='sm:hidden px-4 pb-4 flex flex-col gap-4 bg-white border-t border-gray-200'>
                    <form onSubmit={handleSubmit} className='flex items-center bg-[#E1ECFF] px-4 py-2 rounded-full border border-[#A6C7FF]'>
                        <input
                            type='text'
                            placeholder='Search listings...'
                            className='bg-transparent focus:outline-none flex-grow placeholder-[#5E5F66] text-sm text-[#282930]'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className='text-[#5E5F66] hover:text-[#204FA0]'>
                            <FaSearch className='w-5 h-5' />
                        </button>
                    </form>
                    <Link href='/' onClick={() => setMenuOpen(false)}>
                        <span className='text-[#282930] font-rubik hover:text-[#204FA0] transition'>Home</span>
                    </Link>
                    <Link href='/about' onClick={() => setMenuOpen(false)}>
                        <span className='text-[#282930] font-rubik hover:text-[#204FA0] transition'>About</span>
                    </Link>
                    <SignedIn>
                        <Link href='/profile' onClick={() => setMenuOpen(false)}>
                            <span className='text-[#282930] font-rubik hover:text-[#204FA0] transition'>Profile</span>
                        </Link>
                    </SignedIn>
                    <SignedOut>
                        <Link href='/sign-in' onClick={() => setMenuOpen(false)}>
                            <span className='text-[#204FA0] font-rubik hover:text-[#A6C7FF] transition bg-[#E1ECFF] px-4 py-2 rounded-full w-fit'>Sign In</span>
                        </Link>
                    </SignedOut>
                </div>
            )}
        </header>
    );
}
