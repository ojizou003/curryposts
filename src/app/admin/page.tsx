'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import PostForm from '@/components/PostForm';
import AdminPostList from '@/components/AdminPostList';
import EditPostModal from '@/components/EditPostModal';

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 投稿データを取得
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        // 新着順に並べ替え
        const sortedPosts = data.posts.sort((a: Post, b: Post) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedPosts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('投稿の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPost = async (embedCode: string, prefecture: string) => {
    setIsFormLoading(true);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ embedCode, prefecture }),
      });

      if (response.ok) {
        alert('投稿を追加しました');
        await fetchPosts(); // 再読み込み
      } else {
        const error = await response.json();
        alert('追加に失敗しました: ' + error.error);
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('追加に失敗しました');
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setIsEditModalOpen(true);
  };

  const handleUpdatePost = async (postId: string, embedCode: string, prefecture: string) => {
    setIsFormLoading(true);
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ embedCode, prefecture }),
      });

      if (response.ok) {
        alert('投稿を更新しました');
        setIsEditModalOpen(false);
        await fetchPosts(); // 再読み込み
      } else {
        const error = await response.json();
        alert('更新に失敗しました: ' + error.error);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('更新に失敗しました');
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('本当に削除しますか？')) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('投稿を削除しました');
        await fetchPosts(); // 再読み込み
      } else {
        const error = await response.json();
        alert('削除に失敗しました: ' + error.error);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('削除に失敗しました');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          管理者ページ
        </h1>
        <p className="text-gray-600">
          カレー投稿の管理を行います
        </p>
        <div className="mt-4">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            ← トップページに戻る
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        <PostForm onSubmit={handleAddPost} isLoading={isFormLoading} />

        <AdminPostList
          posts={posts}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
        />
      </div>

      <EditPostModal
        post={editingPost}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdatePost}
        isLoading={isFormLoading}
      />
    </div>
  );
}