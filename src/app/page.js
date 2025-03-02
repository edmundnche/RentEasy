import ListingItem from '@/components/ListingItem';
import Link from 'next/link';
export default async function Home() {
  let rentListings = null;
  try {
    const result = await fetch(process.env.URL + '/api/listing/get', {
      method: 'POST',
      body: JSON.stringify({
        type: 'rent',
        limit: 4,
        order: 'asc',
      }),
      cache: 'no-store',
    });
    const data = await result.json();
    rentListings = data;
  } catch (error) {
    rentListings = { title: 'Failed to load listing' };
  }
  let saleListings = null;
  try {
    const result = await fetch(process.env.URL + '/api/listing/get', {
      method: 'POST',
      body: JSON.stringify({
        type: 'sale',
        limit: 4,
        order: 'asc',
      }),
      cache: 'no-store',
    });
    const data = await result.json();
    saleListings = data;
  } catch (error) {
    saleListings = { title: 'Failed to load listing' };
  }
  let offerListings = null;
  try {
    const result = await fetch(process.env.URL + '/api/listing/get', {
      method: 'POST',
      body: JSON.stringify({
        limit: 4,
        order: 'asc',
        offer: true,
      }),
      cache: 'no-store',
    });
    const data = await result.json();
    offerListings = data;
  } catch (error) {
    offerListings = { title: 'Failed to load listing' };
  }
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          RentEasy is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          href={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let&apos;s get started...
        </Link>
      </div>
      <img
        src='https://firebasestorage.googleapis.com/v0/b/renteasy-773f4.firebasestorage.app/o/harper-van-mourik-0yfWDwHOB0g-unsplash.jpg?alt=media&token=af92c546-7383-4958-9acd-b2eabc27b095'
        className='w-full h-[550px] object-cover'
      />
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent Offers
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                href={'/search?offer=true'}
              >
                Show more listings
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing.id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for rent
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                href={'/search?type=rent'}
              >
                Show more places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing, index) => (
                <ListingItem listing={listing} key={listing.id || `listing-${index}`} />
              ))}

            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for sale
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                href={'/search?type=sale'}
              >
                Show more places for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}