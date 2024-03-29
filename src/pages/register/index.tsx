import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Spinner from '@/components/Spinner';
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(0); // 0 = not register 1 = registering 2 = registered 
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();

        console.log("Submitting form!", username, email, password);
        setRegistered(1);
        if (!username.trim() || !email.trim() || !password.trim()) {
            alert("Please enter username, email, and password.");
            return;
        }

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        
        
        setRegistered(2);
    };

    return (
        <Layout>
            <div className="flex justify-center items-center h-screen w-screen">
                <div className="max-w-md w-full p-6 space-y-5">
                    <h2 className="text-3xl font-semibold text-center text-black mb-6">Create Your Account</h2>
                    
                    <form onSubmit={handleSubmit}>
                        {/* Username Field */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-black font-bold mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                                className="w-full px-3 py-2 border rounded-md text-black  focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-black font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full px-3 py-2 border rounded-md text-black  focus:ring-blue-500 focus:border-blue-500"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-black font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full border px-3 py-2 rounded-md text-black  focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center items-center bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"

                        >
                        {
                            registered == 0 && (
                                <span>Register</span>
                            )
                        }    
                        {
                            registered == 1 && (
                                <div className="text-black text-center">
                                    <Spinner />
                                </div>
                            )
                        }
                        {registered == 2 && (
                            <p className= "text-black text-center">
                                You have successfully registered!
                            </p>
                        )}
                        </button>
                        
                        {/* Already have an account? */}
                        <div className="mt-4 text-center flex justify-center items-center space-x-2">
                            <p className='opacity-50 text-black'> Already have an account? </p>
                            <Link href="/login" className="text-black hover:text-gray-600 font-semibold">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
