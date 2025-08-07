import React from 'react';

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Oops! We couldn't find that page. 🤷‍♂️</p>
            <a href="#" className="bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-500 transition-transform transform hover:scale-105 duration-300">
                Return Home
            </a>
        </div>
    );
}

export default NotFoundPage;