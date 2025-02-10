import { NextResponse } from 'next/server';

import prisma from '../../../../../prisma/client';

export async function GET(_, { params }) {
    const id = parseInt(params.id);

    if (isNaN(id)) {
        return NextResponse.json(
            {
                message: 'Post not found',
            },
            { status: 404 }
        );
    }

    const post = await prisma.post.findUnique({
        where: {
            id,
        },
    });

    if (!post) {
        return NextResponse.json(
            {
                message: 'Post not found',
            },
            { status: 404 }
        );
    }

    return NextResponse.json(
        {
            success: true,
            message: 'Post found',
            data: post,
        },
        { status: 200 }
    );
}

export async function PATCH(request, { params }) {
    // get id from params
    const id = parseInt(params.id);

    if (isNaN(id)) {
        return NextResponse.json(
            {
                message: 'Invalid post ID',
            },
            { status: 400 }
        );
    }

    // get request body
    const { title, content } = await request.json();

    // update post
    const post = await prisma.post.update({
        where: {
            id,
        },
        data: {
            title,
            content,
            updatedAt: new Date(),
        },
    });

    return NextResponse.json(
        {
            success: true,
            message: 'Post updated successfully',
            data: post,
        },
        { status: 200 }
    );
}

export async function DELETE(_, { params }) {
    const id = parseInt(params.id);

    if (isNaN(id)) {
        return NextResponse.json(
            {
                message: 'Invalid post ID',
            },
            { status: 400 }
        );
    }
    await prisma.post.delete({
        where: {
            id,
        },
    });
    return NextResponse.json(
        {
            success: true,
            message: 'Post deleted successfully',
        },
        { status: 200 }
    );
}
