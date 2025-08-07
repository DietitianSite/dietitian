
// src/App.jsx
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { collection, query, onSnapshot } from 'firebase/firestore';

// Import all components from the components folder
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ServicePage from './components/ServicePage';
import BlogPage from './components/BlogPage';
import AdminPanel from './components/AdminPanel';
import NotFoundPage from './components/NotFoundPage';

// Import Firebase services
import { db, auth } from './firebase';

// Data for services to easily manage and display them.
const serviceData = {
    'meal-plans': {
        title: "Personalized Meal Plans",
        description: "Are you tired of bland, boring meals? I believe that healthy eating should be delicious and exciting! My personalized meal plans are designed to fit your unique dietary needs, health goals, and lifestyle. I'll work with you to create a customized plan that ensures you're getting all the right nutrients while enjoying every bite. Let's make healthy eating a joy, not a chore! 🥗",
        icon: <Utensils className="w-8 h-8 text-emerald-700" />,
        image: "[https://placehold.co/600x400/e5e7eb/4b5563?text=Personalized+Meal+Plan](https://placehold.co/600x400/e5e7eb/4b5563?text=Personalized+Meal+Plan)"
    },
    'counseling': {
        title: "Nutritional Counseling",
        description: "Navigating the world of nutrition can be overwhelming. As your registered dietitian, I'm here to provide you with evidence-based guidance and unwavering support. In our one-on-one sessions, we'll discuss your health concerns, set realistic goals, and create a roadmap to a healthier you. Whether you're looking to manage a specific condition or simply improve your overall well-being, I'll be your partner every step of the way. 🗣️",
        icon: <Book className="w-8 h-8 text-emerald-700" />,
        image: "[https://placehold.co/600x400/d1d5db/333333?text=Nutritional+Counseling](https://placehold.co/600x400/d1d5db/333333?text=Nutritional+Counseling)"
    },
    'paediatric-nutrition': {
        title: "Paediatric Nutrition",
        description: "Feeding your little one is one of the most important jobs you have as a parent. From picky eaters to food allergies, I provide expert guidance on childhood nutrition to ensure your children get the right nutrients to grow, thrive, and reach their full potential. My goal is to empower you with the knowledge and tools to foster a positive relationship with food for your entire family. 👶🍏",
        icon: <ClipboardList className="w-8 h-8 text-emerald-700" />,
        image: "[https://placehold.co/600x400/a0aec0/ffffff?text=Paediatric+Nutrition](https://placehold.co/600x400/a0aec0/ffffff?text=Paediatric+Nutrition)"
    }
};

// --- Main App Component ---
function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [currentService, setCurrentService] = useState(null); // New state for the current service page
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [loadingPosts, setLoadingPosts] = useState(true);

    // 1. Listen for auth state changes
    useEffect(() => {
        const setupAuth = async () => {
            try {
                // Sign in anonymously to enable read/write access based on your security rules
                // In a real app, you'd have proper user authentication here.
                await signInAnonymously(auth);

                // Listen for authentication state changes
                const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                    setUser(currentUser);
                    setIsAuthReady(true);
                });

                // Clean up the listener on component unmount
                return () => unsubscribe();
            } catch (error) {
                console.error("Firebase authentication failed:", error);
                setIsAuthReady(true); // Ensure app can still run even if auth fails
            }
        };

        setupAuth();
    }, []);

    // 2. Fetch blog posts in real-time after authentication is ready
    useEffect(() => {
        if (!isAuthReady || !db) return;

        setLoadingPosts(true);
        const postsCollection = collection(db, 'blog-posts');
        const q = query(postsCollection);

        // onSnapshot listens for real-time changes
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedPosts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            fetchedPosts.sort((a, b) => b.createdAt - a.createdAt);
            setPosts(fetchedPosts);
            setLoadingPosts(false);
        }, (error) => {
            console.error("Error fetching posts:", error);
            setLoadingPosts(false);
        });

        return () => unsubscribe();
    }, [isAuthReady]);

    const handleServiceClick = (serviceId) => {
        setCurrentPage('service');
        setCurrentService(serviceId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'blog':
                return <BlogPage posts={posts} loading={loadingPosts} />;
            case 'admin':
                return <AdminPanel db={db} user={user} posts={posts} loading={loadingPosts} />;
            case 'service':
                const service = serviceData[currentService];
                if (service) {
                    return <ServicePage {...service} />;
                }
                return <NotFoundPage />;
            case 'home':
            default:
                return <HomePage onServiceClick={handleServiceClick} serviceData={serviceData} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
            <Header setCurrentPage={setCurrentPage} currentPage={currentPage} user={user} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}

export default App;