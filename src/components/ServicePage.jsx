import React, { useState } from 'react';

function ServicePage({ title, description, image }) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', service: title });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('Thank you for reaching out! Your message has been sent. We will get back to you shortly. 🙏');
        console.log("Service Inquiry Submitted:", formData);
        setFormData({ name: '', email: '', message: '', service: title });
    };

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:space-x-12 items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">{description}</p>
                        <img src={image} alt={title} className="rounded-lg shadow-xl w-full h-auto object-cover transform transition-transform duration-300 hover:scale-105" />
                    </div>
                    <div className="md:w-1/2">
                         <div className="bg-gray-100 p-8 md:p-12 rounded-xl shadow-lg">
                            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Inquire about this service</h2>
                            {message && (
                                <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center">
                                    {message}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3" required />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
                                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3" required></textarea>
                                </div>
                                <input type="hidden" name="service" value={formData.service} />
                                <div className="text-center">
                                    <button type="submit" className="bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-500 transition-transform transform hover:scale-105 duration-300">
                                        Send Inquiry 🚀
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServicePage;