import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import Router from 'next/router';
const LoginComponent: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login,setLogin] = useState(0);
    if (login == 2)  {
        Router.push('courses/create');
    }
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLogin(1);
        if (!email.trim() || !password.trim()) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const response = await fetch('/api/auth/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setLogin(2);
                // store token in localStorage
                localStorage.setItem('usertoken', data.token);
            } else {
                throw new Error(data.message || 'An error occurred while logging in');
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center h-screen w-screen">
                <form onSubmit={handleLogin} className="max-w-md w-full p-8">
                    <h2 className="text-2xl font-semibold text-center text-white mb-6">Log in to your account</h2>
                    {/* email Field */}
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                            email
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg text-white bg-gray-800 focus:ring-blue-500 focus:border-blue-500"
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg text-white bg-gray-800 focus:ring-blue-500 focus:border-blue-500"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* Login Button */}
                    <div className="flex items-center justify-center">
                        <button
                            className="w-full flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            type="submit"
                        >
                            {
                                login === 0 ? 'Login' : login === 1 ? <Spinner /> : 'Logged in successfully'
                            }
                        </button>
                    </div>
                    <div className="mt-4 text-center flex justify-center items-center space-x-2">
                            <p className='opacity-50 text-white'> Don&apos;t have an account yet?</p>
                            <Link href="/register" className="text-blue-500 hover:text-blue-600 font-semibold">
                                Register
                            </Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default LoginComponent;
