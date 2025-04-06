'use client';

import { useSignUp } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaFacebookF, FaTiktok } from 'react-icons/fa';

export default function SignUpPage() {
    const { signUp, setActive } = useSignUp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignUp = async () => {
        setPending(true);
        try {
            const res = await signUp.create({
                emailAddress: email,
                password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            await setActive({ session: res.createdSessionId });
            router.push('/');
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Sign-up failed');
        } finally {
            setPending(false);
        }
    };

    const handleOAuth = (strategy) => {
        signUp.authenticateWithRedirect({ strategy, redirectUrl: '/' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E1ECFF] px-4">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#E9EBEF] w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-[#204FA0] font-rubik">
                    Create your <span className="text-[#282930]">RentEasy</span> account
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
                        onClick={handleSignUp}
                        disabled={pending}
                        className={`w-full py-3 rounded-lg font-semibold transition text-white font-rubik ${
                            pending
                                ? 'bg-[#A6C7FF] cursor-not-allowed'
                                : 'bg-[#204FA0] hover:bg-[#153b7a]'
                        }`}
                    >
                        {pending ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </div>

                <div className="my-6 text-center text-[#5E5F66] text-sm font-dm-sans">
                    or sign up with
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
                    Already have an account?{' '}
                    <a href="/sign-in" className="text-[#204FA0] hover:underline font-medium">
                        Sign in
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
