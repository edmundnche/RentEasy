import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <div>
    <div className='text-red-500'>Home</div>
    <Link href="/create-listing" className="text-blue-500 hover:underline">
    Go to Create Listing Page
  </Link>
  </div>
    
  )
}
