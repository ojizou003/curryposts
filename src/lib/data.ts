import { Post, PostsData, CreatePostRequest, UpdatePostRequest } from '@/types';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'posts.json');

export function readPostsData(): PostsData {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(data) as PostsData;
  } catch (error) {
    console.error('Error reading posts data:', error);
    return { posts: [] };
  }
}

export function writePostsData(data: PostsData): void {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing posts data:', error);
    throw new Error('Failed to save posts data');
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function detectPlatform(embedCode: string): 'twitter' | 'instagram' {
  if (embedCode.includes('twitter-tweet') || embedCode.includes('platform.twitter.com')) {
    return 'twitter';
  }
  if (embedCode.includes('instagram-media') || embedCode.includes('www.instagram.com')) {
    return 'instagram';
  }
  // デフォルトはtwitter
  return 'twitter';
}

export function validateEmbedCode(embedCode: string): boolean {
  // 基本的な埋め込みコードのバリデーション
  if (!embedCode || embedCode.trim().length === 0) {
    return false;
  }

  // HTMLタグが含まれているかチェック
  return /<[^>]+>/.test(embedCode);
}

export function createPost(request: CreatePostRequest): Post {
  const id = generateId();
  const now = new Date().toISOString();
  const platform = detectPlatform(request.embedCode);

  return {
    id,
    embedCode: request.embedCode,
    prefecture: request.prefecture,
    platform,
    createdAt: now
  };
}

export function getAllPosts(): Post[] {
  const data = readPostsData();
  return data.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getPostsByPrefecture(prefecture?: string): Post[] {
  const posts = getAllPosts();
  if (!prefecture || prefecture === '') {
    return posts;
  }
  return posts.filter(post => post.prefecture === prefecture);
}

export function addPost(post: Post): void {
  const data = readPostsData();
  data.posts.push(post);
  writePostsData(data);
}

export function updatePost(id: string, updates: UpdatePostRequest): Post | null {
  const data = readPostsData();
  const postIndex = data.posts.findIndex(post => post.id === id);

  if (postIndex === -1) {
    return null;
  }

  const updatedPost = { ...data.posts[postIndex] };
  if (updates.embedCode) {
    updatedPost.embedCode = updates.embedCode;
    updatedPost.platform = detectPlatform(updates.embedCode);
  }
  if (updates.prefecture) {
    updatedPost.prefecture = updates.prefecture;
  }

  data.posts[postIndex] = updatedPost;
  writePostsData(data);

  return updatedPost;
}

export function deletePost(id: string): boolean {
  const data = readPostsData();
  const postIndex = data.posts.findIndex(post => post.id === id);

  if (postIndex === -1) {
    return false;
  }

  data.posts.splice(postIndex, 1);
  writePostsData(data);

  return true;
}