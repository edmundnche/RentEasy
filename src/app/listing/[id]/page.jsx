import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
} from 'react-icons/fa';

export default async function Listing({ params }) {
    let listing = null;

    try {
        const result = await fetch(process.env.URL + '/api/listing/get', {
            method: 'POST',
            body: JSON.stringify({ listingId: params.id }),
            cache: 'no-store',
        });
        const data = await result.json();
        listing = data[0];
    } catch (error) {
        listing = { title: 'Failed to load listing' };
    }

    if (!listing || listing.name === 'Failed to load listing') {
        return (
            <main className='flex flex-col items-center justify-center h-screen p-6'>
                <h2 className='text-xl text-gray-700 font-semibold text-center'>
                    Listing not found
                </h2>
            </main>
        );
    }

    return (
        <main className="max-w-5xl mx-auto p-6">
            {/* Listing Image */}
            <div className="relative">
                <img
                    src={listing.imageUrls[0] || 'https://via.placeholder.com/800x500?text=No+Image'}
                    alt={listing.name}
                    className='w-full h-[400px] object-cover rounded-lg shadow-lg'
                />
            </div>

            {/* Listing Details */}
            <div className='mt-8 flex flex-col gap-6'>
                <h1 className='text-3xl font-bold text-gray-800'>
                    {listing.name} -
                    <span className='text-blue-700 ml-2'>
                        ${listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' / month'}
                    </span>
                </h1>

                {/* Address */}
                <div className='flex items-center text-gray-600 text-lg'>
                    <FaMapMarkerAlt className='text-red-600 mr-2' />
                    {listing.address}
                </div>

                {/* Property Status */}
                <div className="flex flex-wrap gap-4">
                    <span className='bg-red-700 text-white text-sm font-medium px-3 py-1 rounded-lg'>
                        {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </span>
                    {listing.offer && (
                        <span className='bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-lg'>
                            ${(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US')} OFF
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className='text-gray-700 text-lg leading-relaxed'>
                    <span className='font-semibold text-gray-900'>Description: </span>
                    {listing.description}
                </p>

                {/* Property Features */}
                <ul className='grid grid-cols-2 sm:grid-cols-4 gap-6 text-gray-800 text-md font-medium'>
                    <li className='flex items-center gap-2'>
                        <FaBed className='text-blue-700' />
                        {listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}
                    </li>
                    <li className='flex items-center gap-2'>
                        <FaBath className='text-blue-700' />
                        {listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}
                    </li>
                    <li className='flex items-center gap-2'>
                        <FaParking className='text-blue-700' />
                        {listing.parking ? 'Parking Available' : 'No Parking'}
                    </li>
                    <li className='flex items-center gap-2'>
                        <FaChair className='text-blue-700' />
                        {listing.furnished ? 'Furnished' : 'Unfurnished'}
                    </li>
                </ul>
            </div>
        </main>
    );
}
