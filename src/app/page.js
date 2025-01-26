import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <>
      <div className='text-red-500 text-xl font-semibold'>Home</div>
      <Link href="/create-listing" className="text-blue-500 hover:underline">
        Go to Create Listing Page
      </Link>
    </>
  );
}
