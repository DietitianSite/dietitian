import React from 'react';
import ServiceCard from './Service';

function HomePage({ onServiceClick, serviceData }) {
    // Helper function to extract service IDs from the serviceData object
    const serviceIds = Object.keys(serviceData);
    
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col items-center">
                    <img src="https://placehold.co/150x150/d1d5db/333333?text=Louisa" alt="Louisa's profile" className="rounded-full w-40 h-40 mb-6 object-cover shadow-lg transform transition-transform duration-300 hover:scale-110" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">LiveWell by Louisa 💚</h1>
                    <p className="text-xl md:text-2xl font-medium text-emerald-600 mb-4">Ghanaian Registered Dietitian & Wellness Advocate</p>
                    <p className="text-md md:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        Hello! 👋 I'm Louisa, your partner in achieving optimal health through evidence-based nutrition. I'm passionate about helping families, especially children, build a foundation for a healthy, happy life. Let's start this journey together! 💪
                    </p>
                    <a onClick={() => onServiceClick('counseling')} className="bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-500 transition-transform transform hover:scale-105 duration-300 cursor-pointer">
                        Book a Consultation 📅
                    </a>
                </div>
            </div>

            <div id="about" className="bg-white py-16 md:py-24 border-t border-gray-200 mt-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">About Me</h2>
                    <div className="flex flex-col md:flex-row items-center md:space-x-12">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <img src="https://placehold.co/600x400/e5e7eb/4b5563?text=Louisa+and+a+client" alt="Louisa working with a client" className="rounded-lg shadow-xl w-full h-auto object-cover transform transition-transform duration-300 hover:scale-105" />
                        </div>
                        <div className="md:w-1/2">
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                My journey began with a deep passion for understanding how food impacts our bodies and our lives. I believe that good nutrition is the cornerstone of a vibrant, healthy community.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                My specialization and true passion lies in <span className="font-semibold text-emerald-600">paediatric nutrition</span> 🍏. I am dedicated to helping parents navigate the complexities of feeding their children, ensuring they get the right nutrients to grow, thrive, and reach their full potential.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="services" className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">My Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {serviceIds.map((serviceId) => (
                            <ServiceCard
                                key={serviceId}
                                onClick={() => onServiceClick(serviceId)}
                                {...serviceData[serviceId]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomePage;