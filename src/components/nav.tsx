
import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
const Nav: React.FC = () => {
    const [isLogged, setIsLogged] = useState(false);  
    useEffect(() => {
    
        // This ensures that localStorage is accessed only on the client side
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('usertoken');
            if (token) {
                setIsLogged(true);
            }
        }
    }, []);
    return (
        <header className="flex w-full max-w-5xl items-center justify-between">
            {/* Navigation Bar */}
            <nav>
                <ul className="flex space-x-4 font-mono">
                    <li className="relative group">
                        <Link href="/courses" className="nav-link py-2 px-4 inline-block text-gray-800 hover:text-blue-600 transition duration-300">
                            Courses
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </li>
                    <li className="relative group">
                        <a href="/courses/create" className="nav-link py-2 px-4 inline-block text-gray-800 hover:text-blue-600 transition duration-300">
                            Create
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </a>
                    </li>
                    <li className="relative group">
                        <Link href="/about" className="nav-link py-2 px-4 inline-block text-gray-800 hover:text-blue-600 transition duration-300">
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </li>
                </ul>
            </nav>
            {isLogged ? (
                <div className="flex items-center space-x-4 font-mono">
                    <div className='relative group'>
                        <Link href="/profile" className="py-2 px-4 inline-block text-gray-800 hover:text-blue-600 transition duration-300">
                            Profile
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </div>
                    <div className='relative group'>
                        <Link href="/logout" className="py-2 px-4 inline-block text-gray-800 hover:text-blue-600 transition duration-300">
                            Logout
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex items-center space-x-4 relative group">
                    <Link href="/register" className="py-2 px-4 inline-block text-gray-800 hover:text-blue-600 transition duration-300">
                        Sign Up
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Nav;
