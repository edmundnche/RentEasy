'use client';
import { useState } from 'react';
import { app } from '../../firebase';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function CreateListing() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData((prev) => ({
            ...prev,
            imageUrls: prev.imageUrls.concat(urls),
          }));
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        () => { },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData((prev) => ({
        ...prev,
        type: e.target.id,
      }));
    } else if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
    if (+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price');
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userMongoId: user.publicMetadata.userMogoId,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
        return;
      }

      router.push(`/listing/${data._id}`);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  if (!isLoaded) return <h1 className='text-center text-xl my-7 font-semibold text-[#282930] font-rubik'>Loading...</h1>;
  if (!isSignedIn) return <h1 className='text-center text-xl my-7 font-semibold text-[#282930] font-rubik'>You are not authorized to view this page</h1>;

  return (
    <main className='p-6 max-w-5xl mx-auto'>
      <h1 className='text-4xl text-[#282930] font-bold text-center mb-10 font-rubik'>
        Create a Listing
      </h1>

      <form className='grid md:grid-cols-2 gap-6' onSubmit={handleSubmit}>
        {/* Left Panel */}
        <div className='flex flex-col gap-6'>
          {/* Name Input */}
          <div className='space-y-2'>
            <label htmlFor='name' className='text-[#282930] font-semibold font-dm-sans'>
              Name
            </label>
            <input
              type='text'
              id='name'
              placeholder='e.g. Cozy 2BR Apartment'
              maxLength='62'
              minLength='10'
              required
              onChange={handleChange}
              value={formData.name}
              className='border border-[#A6C7FF] p-3 rounded-lg text-[#282930] w-full focus:outline-none focus:ring-2 focus:ring-[#204FA0] font-dm-sans'
            />
          </div>

          {/* Description Textarea */}
          <div className='space-y-2'>
            <label htmlFor='description' className='text-[#282930] font-semibold font-dm-sans'>
              Description
            </label>
            <textarea
              id='description'
              required
              onChange={handleChange}
              value={formData.description}
              placeholder='Describe your listing...'
              className='border border-[#A6C7FF] p-3 rounded-lg text-[#282930] w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#204FA0] font-dm-sans'
            />
          </div>

          {/* Address Input */}
          <div className='space-y-2'>
            <label htmlFor='address' className='text-[#282930] font-semibold font-dm-sans'>
              Address
            </label>
            <input
              type='text'
              id='address'
              required
              onChange={handleChange}
              value={formData.address}
              placeholder='e.g. 123 Main Street'
              className='border border-[#A6C7FF] p-3 rounded-lg text-[#282930] w-full focus:outline-none focus:ring-2 focus:ring-[#204FA0] font-dm-sans'
            />
          </div>

          {/* Checkbox Options */}
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {[
              { id: 'sale', label: 'Sell', checked: formData.type === 'sale' },
              { id: 'rent', label: 'Rent', checked: formData.type === 'rent' },
              { id: 'parking', label: 'Parking', checked: formData.parking },
              { id: 'furnished', label: 'Furnished', checked: formData.furnished },
              { id: 'offer', label: 'Offer', checked: formData.offer },
            ].map((item) => (
              <label key={item.id} className='flex items-center gap-2 text-[#282930] font-medium font-dm-sans'>
                <input
                  type='checkbox'
                  id={item.id}
                  onChange={handleChange}
                  checked={item.checked}
                  className='w-4 h-4 text-[#204FA0] focus:ring-[#204FA0]'
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          {/* Numeric Inputs */}
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            <div>
              <label htmlFor='bedrooms' className='text-[#282930] font-semibold font-dm-sans'>
                Beds
              </label>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                onChange={handleChange}
                value={formData.bedrooms}
                className='border border-[#A6C7FF] p-3 rounded-lg text-[#282930] w-full focus:outline-none focus:ring-2 focus:ring-[#204FA0] font-dm-sans'
              />
            </div>
            <div>
              <label htmlFor='bathrooms' className='text-[#282930] font-semibold font-dm-sans'>
                Baths
              </label>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                onChange={handleChange}
                value={formData.bathrooms}
                className='border border-[#A6C7FF] p-3 rounded-lg text-[#282930] w-full focus:outline-none focus:ring-2 focus:ring-[#204FA0] font-dm-sans'
              />
            </div>
            <div>
              <label htmlFor='regularPrice' className='text-[#282930] font-semibold font-dm-sans'>
                Regular Price ($/mo)
              </label>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='100000000'
                required
                onChange={handleChange}
                value={formData.regularPrice}
                className='border border-[#A6C7FF] p-3 rounded-lg text-[#282930] w-full focus:outline-none focus:ring-2 focus:ring-[#204FA0] font-dm-sans'
              />
            </div>
            {formData.offer && (
              <div>
                <label htmlFor='discountPrice' className='text-[#282930] font-semibold font-dm-sans'>
                  Discounted Price ($/mo)
                </label>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                  className='border border-[#A6C7FF] p-3 rounded-lg text-[#282930] w-full focus:outline-none focus:ring-2 focus:ring-[#204FA0] font-dm-sans'
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className='flex flex-col gap-6'>
          {/* Image Upload */}
          <div>
            <p className='text-[#282930] font-semibold font-dm-sans'>Images</p>
            <p className='text-sm text-[#5E5F66] font-dm-sans'>Upload up to 6 images. First image will be the cover.</p>
            <div className='flex items-center gap-3 mt-2'>
              <input
                type='file'
                id='images'
                accept='image/*'
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className='border border-[#A6C7FF] p-3 rounded w-full font-dm-sans'
              />
              <button
                type='button'
                onClick={handleImageSubmit}
                disabled={uploading}
                className='border border-[#204FA0] text-[#204FA0] font-medium px-4 py-2 rounded hover:bg-[#E1ECFF] transition font-dm-sans'
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            {imageUploadError && <p className='text-sm text-[#FF3B30] mt-2 font-dm-sans'>{imageUploadError}</p>}
          </div>

          {/* Image Previews */}
          <div className='space-y-2'>
            {formData.imageUrls.map((url, index) => (
              <div key={url} className='flex justify-between items-center p-2 border border-[#E9EBEF] rounded-lg'>
                <img src={url} alt='listing' className='w-20 h-20 object-cover rounded' />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='text-[#FF3B30] hover:underline font-dm-sans'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading || uploading}
            className='bg-[#204FA0] text-white font-semibold py-3 rounded-lg uppercase hover:bg-[#153b7a] transition font-rubik'
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>

          {error && <p className='text-sm text-[#FF3B30] font-dm-sans'>{error}</p>}
        </div>
      </form>
    </main>
  );
}