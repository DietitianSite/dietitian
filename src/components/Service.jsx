import React from 'react';

function ServiceCard({ icon, title, description, onClick }) {
    return (
        <div onClick={onClick} className="bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-center bg-emerald-100 rounded-full w-16 h-16 mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default ServiceCard;