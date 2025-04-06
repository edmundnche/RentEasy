import ListingItem from '@/components/ListingItem';
import Link from 'next/link';
import Image from 'next/image';


export default async function Home() {
  let rentListings = null;
  let saleListings = null;
  let offerListings = null;

  const fetchListings = async (body) => {
    try {
      const result = await fetch(process.env.URL + '/api/listing/get', {
        method: 'POST',
        body: JSON.stringify(body),
        cache: 'no-store',
      });

      const data = await result.json();
      return JSON.parse(JSON.stringify(data));
    } catch (error) {
      return { title: 'Failed to load listing' };
    }
  };

  rentListings = await fetchListings({ type: 'rent', limit: 4, order: 'asc' });
  saleListings = await fetchListings({ type: 'sale', limit: 4, order: 'asc' });
  offerListings = await fetchListings({ limit: 4, order: 'asc', offer: true });

  return (
    
    <div className="bg-white min-h-screen">
 
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-[#282930] font-rubik font-bold text-4xl md:text-5xl">
              Welcome to RentEasy
            </h1>
            
            <h2 className="text-[#204FA0] font-rubik font-medium text-3xl md:text-4xl">
              Find your next PERFECT<br />
              place with ease
            </h2>
            
            <p className="text-[#5E5F66] font-dm-sans text-lg">
              RentEasy is the best place to find your next perfect place to live.<br />
              We have a wide range of properties for you to choose from.
            </p>
            
            <Link
              href="/search"
              className="inline-block bg-[#204FA0] text-white font-rubik font-medium px-8 py-3 rounded-lg hover:bg-[#153b7a] transition-colors"
            >
              Explore our Current Listings
            </Link>
          </div>

          {/* Image - Right Side */}
          <div className="max-w-7xl mx-auto px-6">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/renteasy-773f4.firebasestorage.app/o/happy-family-with-dog-moving-new-home.jpg?alt=media&token=c5b47e46-6ce6-4981-bcc9-30d8aa0ccefd"
          className="w-full h-[500px] object-cover rounded-xl shadow-lg"
          alt="Modern apartment building"
        />
      </div>
        </div>
      </div>

     

      
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#E9EBEF] pb-3">
              <h2 className="text-2xl font-rubik font-bold text-[#282930]">Recent Offers</h2>
              
              <Link
                className="text-sm font-dm-sans font-medium text-[#204FA0] hover:text-[#A6C7FF] hover:underline transition-colors"
                href={'/search?offer=true'}
              >
                Show all offers →
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {offerListings.map((listing, index) => (
                <ListingItem listing={listing} key={listing.id || `offer-${index}`} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="space-y-4">
           
            <div className="flex items-center justify-between border-b border-[#E9EBEF] pb-3">
              <h2 className="text-2xl font-rubik font-bold text-[#282930]">Recent Places for Rent</h2>
             
              <Link
                className="text-sm font-dm-sans font-medium text-[#204FA0] hover:text-[#A6C7FF] hover:underline transition-colors"
                href={'/search?type=rent'}
              >
                Show all rentals →
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {rentListings.map((listing, index) => (
                <ListingItem listing={listing} key={listing.id || `rent-${index}`} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="space-y-4">
           
            <div className="flex items-center justify-between border-b border-[#E9EBEF] pb-3">
              <h2 className="text-2xl font-rubik font-bold text-[#282930]">Recent Places for Sale</h2>
             
              <Link
                className="text-sm font-dm-sans font-medium text-[#204FA0] hover:text-[#A6C7FF] hover:underline transition-colors"
                href={'/search?type=sale'}
              >
                Show all properties →
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {saleListings.map((listing, index) => (
                <ListingItem listing={listing} key={listing.id || `sale-${index}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}