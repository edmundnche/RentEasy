import Link from 'next/link';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
    return (
        <Link href={`/listing/${listing._id}`} className="block transform transition-transform duration-300 hover:scale-105">
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-xl overflow-hidden w-full sm:w-[300px] border border-[#E9EBEF] hover:border-[#204FA0]">

                {/* Image Section */}
                <div className="relative">
                    <img
                        src={
                            listing.imageUrls[0] ||
                            'https://via.placeholder.com/400x250?text=No+Image'
                        }
                        alt='Listing Cover'
                        className='h-[220px] sm:h-[200px] w-full object-cover transition-transform duration-300'
                    />
                    {listing.offer && (
                        <span className="absolute top-3 left-3 bg-[#204FA0] text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md font-rubik">
                            Special Offer
                        </span>
                    )}
                </div>

                {/* Content Section */}
                <div className='p-4 flex flex-col gap-3'>

                    {/* Title */}
                    <h2 className='text-lg font-bold text-[#282930] truncate font-rubik'>
                        {listing.name}
                    </h2>

                    {/* Address */}
                    <div className='flex items-center gap-2 text-[#5E5F66] text-sm font-dm-sans'>
                        <MdLocationOn className='h-4 w-4 text-[#204FA0]' />
                        <span className='truncate'>{listing.address}</span>
                    </div>

                    {/* Description */}
                    <p className='text-[#5E5F66] text-sm line-clamp-2 font-dm-sans'>
                        {listing.description}
                    </p>

                    {/* Price */}
                    <p className='text-[#204FA0] font-bold text-lg mt-2 font-rubik'>
                        ${listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' / month'}
                    </p>

                    {/* Beds & Baths */}
                    <div className='flex justify-between text-[#282930] text-sm font-medium mt-2 font-dm-sans'>
                        <span className="bg-[#E1ECFF] px-2 py-1 rounded-md">
                            {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
                        </span>
                        <span className="bg-[#E1ECFF] px-2 py-1 rounded-md">
                            {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
