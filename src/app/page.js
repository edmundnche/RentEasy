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
    <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-rubik text-3xl font-bold text-[#204FA0] text-center mb-12">
            Why Choose RentEasy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-rubik text-2xl font-bold text-[#282930] mb-4">
                Tailored Search
              </h3>
              <p className="font-dm-sans text-[#5E5F66]">
                Find housing that fits your needs with our advanced search tools.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-rubik text-2xl font-bold text-[#282930] mb-4">
                Community Insights
              </h3>
              <p className="font-dm-sans text-[#5E5F66]">
                Get to know your new neighborhood before you move in.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-rubik text-2xl font-bold text-[#282930] mb-4">
                Easy Listings
              </h3>
              <p className="font-dm-sans text-[#5E5F66]">
                Landlords can list properties in minutes and reach the right audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-[#F7F9FC] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-rubik text-3xl font-bold text-[#204FA0] text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="font-dm-sans text-[#5E5F66] mb-4">
                "RentEasy made finding a home so simple! The tailored search tools saved me so much time."
              </p>
              <p className="font-dm-sans text-[#204FA0] font-medium">
                – Sarah, Newcomer
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="font-dm-sans text-[#5E5F66] mb-4">
                "As a landlord, RentEasy helped me connect with the right tenants quickly and easily."
              </p>
              <p className="font-dm-sans text-[#204FA0] font-medium">
                – John, Landlord
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#282930] py-12 px-6 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-rubik text-xl font-bold mb-4">RentEasy</h3>
            <p className="font-dm-sans text-[#A6C7FF]">
              Your trusted partner in finding flexible housing solutions.
            </p>
          </div>
          <div>
            <h4 className="font-rubik text-lg font-bold mb-4">Quick Links</h4>
            <ul className="font-dm-sans space-y-2">
              <li><a href="#" className="hover:text-[#A6C7FF]">Home</a></li>
              <li><a href="#" className="hover:text-[#A6C7FF]">About</a></li>
              <li><a href="#" className="hover:text-[#A6C7FF]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-rubik text-lg font-bold mb-4">Contact Us</h4>
            <p className="font-dm-sans">Email: support@renteasy.com</p>
            <p className="font-dm-sans">Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      </footer>
    </div>
    

  )
}
