import { Post, PostsData, CreatePostRequest, UpdatePostRequest } from '@/types';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'posts.json');

// メモリ内ストレージ（Vercel環境用）
let memoryStore: PostsData | null = null;

// Vercel環境判定
const isVercel = process.env.VERCEL === '1';
// 本番環境で書き込みを無効化する設定
const isProduction = process.env.NODE_ENV === 'production' && isVercel;

export function readPostsData(): PostsData {
  // Vercel環境では毎回ファイルから読み込んで最新データを取得
  if (isVercel) {
    try {
      const data = fs.readFileSync(DATA_PATH, 'utf8');
      const parsedData = JSON.parse(data) as PostsData;
      console.log('Reading from file in Vercel environment:', parsedData.posts.length, 'posts');

      // メモリストアを更新
      memoryStore = parsedData;
      return parsedData;
    } catch (error) {
      console.error('Error reading posts data in Vercel:', error);
      // ファイル読み込み失敗時はメモリストアを返す
      if (memoryStore) {
        console.log('Falling back to memory store:', memoryStore.posts.length, 'posts');
        return memoryStore;
      }
      return { posts: [] };
    }
  }

  // ローカル環境ではファイルから読み込み
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(data) as PostsData;
  } catch (error) {
    console.error('Error reading posts data:', error);
    return { posts: [] };
  }
}

export function writePostsData(data: PostsData): void {
  // 本番環境では書き込みを無効化
  if (isProduction) {
    console.log('Write operation disabled in production environment');
    throw new Error('Write operations are disabled in production. Please make changes locally and redeploy.');
  }

  // Vercel環境（開発環境）ではメモリ内に保存
  if (isVercel && !isProduction) {
    memoryStore = data;
    console.log('Data saved to memory store in Vercel development environment:', data.posts.length, 'posts');
    return;
  }

  // ローカル環境ではファイルに保存
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log('Data saved to file in local environment');
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