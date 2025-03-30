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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                    Welcome to <span className="text-black">RentEasy</span>
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={handleSignIn}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </div>

                <div className="my-6 text-center text-gray-400 text-sm">
                    or sign in with
                </div>

                <div className="flex gap-3">
                    <OAuthButton
                        onClick={() => handleOAuth('oauth_google')}
                        label="Google"
                        icon={<FaGoogle />}
                        className="bg-red-500 hover:bg-red-600 text-white"
                    />
                    <OAuthButton
                        onClick={() => handleOAuth('oauth_facebook')}
                        label="Facebook"
                        icon={<FaFacebookF />}
                        className="bg-blue-800 hover:bg-blue-900 text-white"
                    />
                    <OAuthButton
                        onClick={() => handleOAuth('oauth_tiktok')}
                        label="TikTok"
                        icon={<FaTiktok />}
                        className="bg-black hover:bg-gray-900 text-white"
                    />
                </div>

                <div className="mt-6 border-t pt-4 text-center text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <a href="/sign-up" className="text-blue-600 hover:underline font-medium">
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
