import { FaSearchLocation } from "react-icons/fa";
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Header() {
    return (
        <header className='bg-[#A6C7FF] shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link href='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap text-[#204FA0]'>
                        <span>Rent</span>
                        <span>Easy</span>
                    </h1>
                </Link>
                <form className='bg-[#5e5f66] p-3 rounded-lg flex items-center'>
                    <input
                        type='text'
                        placeholder='Find a Home'
                        className='bg-transparent focus:outline-none w-24 sm:w-64 text-[#282930]'
                    />
                    <button>
                        <FaSearchLocation className='text-[#204FA0]' />
                    </button>
                </form>
                <ul className='flex gap-4'>
                    <Link href='/'>
                        <li className='hidden md:inline text-[#204FA0] hover:underline'>
                            Home
                        </li>
                    </Link>
                    <Link href='/favourites'>
                        <li className='hidden md:inline text-[#204FA0] hover:underline'>
                            Favourites
                        </li>
                    </Link>
                    <Link href='/about-page'>
                        <li className='hidden md:inline text-[#204FA0] hover:underline'>
                            About
                        </li>
                    </Link>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <Link href='/sign-in'>
                            <li className='hidden md:inline text-[#204FA0] hover:underline'>
                                Sign In
                            </li>
                        </Link>
                    </SignedOut>
                </ul>
            </div>
        </header>
    );
}
