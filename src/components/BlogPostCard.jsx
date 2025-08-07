import React from 'react';

function BlogPostCard({ post }) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img src={post.imageUrl || "https://placehold.co/600x350/a0aec0/ffffff?text=Blog+Image"} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{new Date(post.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-600">{post.content.substring(0, 150)}...</p>
            </div>
        </div>
    );
}

export default BlogPostCard;