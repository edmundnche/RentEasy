import React from 'react';

export default function About() {
  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#282930', padding: '20px', backgroundColor: '#FFFFFF' }}>
      <div>
        <h1 style={{ fontFamily: 'Rubik, sans-serif', color: '#204FA0', fontSize: '2.5rem', marginBottom: '20px' }}>
          About Us
        </h1>
      </div>
      <div>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          At <strong style={{ color: '#204FA0' }}>RentEasy</strong>, we’re here to make finding a home easier for newcomers.
          <br /><br />
          Moving to a new place can be challenging, especially when it comes to finding flexible, semi-permanent housing. Our platform connects you with short-term rentals that suit your needs, using tailored search tools and neighborhood insights to simplify the process.
          <br /><br />
          We also help landlords by providing an easy way to list rentals and reach an underserved market. Whether you’re a newcomer looking for a place to stay or a landlord wanting to connect with renters, we’re here to help.
          <br /><br />
          Our goal is simple: to make the rental process smoother and help newcomers feel at home in their new communities.
          <br /><br />
          Welcome to <strong style={{ color: '#204FA0' }}>RentEasy</strong> — where finding your next home is just the beginning.
        </p>
      </div>
    </div>
  );
}