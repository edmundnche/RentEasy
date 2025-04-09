import Link from 'next/link';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
    return (
        <Link
            href={`/listing/${listing._id}`}
            className="block w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] transform transition-transform duration-300 hover:scale-105"
        >
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-xl overflow-hidden w-full border border-[#E9EBEF] hover:border-[#204FA0]">
                {/* Image Section */}
                <div className="relative">
                    <img
                        src={
                            listing.imageUrls[0] ||
                            'https://via.placeholder.com/400x250?text=No+Image'
                        }
                        alt="Listing Cover"
                        className="h-52 sm:h-48 w-full object-cover transition-transform duration-300"
                    />
                    {listing.offer && (
                        <span className="absolute top-3 left-3 bg-[#204FA0] text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md font-rubik">
                            Special Offer
                        </span>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col gap-3">
                    <h2 className="text-lg font-bold text-[#282930] truncate font-rubik">
                        {listing.name}
                    </h2>

                    <div className="flex items-center gap-2 text-[#5E5F66] text-sm font-dm-sans">
                        <MdLocationOn className="h-4 w-4 text-[#204FA0]" />
                        <span className="truncate">{listing.address}</span>
                    </div>

                    <p className="text-[#5E5F66] text-sm line-clamp-2 font-dm-sans">
                        {listing.description}
                    </p>

                    <p className="text-[#204FA0] font-bold text-lg mt-2 font-rubik">
                        ${listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' / month'}
                    </p>

                    <div className="flex justify-between text-[#282930] text-sm font-medium mt-2 font-dm-sans">
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
