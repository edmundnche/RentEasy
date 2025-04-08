// 'use client';
// import { useEffect, useState } from 'react';
// import {
//     getDownloadURL,
//     getStorage,
//     ref,
//     uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../../../firebase';
// import { useUser } from '@clerk/nextjs';
// import { useRouter, usePathname } from 'next/navigation';

// export default function UpdateListing() {
//     const { isSignedIn, user, isLoaded } = useUser();
//     const [files, setFiles] = useState([]);
//     const pathname = usePathname();
//     const listingId = pathname.split('/').pop();
//     const [formData, setFormData] = useState({
//         imageUrls: [],
//         name: '',
//         description: '',
//         address: '',
//         type: 'rent',
//         bedrooms: 1,
//         bathrooms: 1,
//         regularPrice: 50,
//         discountPrice: 0,
//         offer: false,
//         parking: false,
//         furnished: false,
//     });

//     useEffect(() => {
//         const fetchListing = async () => {
//             const res = await fetch('/api/listing/get', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ listingId }),
//             });
//             const data = await res.json();
//             if (data.success === false) {
//                 console.log(data.message);
//                 return;
//             }
//             setFormData(data[0]);
//         };
//         fetchListing();
//     }, []);

//     const [imageUploadError, setImageUploadError] = useState(false);
//     const [uploading, setUploading] = useState(false);
//     const [error, setError] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const handleImageSubmit = () => {
//         if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
//             setUploading(true);
//             setImageUploadError(false);
//             const promises = [];
//             for (let i = 0; i < files.length; i++) {
//                 promises.push(storeImage(files[i]));
//             }
//             Promise.all(promises)
//                 .then((urls) => {
//                     setFormData((prev) => ({
//                         ...prev,
//                         imageUrls: prev.imageUrls.concat(urls),
//                     }));
//                     setUploading(false);
//                 })
//                 .catch(() => {
//                     setImageUploadError('Image upload failed (2 mb max per image)');
//                     setUploading(false);
//                 });
//         } else {
//             setImageUploadError('You can only upload 6 images per listing');
//             setUploading(false);
//         }
//     };

//     const storeImage = async (file) => {
//         return new Promise((resolve, reject) => {
//             const storage = getStorage(app);
//             const fileName = new Date().getTime() + file.name;
//             const storageRef = ref(storage, fileName);
//             const uploadTask = uploadBytesResumable(storageRef, file);
//             uploadTask.on(
//                 'state_changed',
//                 () => { },
//                 (error) => reject(error),
//                 () => {
//                     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                         resolve(downloadURL);
//                     });
//                 }
//             );
//         });
//     };

//     const handleRemoveImage = (index) => {
//         setFormData((prev) => ({
//             ...prev,
//             imageUrls: prev.imageUrls.filter((_, i) => i !== index),
//         }));
//     };

//     const handleChange = (e) => {
//         if (e.target.id === 'sale' || e.target.id === 'rent') {
//             setFormData((prev) => ({
//                 ...prev,
//                 type: e.target.id,
//             }));
//         } else if (
//             e.target.id === 'parking' ||
//             e.target.id === 'furnished' ||
//             e.target.id === 'offer'
//         ) {
//             setFormData((prev) => ({
//                 ...prev,
//                 [e.target.id]: e.target.checked,
//             }));
//         } else {
//             setFormData((prev) => ({
//                 ...prev,
//                 [e.target.id]: e.target.value,
//             }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (formData.imageUrls.length < 1)
//                 return setError('You must upload at least one image');
//             if (+formData.regularPrice < +formData.discountPrice)
//                 return setError('Discount price must be lower than regular price');
//             setLoading(true);
//             setError(false);
//             const res = await fetch('/api/listing/update', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     ...formData,
//                     userMongoId: user.publicMetadata.userMogoId,
//                     listingId,
//                 }),
//             });
//             const data = await res.json();
//             setLoading(false);
//             if (data.success === false) return setError(data.message);
//             router.push(`/listing/${data._id}`);
//         } catch (err) {
//             setLoading(false);
//             setError(err.message);
//         }
//     };

