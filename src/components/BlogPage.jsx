import React from 'react';
import BlogPostCard from './BlogPostCard';

function BlogPage({ posts, loading }) {
    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">LiveWell Blog ✍️</h2>
            <p className="text-center text-lg text-gray-600 mb-8">
                Explore a collection of articles on nutrition, health tips, and wellness.
            </p>
            {loading ? (
                <p className="text-center text-gray-500">Loading blog posts...</p>
            ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No blog posts to display yet. Check back soon! 🙏</p>
            )}
        </section>
    );
}

export default BlogPage;