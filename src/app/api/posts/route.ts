import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, getPostsByPrefecture } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const prefecture = searchParams.get('prefecture');

    let posts;
    if (prefecture) {
      posts = getPostsByPrefecture(prefecture);
    } else {
      posts = getAllPosts();
    }

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { embedCode, prefecture } = body;

    if (!embedCode || !prefecture) {
      return NextResponse.json(
        { error: 'Embed code and prefecture are required' },
        { status: 400 }
      );
    }

    // バリデーション
    const { validateEmbedCode } = await import('@/lib/data');
    if (!validateEmbedCode(embedCode)) {
      return NextResponse.json(
        { error: 'Invalid embed code' },
        { status: 400 }
      );
    }

    const { createPost, addPost } = await import('@/lib/data');
    const newPost = createPost({ embedCode, prefecture });
    addPost(newPost);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}