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
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col gap-6 p-12 px-6 max-w-7xl mx-auto">
        <div className="text-center lg:text-left space-y-6">
          <h1 className="text-gray-900 font-bold text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tight">
            Find your next <span className="text-blue-600">perfect</span> <br />
            place with ease
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto lg:mx-0">
            RentEasy is the best place to find your next perfect place to live.
            <br className="hidden sm:block" />
            We have a wide range of properties for you to choose from.
          </p>
          <div className="pt-2">
            <Link
              href="/search"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              Let&apos;s get started
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-6">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/renteasy-773f4.firebasestorage.app/o/happy-family-with-dog-moving-new-home.jpg?alt=media&token=c5b47e46-6ce6-4981-bcc9-30d8aa0ccefd"
          className="w-full h-[500px] object-cover rounded-xl shadow-lg"
          alt="Modern apartment building"
        />
      </div>

      {/* Listings Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-2xl font-bold text-gray-800">Recent Offers</h2>
              <Link
                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
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
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-2xl font-bold text-gray-800">Recent Places for Rent</h2>
              <Link
                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
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
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-2xl font-bold text-gray-800">Recent Places for Sale</h2>
              <Link
                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
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
