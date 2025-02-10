'use client';
import { useState } from 'react';

export default function ListPost({ id, title, content, onUpdate = async () => {}, onDelete = () => {} }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editContent, setEditContent] = useState(content);

    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleCancel = () => {
        setEditTitle(title);
        setEditContent(content);
        setIsEditing(false);
    };

    return (
        <div className='mb-4' key={id}>
            {isEditing ? (
                <div>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type='text'
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                </div>
            ) : (
                <>
                    <h3 className='text-xl font-bold dark:text-black'>{title}</h3>
                    <p className='text-gray-700 text-base dark:text-black'>{content}</p>
                </>
            )}

            <div className='flex items-center justify-between mt-4'>
                <div className='flex space-x-2'>
                    {isEditing ? (
                        <button
                            className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            type='button'
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    ) : (
                        <button
                            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            type='button'
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                    )}
                    {isEditing && (
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            type='button'
                            onClick={async () => {
                                await onUpdate({ id, title: editTitle, content: editContent });
                                setIsEditing(false);
                            }}
                        >
                            Update
                        </button>
                    )}
                    <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='button'
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
