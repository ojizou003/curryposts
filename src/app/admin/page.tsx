'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminAuth from '@/components/AdminAuth';
import PostForm from '@/components/PostForm';
import AdminPostList from '@/components/AdminPostList';
import EditPostModal from '@/components/EditPostModal';

export default function AdminPage() {
  const { isAuthenticated, isLoading: authLoading, logout, timeRemaining } = useAdminAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 認証されている場合のみ投稿データを取得
  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

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

  // 未認証の場合は認証画面を表示
  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={() => {
      // 認証成功時にページをリロードして管理者画面を表示
      window.location.reload();
    }} />;
  }

  // 認証済みの場合は管理者画面を表示
  const formatTimeRemaining = (ms: number) => {
    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${minutes}分${seconds}秒`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              管理者ページ
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              カレー投稿の管理を行います
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              {process.env.NODE_ENV === 'production' ? '🔒 本番環境（閲覧専用）' : '🛠️ 開発環境（編集可能）'}
            </p>
          </div>

          {/* 認証情報とログアウト */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                セッション残り時間: {formatTimeRemaining(timeRemaining)}
              </p>
              <p className="text-xs text-coriander dark:text-coriander">
                認証済み
              </p>
            </div>
            <button
              onClick={logout}
              className="bg-spice text-white px-4 py-2 rounded-lg hover:bg-spice/90 dark:hover:bg-spice/80 transition-colors text-sm font-medium"
            >
              ログアウト
            </button>
          </div>
        </div>

        <div className="mt-4">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
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