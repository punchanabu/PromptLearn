import React, { useState } from 'react';
import Layout from '@/components/Layout';
const LoginComponent: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

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
                alert("Login successful!");
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
                <form onSubmit={handleLogin} className="max-w-md w-full bg-white p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                    {/* email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            email
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                        />
                    </div>
                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    {/* Login Button */}
                    <div className="flex items-center justify-center">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default LoginComponent;
