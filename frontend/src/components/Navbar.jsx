// src/components/Navbar.jsx

import { Link } from 'react-router-dom';

const Navbar = () => {
    // In a real app, you'd have state to check if the user is logged in
    const isLoggedIn = false; // Placeholder

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-10">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    QuickTax
                </Link>
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="text-gray-600 hover:text-indigo-600">Profile</Link>
                            <button className="text-gray-600 hover:text-indigo-600">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-indigo-600">Sign In</Link>
                            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;