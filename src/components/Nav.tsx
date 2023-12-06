
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
    const logOut = () => {
        localStorage.removeItem('usertoken');
        setIsLogged(false);
    };
    return (
        <header className="flex w-full max-w-5xl items-center justify-between text-white mb-10">
            {/* Navigation Bar */}
            <nav>
                <ul className="flex space-x-4 font-mono">
                    <li className="relative group">
                        <Link href="/courses" className="nav-link py-2 px-4 inline-block text-white hover:text-blue-400 transition duration-300">
                            Courses
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </li>
                    <li className="relative group">
                        <Link href="/courses/create" className="nav-link py-2 px-4 inline-block text-white hover:text-blue-400 transition duration-300">
                            Create
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </li>
                </ul>
            </nav>
            {isLogged ? (
                <div className="flex items-center space-x-4 font-mono">
                    <div className='relative group'>
                        <button onClick={logOut} className="py-2 px-4 inline-block text-white hover:text-blue-400 transition duration-300">
                            Logout
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center space-x-4 relative group">
                    <Link href="/register" className="py-2 px-4 inline-block text-white hover:text-blue-400 transition duration-300">
                        Sign Up
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Nav;
