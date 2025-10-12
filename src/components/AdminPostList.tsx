'use client';

import { Post } from '@/types';
import AdminPostCard from './AdminPostCard';

interface AdminPostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (postId: string) => void;
}

export default function AdminPostList({ posts, onEdit, onDelete }: AdminPostListProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          投稿一覧
        </h2>
        <div className="text-center py-8 text-gray-500">
          <p>まだ投稿がありません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        投稿一覧 ({posts.length}件)
      </h2>

      <div className="space-y-6">
        {posts.map((post) => (
          <AdminPostCard
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}