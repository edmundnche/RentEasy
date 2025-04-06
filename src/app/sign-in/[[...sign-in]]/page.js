'use client';

import { useSignIn } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaFacebookF, FaTiktok } from 'react-icons/fa';

export default function SignInPage() {
    const { signIn, setActive } = useSignIn();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignIn = async () => {
        try {
            const res = await signIn.create({
                identifier: email,
                password,
            });
            await setActive({ session: res.createdSessionId });
            router.push('/');
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Sign-in failed');
        }
    };

    const handleOAuth = (strategy) => {
        signIn.authenticateWithRedirect({ strategy, redirectUrl: '/' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E1ECFF] px-4">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#E9EBEF] w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-[#204FA0] font-rubik">
                    Welcome to <span className="text-[#282930]">RentEasy</span>
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center font-dm-sans">{error}</p>
                )}

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full border border-[#E9EBEF] p-3 rounded-lg focus:outline-none focus:border-[#204FA0] focus:ring-1 focus:ring-[#A6C7FF] text-[#282930] font-dm-sans"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border border-[#E9EBEF] p-3 rounded-lg focus:outline-none focus:border-[#204FA0] focus:ring-1 focus:ring-[#A6C7FF] text-[#282930] font-dm-sans"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={handleSignIn}
                        className="w-full bg-[#204FA0] text-white py-3 rounded-lg font-semibold hover:bg-[#153b7a] transition font-rubik"
                    >
                        Sign In
                    </button>
                </div>

                <div className="my-6 text-center text-[#5E5F66] text-sm font-dm-sans">
                    or sign in with
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => handleOAuth('oauth_google')}
                        className="flex-1 py-2 rounded-lg transition text-sm font-medium flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-dm-sans"
                    >
                        <FaGoogle />
                        Google
                    </button>
                    <button
                        onClick={() => handleOAuth('oauth_facebook')}
                        className="flex-1 py-2 rounded-lg transition text-sm font-medium flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-dm-sans"
                    >
                        <FaFacebookF />
                        Facebook
                    </button>
                    <button
                        onClick={() => handleOAuth('oauth_tiktok')}
                        className="flex-1 py-2 rounded-lg transition text-sm font-medium flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white font-dm-sans"
                    >
                        <FaTiktok />
                        TikTok
                    </button>
                </div>

                <div className="mt-6 border-t border-[#E9EBEF] pt-4 text-center text-sm text-[#5E5F66] font-dm-sans">
                    Don't have an account?{' '}
                    <a href="/sign-up" className="text-[#204FA0] hover:underline font-medium">
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
}

function OAuthButton({ onClick, label, icon, className }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-2 rounded-lg transition text-sm font-medium flex items-center justify-center gap-2 ${className}`}
        >
            {icon}
            {label}
        </button>
    );
}