//     if (!isLoaded) {
//         return <h1 className='text-center text-xl my-7 font-semibold text-[#282930] font-rubik'>Loading...</h1>;
//     }

//     if (!isSignedIn) {
//         return <h1 className='text-center text-xl my-7 font-semibold text-[#282930] font-rubik'>You are not authorized to view this page</h1>;
//     }

//     return (
//         <main className='p-6 max-w-5xl mx-auto'>
//             <h1 className='text-4xl text-[#282930] font-bold text-center mb-10 font-rubik'>Update a Listing</h1>

//             <form onSubmit={handleSubmit} className='grid md:grid-cols-2 gap-6'>
//                 {/* Left */}
//                 <div className='flex flex-col gap-6'>
//                     <div className='space-y-2'>
//                         <label htmlFor='name' className='text-[#282930] font-semibold font-dm-sans'>Name</label>
//                         <input
//                             type='text'
//                             id='name'
//                             maxLength='62'
//                             minLength='10'
//                             required
//                             onChange={handleChange}
//                             value={formData.name}
//                             className='border border-[#E9EBEF] p-3 rounded-lg text-[#282930] w-full h-32 resize-none font-dm-sans focus:border-[#204FA0] focus:ring-1 focus:ring-[#A6C7FF]'
//                         />
//                     </div>

//                     <div className='space-y-2'>
//                         <label htmlFor='description' className='text-gray-800 font-semibold'>Description</label>
//                         <textarea
//                             id='description'
//                             required
//                             onChange={handleChange}
//                             value={formData.description}
//                             className='border border-[#E9EBEF] p-3 rounded-lg text-[#282930] w-full h-32 resize-none font-dm-sans focus:border-[#204FA0] focus:ring-1 focus:ring-[#A6C7FF]'
//                         />
//                     </div>

//                     <div className='space-y-2'>
//                         <label htmlFor='address' className='text-gray-800 font-semibold'>Address</label>
//                         <input
//                             type='text'
//                             id='address'
//                             required
//                             onChange={handleChange}
//                             value={formData.address}
//                             className='border border-[#E9EBEF] p-3 rounded-lg text-[#282930] w-full h-32 resize-none font-dm-sans focus:border-[#204FA0] focus:ring-1 focus:ring-[#A6C7FF]'
//                         />
//                     </div>

//                     <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
//                         {[
//                             { id: 'sale', label: 'Sell', checked: formData.type === 'sale' },
//                             { id: 'rent', label: 'Rent', checked: formData.type === 'rent' },
//                             { id: 'parking', label: 'Parking', checked: formData.parking },
//                             { id: 'furnished', label: 'Furnished', checked: formData.furnished },
//                             { id: 'offer', label: 'Offer', checked: formData.offer },
//                         ].map((item) => (
//                             <label key={item.id} className='flex items-center gap-2 text-[#282930] font-medium font-dm-sans'>
//                                 <input
//                                     type='checkbox'
//                                     id={item.id}
//                                     onChange={handleChange}
//                                     checked={item.checked}
//                                     className='w-4 h-4 accent-[#204FA0]'
//                                 />
//                                 <span>{item.label}</span>
//                             </label>
//                         ))}
//                     </div>

