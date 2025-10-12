import { NextRequest, NextResponse } from 'next/server';
import { updatePost, deletePost, validateEmbedCode } from '@/lib/data';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { embedCode, prefecture } = body;

    // バリデーション
    if (embedCode && !validateEmbedCode(embedCode)) {
      return NextResponse.json(
        { error: 'Invalid embed code' },
        { status: 400 }
      );
    }

    const updates: Partial<{ embedCode: string; prefecture: string }> = {};
    if (embedCode) updates.embedCode = embedCode;
    if (prefecture) updates.prefecture = prefecture;

    const updatedPost = updatePost(id, updates);

    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deletePost(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}