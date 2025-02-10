// import next request and response types
import { NextResponse } from 'next/server';
// import prisma client
import prisma from '../../../../prisma/client';

export async function GET() {
    // get all posts
    const posts = await prisma.post.findMany();
    
    if (!posts || posts.length === 0) {
        return NextResponse.json({ message: 'No posts found' }, { status: 404 });
    }

    return NextResponse.json(
        {
            success: true,
            message: 'Posts found',
            data: posts,
        },
        { status: 200 }
    );
}

export async function POST(request){
    // get request body 
    const { title,content} = await request.json()
    // create post
    const post = await prisma.post.create({
        data:{
            title,
            content
        }
    })
    // return response
    return NextResponse.json(
        {
            success: true,
            message: 'Post created',
            data: post,
        },
        { status: 201 }
    );

}
