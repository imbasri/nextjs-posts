export const getPosts = async () => {
    const response = await fetch('/api/posts');
    const data = await response.json();
    return data.data;
};

export const createPost = async (title, content) => {
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });
    const data = await response.json();
    if (response.ok) {
        return data.data;
    } else {
        throw new Error('Failed to create post');
    }
};

export const updatePost = async (id, title, content) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });
    if (!response.ok) {
        throw new Error('Failed to update post');
    }
    const data = await response.json();
    return data.data;
};

export const deletePost = async (id) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    if (response.ok) {
        return data.data;
    } else {
        throw new Error('Failed to delete post');
    }
};
