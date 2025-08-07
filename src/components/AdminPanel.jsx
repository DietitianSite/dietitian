import React, { useState } from 'react';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Plus, Edit, Trash, UserCircle } from 'lucide-react';

function AdminPanel({ db, user, posts, loading }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [editingPostId, setEditingPostId] = useState(null);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!user || !user.uid) {
            setMessage('You must be authenticated to perform this action.');
            return;
        }

        const newPost = {
            title,
            content,
            imageUrl,
            createdAt: Date.now()
        };

        try {
            if (editingPostId) {
                const docRef = doc(db, `blog-posts`, editingPostId);
                await updateDoc(docRef, newPost);
                setMessage('Post updated successfully! ✨');
            } else {
                const collectionRef = collection(db, `blog-posts`);
                await addDoc(collectionRef, newPost);
                setMessage('New post added successfully! 🎉');
            }
            setTitle('');
            setContent('');
            setImageUrl('');
            setEditingPostId(null);
            setShowForm(false);
        } catch (error) {
            console.error("Error writing document: ", error);
            setMessage('Error: Could not save post. Please try again.');
        }
    };

    const handleEditClick = (post) => {
        setTitle(post.title);
        setContent(post.content);
        setImageUrl(post.imageUrl);
        setEditingPostId(post.id);
        setShowForm(true);
    };

    const handleDeleteClick = async (postId) => {
        if (!user || !user.uid) {
            setMessage('You must be authenticated to perform this action.');
            return;
        }
        
        const isConfirmed = window.confirm("Are you sure you want to delete this post?");
        if (isConfirmed) {
            try {
                const docRef = doc(db, `blog-posts`, postId);
                await deleteDoc(docRef);
                setMessage('Post deleted successfully! 🗑️');
            } catch (error) {
                console.error("Error deleting document: ", error);
                setMessage('Error: Could not delete post.');
            }
        }
    };
    
    if (!user) {
        return (
            <div className="container mx-auto px-4 py-16 md:py-24 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Admin Panel Access Denied 🔒</h2>
                <p className="text-gray-600 text-lg">
                    You must be a logged-in user to view this panel.
                </p>
                <p className="text-gray-600 mt-4">
                    On a local environment, you would need to set up proper authentication (e.g., email/password) to manage posts.
                </p>
            </div>
        );
    }

    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Admin Panel ⚙️</h2>

            {message && (
                <div className="bg-emerald-100 text-emerald-800 p-4 rounded-lg mb-6 text-center">
                    {message}
                </div>
            )}
            
            <div className="flex justify-end mb-6">
                <button 
                    onClick={() => { setShowForm(!showForm); setEditingPostId(null); setTitle(''); setContent(''); setImageUrl(''); }} 
                    className="bg-emerald-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-emerald-500 transition-colors duration-300 flex items-center space-x-2"
                >
                    {editingPostId ? 'Cancel Edit' : 'Add New Post'} <Plus className="w-5 h-5" />
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg mb-12">
                    <h3 className="text-2xl font-bold mb-6">{editingPostId ? 'Edit Post' : 'Create New Post'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
                            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3" required />
                        </div>
                        <div>
                            <label htmlFor="imageUrl" className="block text-lg font-medium text-gray-700">Image URL</label>
                            <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3" placeholder="[https://placehold.co/600x350/a0aec0/ffffff?text=Blog+Image](https://placehold.co/600x350/a0aec0/ffffff?text=Blog+Image)" />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-lg font-medium text-gray-700">Content</label>
                            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows="6" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3" required></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-500 transition-transform transform hover:scale-105 duration-300">
                                {editingPostId ? 'Update Post' : 'Publish Post'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
            
            <h3 className="text-2xl font-bold mb-6">Existing Posts</h3>
            {loading ? (
                <p className="text-center text-gray-500">Loading posts...</p>
            ) : posts.length > 0 ? (
                <div className="space-y-6">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
                            <div>
                                <h4 className="text-xl font-semibold">{post.title}</h4>
                                <p className="text-sm text-gray-500">ID: {post.id}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => handleEditClick(post)} className="p-2 text-blue-500 hover:text-blue-700 rounded-full transition-colors duration-200" aria-label="Edit Post">
                                    <Edit className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleDeleteClick(post.id)} className="p-2 text-red-500 hover:text-red-700 rounded-full transition-colors duration-200" aria-label="Delete Post">
                                    <Trash className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No posts found.</p>
            )}
        </section>
    );
}

export default AdminPanel;