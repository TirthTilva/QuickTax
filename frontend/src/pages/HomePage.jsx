// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
                
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
                    Welcome to Modern Authentication
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    A seamless and secure sign-in and sign-up experience built with the MERN stack, JWT, and Tailwind CSS.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/register"
                        className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/login"
                        className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-md border border-indigo-200 hover:bg-indigo-50 transition duration-300"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;