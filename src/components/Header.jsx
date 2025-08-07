import React, { useState } from 'react';
import { UserCircle, X } from 'lucide-react';

function Header({ setCurrentPage, currentPage, user }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const userId = user?.uid || 'guest';

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <a href="#" className="text-2xl font-bold text-emerald-600">LiveWell by Louisa 🌱</a>
                
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                    <UserCircle className="w-5 h-5 text-gray-400" />
                    <span>{userId}</span>
                </div>

                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="md:hidden p-2 text-emerald-600 focus:outline-none"
                    aria-label="Open menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>

                <div className="hidden md:flex space-x-6 font-medium text-lg">
                    <button onClick={() => setCurrentPage('home')} className={`transition-colors duration-300 ${currentPage === 'home' ? 'text-emerald-700 font-bold' : 'text-gray-600 hover:text-emerald-700'}`}>
                        Home
                    </button>
                    <button onClick={() => setCurrentPage('blog')} className={`transition-colors duration-300 ${currentPage === 'blog' ? 'text-emerald-700 font-bold' : 'text-gray-600 hover:text-emerald-700'}`}>
                        Blog ✍️
                    </button>
                    <button onClick={() => setCurrentPage('admin')} className={`transition-colors duration-300 ${currentPage === 'admin' ? 'text-emerald-700 font-bold' : 'text-gray-600 hover:text-emerald-700'}`}>
                        Admin Panel ⚙️
                    </button>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-white bg-opacity-95 p-6 flex flex-col items-center justify-center">
                    <button 
                        onClick={() => setIsMenuOpen(false)} 
                        className="absolute top-4 right-4 p-2 text-emerald-600 focus:outline-none"
                        aria-label="Close menu"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <nav className="flex flex-col space-y-6 pt-16 text-center font-bold text-2xl">
                        <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="text-gray-800 hover:text-emerald-700 transition-colors duration-300">Home</button>
                        <button onClick={() => { setCurrentPage('blog'); setIsMenuOpen(false); }} className="text-gray-800 hover:text-emerald-700 transition-colors duration-300">Blog ✍️</button>
                        <button onClick={() => { setCurrentPage('admin'); setIsMenuOpen(false); }} className="text-gray-800 hover:text-emerald-700 transition-colors duration-300">Admin Panel ⚙️</button>
                    </nav>
                     <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <UserCircle className="w-5 h-5 text-gray-400" />
                        <span>{userId}</span>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;