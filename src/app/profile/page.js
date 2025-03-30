"use client";

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
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">My Profile</h2>

            {/* Profile Card */}
            <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
                {/* Avatar */}
                <label className="cursor-pointer">
                    <input type="file" className="hidden" onChange={handleProfilePhotoChange} />
                    <div className="w-28 h-28 bg-blue-600 text-white rounded-full flex items-center justify-center text-4xl overflow-hidden">
                        {profilePhoto ? (
                            <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            user?.firstName?.charAt(0) || "U"
                        )}
                    </div>
                </label>

                {/* Form */}
                <div className="flex-1 w-full">
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Username"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="New Password"
                        />
                        <button
                            onClick={handleUpdate}
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Update Profile
                        </button>
                        <button
                            onClick={() => router.push("/create-listing")}
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Create New Listing
                        </button>
                    </div>

                    <div className="flex justify-between text-sm mt-4 text-blue-600">
                        <button onClick={() => deleteUser()} className="hover:text-blue-700">Delete Account</button>
                        <button onClick={() => signOut()} className="hover:text-blue-700">Sign Out</button>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <div className="text-center mt-10">
                <button
                    onClick={toggleListings}
                    className="text-blue-600 underline hover:text-blue-700 transition"
                >
                    {showListings ? "Hide Listings" : "Show Listings"}
                </button>
            </div>

            {/* Listings */}
            {showListings && (
                <div className="mt-10">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Your Listings</h3>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {listings.map((listing) => (
                            <div
                                key={listing._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                            >
                                <img
                                    src={listing.imageUrl}
                                    alt={listing.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h4 className="text-lg font-semibold text-gray-800">{listing.title}</h4>
                                    {listing.description && (
                                        <p className="text-sm text-gray-600 mt-1">{listing.description}</p>
                                    )}
                                    <div className="flex justify-end mt-3 space-x-3 text-sm">
                                        <button
                                            onClick={() => router.push(`/update-listing/${listing._id}`)}
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteListing(listing._id)}
                                            className="text-red-500 hover:text-red-700"
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
