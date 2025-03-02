import Link from 'next/link';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
    return (
        <Link href={`/listing/${listing._id}`} className="block transform transition-transform duration-300 hover:scale-105">
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-xl overflow-hidden w-full sm:w-[370px] border border-gray-200">

                {/* Image Section */}
                <div className="relative">
                    <img
                        src={
                            listing.imageUrls[0] ||
                            'https://via.placeholder.com/400x250?text=No+Image'
                        }
                        alt='Listing Cover'
                        className='h-[250px] sm:h-[230px] w-full object-cover transition-transform duration-300'
                    />
                    {listing.offer && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
                            Special Offer
                        </span>
                    )}
                </div>

                {/* Content Section */}
                <div className='p-4 flex flex-col gap-3'>

                    {/* Title */}
                    <h2 className='text-lg font-bold text-gray-800 truncate'>
                        {listing.name}
                    </h2>

                    {/* Address */}
                    <div className='flex items-center gap-2 text-gray-600 text-sm'>
                        <MdLocationOn className='h-4 w-4 text-green-600' />
                        <span className='truncate'>{listing.address}</span>
                    </div>

                    {/* Description */}
                    <p className='text-gray-500 text-sm line-clamp-2'>
                        {listing.description}
                    </p>

                    {/* Price */}
                    <p className='text-blue-700 font-bold text-lg mt-2'>
                        ${listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' / month'}
                    </p>

                    {/* Beds & Baths */}
                    <div className='flex justify-between text-gray-700 text-sm font-medium mt-2'>
                        <span className="bg-gray-100 px-2 py-1 rounded-md">
                            {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded-md">
                            {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