//                     <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
//                         <div>
//                             <label htmlFor='bedrooms' className='text-gray-800 font-semibold'>Beds</label>
//                             <input
//                                 type='number'
//                                 id='bedrooms'
//                                 min='1'
//                                 max='10'
//                                 required
//                                 onChange={handleChange}
//                                 value={formData.bedrooms}
//                                 className='border border-[#E9EBEF] p-3 rounded-lg text-[#282930] w-full font-dm-sans focus:border-[#204FA0] focus:ring-1 focus:ring-[#A6C7FF]'
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor='bathrooms' className='text-gray-800 font-semibold'>Baths</label>
//                             <input
//                                 type='number'
//                                 id='bathrooms'
//                                 min='1'
//                                 max='10'
//                                 required
//                                 onChange={handleChange}
//                                 value={formData.bathrooms}
//                                 className='border border-[#E9EBEF] p-3 rounded-lg text-[#282930] w-full font-dm-sans focus:border-[#204FA0] focus:ring-1 focus:ring-[#A6C7FF]'
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor='regularPrice' className='text-gray-800 font-semibold'>
//                                 Regular Price <span className='text-sm font-normal text-gray-500'>($/mo)</span>
//                             </label>
//                             <input
//                                 type='number'
//                                 id='regularPrice'
//                                 min='50'
//                                 max='10000000'
//                                 required
//                                 onChange={handleChange}
//                                 value={formData.regularPrice}
//                                 className='border border-[#E9EBEF] p-3 rounded-lg text-[#282930] w-full font-dm-sans focus:border-[#204FA0] focus:ring-1 focus:ring-[#A6C7FF]'
//                             />
//                         </div>
//                         {formData.offer && (
//                             <div>
//                                 <label htmlFor='discountPrice' className='text-gray-800 font-semibold'>
//                                     Discounted Price <span className='text-sm font-normal text-gray-500'>($/mo)</span>
//                                 </label>
//                                 <input
//                                     type='number'
//                                     id='discountPrice'
//                                     min='0'
//                                     max='10000000'
//                                     required
//                                     onChange={handleChange}
//                                     value={formData.discountPrice}
//                                     className='border border-[#E9EBEF] p-3 rounded-lg text-[#282930] w-full font-dm-sans focus:border-[#204FA0] focus:ring-1 focus:ring-[#A6C7FF]'
//                                 />
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Right */}
//                 <div className='flex flex-col gap-6'>
//                     <div>
//                         <p className='text-[#282930] font-semibold font-dm-sans'>Images</p>
//                         <p className='text-sm text-[#5E5F66] font-dm-sans'>Upload up to 6 images. First image will be the cover.</p>
//                         <div className='flex items-center gap-3 mt-2'>
//                             <input
//                                 type='file'
//                                 id='images'
//                                 accept='image/*'
//                                 multiple
//                                 onChange={(e) => setFiles(e.target.files)}
//                                 className='border border-[#E9EBEF] p-3 rounded w-full font-dm-sans'
//                             />
//                             <button
//                                 type='button'
//                                 onClick={handleImageSubmit}
//                                 disabled={uploading}
//                                 className='border border-[#204FA0] text-[#204FA0] font-medium px-4 py-2 rounded hover:bg-[#E1ECFF] transition font-dm-sans'
//                             >
//                                 {uploading ? 'Uploading...' : 'Upload'}
//                             </button>
//                         </div>
//                         {imageUploadError && <p className='text-sm text-red-600 mt-2'>{imageUploadError}</p>}
//                     </div>

//                     <div className='space-y-2'>
//                         {formData.imageUrls.map((url, index) => (
//                             <div key={url} className='flex justify-between items-center p-2 border border-[#E9EBEF] rounded-lg'>
//                                 <img src={url} alt='listing' className='w-20 h-20 object-cover rounded' />
//                                 <button
//                                     type='button'
//                                     onClick={() => handleRemoveImage(index)}
//                                     className='text-[#204FA0] hover:text-[#A6C7FF] hover:underline font-dm-sans'
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         ))}
//                     </div>

//                     <button
//                         type='submit'
//                         disabled={loading || uploading}
//                         className='bg-[#204FA0] text-white font-semibold py-3 rounded-lg uppercase hover:bg-[#153b7a] transition font-rubik'
//                     >
//                         {loading ? 'Updating...' : 'Update Listing'}
//                     </button>

//                     {error && <p className='text-sm text-red-600 font-dm-sans'>{error}</p>}
//                 </div>
//             </form>
//         </main>
//     );
// }

