import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#204FA0] to-[#A6C7FF] p-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#204FA0] to-[#A6C7FF] p-8 text-center">
          <h1 className="font-rubik text-4xl font-bold text-white">
            About Us
          </h1>
        </div>

        {/* Content */}
        <div className="font-dm-sans text-[#282930] p-8 space-y-6">
          <p className="text-lg leading-relaxed">
            At <strong className="text-[#204FA0] font-medium">RentEasy</strong>, we’re here to make finding a home easier for newcomers.
          </p>
          <p className="text-lg leading-relaxed">
            Moving to a new place can be challenging, especially when it comes to finding flexible, semi-permanent housing. Our platform connects you with short-term rentals that suit your needs, using tailored search tools and neighborhood insights to simplify the process.
          </p>
          <p className="text-lg leading-relaxed">
            We also help landlords by providing an easy way to list rentals and reach an underserved market. Whether you’re a newcomer looking for a place to stay or a landlord wanting to connect with renters, we’re here to help.
          </p>
          <p className="text-lg leading-relaxed">
            Our goal is simple: to make the rental process smoother and help newcomers feel at home in their new communities.
          </p>
          <p className="text-lg leading-relaxed">
            Welcome to <strong className="text-[#204FA0] font-medium">RentEasy</strong> — where finding your next home is just the beginning.
          </p>
        </div>
      </div>
    </div>
  );
}