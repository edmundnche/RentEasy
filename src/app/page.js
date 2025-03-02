import ListingItem from '@/components/ListingItem';
import Link from 'next/link';

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
      return await result.json();
    } catch (error) {
      return { title: 'Failed to load listing' };
    }
  };

  rentListings = await fetchListings({ type: 'rent', limit: 4, order: 'asc' });
  saleListings = await fetchListings({ type: 'sale', limit: 4, order: 'asc' });
  offerListings = await fetchListings({ limit: 4, order: 'asc', offer: true });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col gap-6 p-12 px-6 max-w-6xl mx-auto text-center lg:text-left">
        <h1 className="text-gray-800 font-extrabold text-4xl lg:text-6xl leading-tight">
          Find your next <span className="text-blue-600">perfect</span> <br />
          place with ease
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          RentEasy is the best place to find your next perfect place to live.
          <br className="hidden sm:block" />
          We have a wide range of properties for you to choose from.
        </p>
        <Link
          href="/search"
          className="text-sm sm:text-base text-blue-700 font-bold hover:underline"
        >
          Let&apos;s get started...
        </Link>
      </div>

      {/* Hero Image */}
      <img
        src="https://firebasestorage.googleapis.com/v0/b/renteasy-773f4.firebasestorage.app/o/harper-van-mourik-0yfWDwHOB0g-unsplash.jpg?alt=media&token=af92c546-7383-4958-9acd-b2eabc27b095"
        className="w-full h-[550px] object-cover rounded-lg shadow-md"
        alt="Hero"
      />

      {/* Listings Section */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col gap-12 my-12">
        {offerListings?.length > 0 && (
          <ListingSection
            title="Recent Offers"
            listings={offerListings}
            link="/search?offer=true"
            linkText="Show more listings"
          />
        )}
        {rentListings?.length > 0 && (
          <ListingSection
            title="Recent places for rent"
            listings={rentListings}
            link="/search?type=rent"
            linkText="Show more places for rent"
          />
        )}
        {saleListings?.length > 0 && (
          <ListingSection
            title="Recent places for sale"
            listings={saleListings}
            link="/search?type=sale"
            linkText="Show more places for sale"
          />
        )}
      </div>
    </div>
  );
}

// Reusable Listing Section
const ListingSection = ({ title, listings, link, linkText }) => (
  <div>
    <div className="flex justify-between items-center border-b pb-2">
      <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
      <Link href={link} className="text-sm text-blue-700 hover:underline">
        {linkText}
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
      {listings.map((listing, index) => (
        <ListingItem
          listing={listing}
          key={listing.id || `listing-${index}`}
        />
      ))}
    </div>
  </div>
);

