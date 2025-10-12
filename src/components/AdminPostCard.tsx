'use client';

import { Post } from '@/types';
import SafeEmbed from './SafeEmbed';

interface AdminPostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (postId: string) => void;
}

export default function AdminPostCard({ post, onEdit, onDelete }: AdminPostCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-spice/20 mb-4">
      {/* ヘッダー部分 */}
      <div className="bg-gradient-to-r from-spice/5 to-curry/5 p-4 border-b border-spice/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg">📍</span>
              <span className="text-sm font-semibold text-pepper-gray">
                {post.prefecture}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-700 border border-blue-300/50">
              <span className="text-sm">𝕏</span>
              <span>X</span>
            </span>
            <span className="text-xs text-cumin-brown/60 bg-yogurt-white/80 px-2 py-1 rounded-full border border-curry/20">
              {new Date(post.createdAt).toLocaleString('ja-JP', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>

          {/* アクションボタン */}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(post)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-coriander bg-coriander/10 hover:bg-coriander/20 border border-coriander/30 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              編集
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-spice bg-spice/10 hover:bg-spice/20 border border-spice/30 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              削除
            </button>
          </div>
        </div>
      </div>

      {/* 埋め込みコンテンツ部分 */}
      <div className="p-4 bg-gradient-to-br from-white to-yogurt-white/30">
        <div className="rounded-lg overflow-hidden border border-spice/10">
          <SafeEmbed embedCode={post.embedCode} />
        </div>
      </div>

      {/* フッター部分 */}
      <div className="bg-gradient-to-r from-curry/5 to-spice/5 px-4 py-3 border-t border-spice/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-cumin-brown/60">
            <span>🔧</span>
            <span>管理者操作</span>
          </div>
          <div className="flex items-center space-x-3 text-xs text-cumin-brown/50">
            <span>ID: {post.id.substring(0, 8)}...</span>
          </div>
        </div>
      </div>
    </div>
  );
}