'use client';
import { useEffect, useState } from 'react';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../../firebase';
import { useUser } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
export default function UpdateListing() {
    const { isSignedIn, user, isLoaded } = useUser();
    const [files, setFiles] = useState([]);
    const pathname = usePathname();
    const listingId = pathname.split('/').pop();
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
    useEffect(() => {
        const fetchListing = async () => {
            const res = await fetch('/api/listing/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    listingId,
                }),
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setFormData(data[0]);
        };
        fetchListing();
    }, []);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
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
                    setFormData({
                        ...formData,
                        imageUrls: formData.imageUrls.concat(urls),
                    });
                    setImageUploadError(false);
                    setUploading(false);
                })
                .catch((err) => {
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
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };
    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };
    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }
        if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }
        if (
            e.target.type === 'number' ||
            e.target.type === 'text' ||
            e.target.type === 'textarea'
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1)
                return setError('You must upload at least one image');
            if (+formData.regularPrice < +formData.discountPrice)
                return setError('Discount price must be lower than regular price');
            setLoading(true);
            setError(false);
            const res = await fetch('/api/listing/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userMongoId: user.publicMetadata.userMogoId,
                    listingId,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            router.push(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    if (!isLoaded) {
        return (
            <h1 className='text-center text-xl my-7 font-semibold'>Loading...</h1>
        );
    }
    if (!isSignedIn) {
        return (
            <h1 className='text-center text-xl my-7 font-semibold'>
                You are not authorized to view this page
            </h1>
        );
    }
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>
                Update a Listing
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input
                        type='text'
                        placeholder='Name'
                        className='border p-3 rounded-lg text-black'
                        id='name'
                        maxLength='62'
                        minLength='10'
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        type='text'
                        placeholder='Description'
                        className='border p-3 rounded-lg text-black'
                        id='description'
                        required
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <input
                        type='text'
                        placeholder='Address'
                        className='border p-3 rounded-lg text-black'
                        id='address'
                        required
                        onChange={handleChange}
                        value={formData.address}
                    />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.type === 'sale'}
                            />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='rent'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.type === 'rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='parking'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='furnished'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='offer'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='bedrooms'
                                min='1'
                                max='10'
                                required
                                className='p-3 border border-gray-300 rounded-lg text-black'
                                onChange={handleChange}
                                value={formData.bedrooms}
                            />
                            <p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='bathrooms'
                                min='1'
                                max='10'
                                required
                                className='p-3 border border-gray-300 rounded-lg text-black'
                                onChange={handleChange}
                                value={formData.bathrooms}
                            />
                            <p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='regularPrice'
                                required
                                className='p-3 border border-gray-300 rounded-lg text-black'
                                min='50'
                                max='10000000'
                                onChange={handleChange}
                                value={formData.regularPrice}
                            />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                        {formData.offer && (
                            <div className='flex items-center gap-2'>
                                <input
                                    type='number'
                                    id='discountPrice'
                                    min='0'
                                    max='10000000'
                                    required
                                    className='p-3 border border-gray-300 rounded-lg text-black'
                                    onChange={handleChange}
                                    value={formData.discountPrice}
                                />
                                <div className='flex flex-col items-center'>
                                    <p>Discounted price</p>
                                    <span className='text-xs'>($ / month)</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>
                        Images:
                        <span className='font-normal text-gray-600 ml-2'>
                            The first image will be the cover (max 6)
                        </span>
                    </p>
                    <div className='flex gap-4'>
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            className='p-3 border border-gray-300 rounded w-full'
                            type='file'
                            id='images'
                            accept='image/*'
                            multiple
                        />
                        <button
                            disabled={uploading}
                            onClick={handleImageSubmit}
                            className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    <p className='text-red-700 text-sm'>
                        {imageUploadError && imageUploadError}
                    </p>
                    {formData.imageUrls.length > 0 &&
                        formData.imageUrls.map((url, index) => (
                            <div
                                key={url}
                                className='flex justify-between p-3 border items-center'
                            >
                                <img
                                    src={url}
                                    alt='listing image'
                                    className='w-20 h-20 object-contain rounded-lg'
                                />
                                <button
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}
                                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    <button
                        disabled={loading || uploading}
                        className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    >
                        {loading ? 'Updating...' : 'Update listing'}
                    </button>
                    {error && <p className='text-red-700 text-sm'>{error}</p>}
                </div>
            </form>
        </main>
    );
}