'use client';
import { useEffect, useState } from 'react';
import ListingItem from '../../components/ListingItem';
import { useRouter, useSearchParams } from 'next/navigation';


export default function Search() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(searchParams);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true',
                furnished: furnishedFromUrl === 'true',
                offer: offerFromUrl === 'true',
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch('/api/listing/get', {
                method: 'POST',
                body: JSON.stringify(sidebardata),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setShowMore(data.length > 8);
            setListings(data);
            setLoading(false);
        };

        fetchListings();
    }, [searchParams]);

    const handleChange = (e) => {
        const { id, value, checked } = e.target;

        if (['all', 'rent', 'sale'].includes(id)) {
            setSidebardata({ ...sidebardata, type: id });
        } else if (id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: value });
        } else if (['parking', 'furnished', 'offer'].includes(id)) {
            setSidebardata({ ...sidebardata, [id]: checked });
        } else if (id === 'sort_order') {
            const [sort, order] = value.split('_');
            setSidebardata({ ...sidebardata, sort, order });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        Object.entries(sidebardata).forEach(([key, val]) =>
            urlParams.set(key, val)
        );
        router.push(`/search?${urlParams.toString()}`);
    };

    const onShowMoreClick = async () => {
        const startIndex = listings.length;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
        const data = await res.json();
        setShowMore(data.length >= 9);
        setListings([...listings, ...data]);
    };

    return (
        <div className='flex flex-col md:flex-row'>
            <aside className='p-6 md:w-80 bg-gray-50 border-r border-gray-200 min-h-screen'>
                <form onSubmit={handleSubmit} className='space-y-6'>

                    <div>
                        <label htmlFor='searchTerm' className='block text-sm font-semibold text-gray-800 mb-1'>
                            Search Term
                        </label>
                        <input
                            type='text'
                            id='searchTerm'
                            placeholder='Search listings...'
                            className='w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-400 text-gray-900 placeholder:text-gray-500'
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <span className='block text-sm font-semibold text-gray-800 mb-1'>Type</span>
                        <div className='space-y-2 text-gray-700'>
                            {['all', 'rent', 'sale'].map((type) => (
                                <label key={type} className='flex items-center space-x-2'>
                                    <input
                                        type='checkbox'
                                        id={type}
                                        className='w-5 h-5 text-blue-600'
                                        onChange={handleChange}
                                        checked={sidebardata.type === type}
                                    />
                                    <span className='capitalize'>{type === 'all' ? 'Rent & Sale' : type}</span>
                                </label>
                            ))}
                            <label className='flex items-center space-x-2'>
                                <input
                                    type='checkbox'
                                    id='offer'
                                    className='w-5 h-5 text-blue-600'
                                    onChange={handleChange}
                                    checked={sidebardata.offer}
                                />
                                <span>Offer</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <span className='block text-sm font-semibold text-gray-800 mb-1'>Amenities</span>
                        <div className='space-y-2 text-gray-700'>
                            {['parking', 'furnished'].map((amenity) => (
                                <label key={amenity} className='flex items-center space-x-2'>
                                    <input
                                        type='checkbox'
                                        id={amenity}
                                        className='w-5 h-5 text-blue-600'
                                        onChange={handleChange}
                                        checked={sidebardata[amenity]}
                                    />
                                    <span className='capitalize'>{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor='sort_order' className='block text-sm font-semibold text-gray-800 mb-1'>
                            Sort By
                        </label>
                        <select
                            id='sort_order'
                            onChange={handleChange}
                            defaultValue='created_at_desc'
                            className='w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-400 text-gray-900 bg-white'
                        >
                            <option value='regularPrice_desc'>Price: High to Low</option>
                            <option value='regularPrice_asc'>Price: Low to High</option>
                            <option value='createdAt_desc'>Newest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition'
                    >
                        Search
                    </button>
                </form>
            </aside>

            <main className='flex-1'>
                <h1 className='text-3xl font-bold text-slate-800 p-6 border-b'>Listing Results</h1>
                <div className='p-6 flex flex-wrap gap-6'>
                    {!loading && listings.length === 0 && (
                        <p className='text-xl text-gray-600'>No listings found!</p>
                    )}
                    {loading && (
                        <p className='text-xl text-gray-600 text-center w-full'>Loading...</p>
                    )}
                    {!loading &&
                        listings.map((listing) => (
                            <ListingItem key={listing._id} listing={listing} />
                        ))}
                    {showMore && (
                        <button
                            onClick={onShowMoreClick}
                            className='w-full text-center text-blue-600 hover:underline mt-6'
                        >
                            Show More
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
}