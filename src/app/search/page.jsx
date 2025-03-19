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
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
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
        body: JSON.stringify({
          searchTerm: sidebardata.searchTerm,
          type: sidebardata.type,
          parking: sidebardata.parking,
          furnished: sidebardata.furnished,
          offer: sidebardata.offer,
          sort: sidebardata.sort,
          order: sidebardata.order,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, [searchParams]);

  const handleChange = (e) => {
    if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }
    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row bg-gray-50 min-h-screen'>
      {/* Sidebar */}
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen bg-white shadow-sm'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          {/* Search Term */}
          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          {/* Type */}
          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>Type:</label>
            <div className='grid grid-cols-2 gap-4'>
              {['all', 'rent', 'sale', 'offer'].map((type) => (
                <div key={type} className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    id={type}
                    className='w-5 h-5 accent-blue-500'
                    onChange={handleChange}
                    checked={
                      type === 'offer'
                        ? sidebardata.offer
                        : sidebardata.type === type
                    }
                  />
                  <span className='text-gray-700'>{type === 'all' ? 'Rent & Sale' : type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>Amenities:</label>
            <div className='grid grid-cols-2 gap-4'>
              {['parking', 'furnished'].map((amenity) => (
                <div key={amenity} className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    id={amenity}
                    className='w-5 h-5 accent-blue-500'
                    onChange={handleChange}
                    checked={sidebardata[amenity]}
                  />
                  <span className='text-gray-700'>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
            >
              <option value='regularPrice_desc'>Price low to high</option>
              <option value='regularPrice_asc'>Price high to low</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>

          {/* Search Button */}
          <button className='bg-blue-600 text-white p-3 rounded-lg uppercase font-semibold hover:bg-blue-700 transition-all mt-4'>
            Search
          </button>
        </form>
      </div>

      {/* Listing Results */}
      <div className='flex-1 p-7'>
        <h1 className='text-3xl font-semibold text-gray-800 mb-6'>Listing Results:</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-gray-700 col-span-full'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-gray-700 text-center col-span-full'>Loading...</p>
          )}
          {!loading &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-blue-600 hover:text-blue-700 font-semibold text-center col-span-full mt-6'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}