import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#204FA0] to-[#A6C7FF]">
    

     
    <section className="py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-rubik text-5xl font-bold text-white mb-6">
          Find Your Perfect Home, Effortlessly
        </h1>
        <p className="font-dm-sans text-xl text-white mb-8">
          RentEasy connects newcomers with flexible, semi-permanent housing and helps landlords reach an underserved market.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-[#204FA0] font-dm-sans font-medium px-8 py-3 rounded-full hover:bg-opacity-90 transition">
            Get Started
          </button>
          <button className="bg-transparent border-2 border-white text-white font-dm-sans font-medium px-8 py-3 rounded-full hover:bg-white hover:text-[#204FA0] transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
    </div>

  )
}
