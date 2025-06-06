'use client';
import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Profile() {
    const { user, isLoaded, isSignedIn } = useUser();
    const { signOut, deleteUser } = useClerk();
    const router = useRouter();

    const [listings, setListings] = useState([]);
    const [showListings, setShowListings] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);

    useEffect(() => {
        if (!isLoaded) return;
        if (!isSignedIn) {
            router.push("/sign-in");
        } else {
            setUsername(user?.username || "");
            setEmail(user?.primaryEmailAddress?.emailAddress || "");
        }
    }, [isLoaded, isSignedIn, user, router]);

    const handleUpdate = async () => {
        try {
            const response = await fetch("/api/user/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });
            if (!response.ok) throw new Error("Update failed");
            alert("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const fetchListings = async () => {
        if (!user) return;
        try {
            const response = await fetch(`/api/listing/get?user=${user.id}`);
            const text = await response.text();
            const data = text ? JSON.parse(text) : [];
            setListings(data);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    const handleDeleteListing = async (id) => {
        try {
            await fetch(`/api/listing/delete/${id}`, { method: "DELETE" });
            setListings(listings.filter((listing) => listing._id !== id));
        } catch (error) {
            console.error("Error deleting listing:", error);
        }
    };

    const toggleListings = () => {
        if (!showListings) {
            fetchListings();
        }
        setShowListings(!showListings);
    };

    const handleProfilePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePhoto(URL.createObjectURL(file));
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            
            <h2 className="text-4xl font-bold text-center text-[#282930] mb-10 font-rubik">
                My Profile
            </h2>

            
            <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 border border-[#E9EBEF]">
                {/* Avatar with primary blue background */}
                <label className="cursor-pointer">
                    <input type="file" className="hidden" onChange={handleProfilePhotoChange} />
                    <div className="w-28 h-28 bg-[#204FA0] text-white rounded-full flex items-center justify-center text-4xl overflow-hidden">
                        {profilePhoto ? (
                            <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            user?.firstName?.charAt(0) || "U"
                        )}
                    </div>
                </label>

               
                <div className="flex-1 w-full">
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-[#A6C7FF] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#204FA0] text-[#282930] placeholder:text-[#5E5F66] font-dm-sans"
                            placeholder="Username"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-[#A6C7FF] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#204FA0] text-[#282930] placeholder:text-[#5E5F66] font-dm-sans"
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-[#A6C7FF] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#204FA0] text-[#282930] placeholder:text-[#5E5F66] font-dm-sans"
                            placeholder="New Password"
                        />
                        
                        
                        <button
                            onClick={handleUpdate}
                            className="w-full bg-[#204FA0] text-white p-3 rounded-lg hover:bg-[#153b7a] transition font-rubik"
                        >
                            Update Profile
                        </button>
                        <button
                            onClick={() => router.push("/create-listing")}
                            className="w-full bg-[#204FA0] text-white p-3 rounded-lg hover:bg-[#153b7a] transition font-rubik"
                        >
                            Create New Listing
                        </button>
                    </div>

                    <div className="flex justify-between text-sm mt-4 text-[#204FA0] font-dm-sans">
                        <button onClick={() => deleteUser()} className="hover:text-[#A6C7FF]">
                            Delete Account
                        </button>
                        <button onClick={() => signOut()} className="hover:text-[#A6C7FF]">
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Toggle Listings button */}
            <div className="text-center mt-10">
                <button
                    onClick={toggleListings}
                    className="text-[#204FA0] underline hover:text-[#A6C7FF] transition font-dm-sans"
                >
                    {showListings ? "Hide Listings" : "Show Listings"}
                </button>
            </div>

            {/* Listings section */}
            {showListings && (
                <div className="mt-10">
                    <h3 className="text-2xl font-semibold text-[#282930] mb-6 font-rubik">
                        Your Listings
                    </h3>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {listings.map((listing) => (
                            <div
                                key={listing._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition border border-[#E9EBEF]"
                            >
                                <img
                                    src={listing.imageUrl}
                                    alt={listing.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h4 className="text-lg font-semibold text-[#282930] font-rubik">
                                        {listing.title}
                                    </h4>
                                    {listing.description && (
                                        <p className="text-sm text-[#5E5F66] mt-1 font-dm-sans">
                                            {listing.description}
                                        </p>
                                    )}
                                    <div className="flex justify-end mt-3 space-x-3 text-sm">
                                        <button
                                            onClick={() => router.push(`/update-listing/${listing._id}`)}
                                            className="text-[#204FA0] hover:text-[#A6C7FF] font-dm-sans"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteListing(listing._id)}
                                            className="text-[#FF3B30] hover:text-[#FF6B60] font-dm-sans"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}