import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

        if (!username.trim() || !email.trim() || !password.trim()) {
            alert("Please enter username, email, and password.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const responseJson = await response.json();

            if (!responseJson.ok) {
                console.log("There was an error while registering!", responseJson);
                throw new Error(responseJson.message);
            }

            alert("Registration successful!"); // Placeholder for actual registration action
        } catch (error) {
            console.log("There was an error while registering!", error);
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center h-screen w-screen">
                <div className="max-w-md w-full bg-white p-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Username Field */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"

                        >
                            Register
                        </button>

                        {/* Already have an account? */}
                        <div className="mt-4 text-center flex justify-center items-center space-x-2">
                            <p className='opacity-50'> Already have an account? </p>
                            <Link href="/login" className="text-blue-500 hover:text-blue-600 font-semibold">
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
