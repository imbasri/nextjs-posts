'use client';

import ListPost from '@/components/ListPost';
import { createPost, getPosts, deletePost, updatePost } from '@/utils/postApi';
import { useEffect, useState } from 'react';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPosts();
            setPosts(data);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            setTitle('');
            setContent('');
            return;
        }
        try {
            await createPost(title, content);
            const data = await getPosts();
            setPosts(data);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    const handleUpdate = async (data) => {
        const { id, title, content } = data;
        try {
            await updatePost(id, title, content);
            const data = await getPosts();
            setPosts(data);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };
    const handleDeletePost = async (id) => {
        try {
            await deletePost(id);
            const data = await getPosts();
            setPosts(data);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    return (
        <div>
            <div className='flex flex-col items-center justify-center min-h-screen py-2'>
                <h1 className='text-4xl font-bold mb-4'>CRUD Posts</h1>
                <form className='w-full max-w-sm'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>
                            Title
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='title'
                            type='text'
                            placeholder='Enter post title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required={true}
                        />
                        {title?.length === 0 && (
                            <p className='text-red-500 text-xs italic'>Please fill out this field.</p>
                        )}
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='content'>
                            Content
                        </label>
                        <textarea
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='content'
                            placeholder='Enter post content'
                            value={content}
                            required={true}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        {content?.length === 0 && (
                            <p className='text-red-500 text-xs italic'>Please fill out this field.</p>
                        )}
                    </div>
                    <div className='flex items-center justify-between'>
                        <button
                            onClick={handleSubmit}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            type='button'
                        >
                            Create Post
                        </button>
                    </div>
                </form>

                {/* list */}
                <div className='w-full max-w-4xl mt-8'>
                    <h2 className='text-2xl font-bold mb-4'>Posts</h2>
                    <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                        {posts &&
                            posts.map((post) => (
                                <ListPost
                                    key={post.id}
                                    id={post.id}
                                    title={post.title}
                                    content={post.content}
                                    onUpdate={(data) => handleUpdate(data)}
                                    onDelete={() => handleDeletePost(post.id)}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
