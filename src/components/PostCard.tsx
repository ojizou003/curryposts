'use client';

import { Post } from '@/types';
import SafeEmbed from './SafeEmbed';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mb-6 border border-spice/10 hover:border-spice/30">
      {/* ヘッダー部分 */}
      <div className="bg-gradient-to-r from-spice/5 to-curry/5 p-4 border-b border-spice/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">📍</span>
            <span className="text-sm font-semibold text-pepper-gray">
              {post.prefecture}
            </span>
          </div>
          <span className="text-xs text-cumin-brown/60 bg-yogurt-white/80 px-2 py-1 rounded-full border border-curry/20">
            {new Date(post.createdAt).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* プラットフォームバッジ */}
        <div className="flex items-center gap-2">
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
            <span>🍛</span>
            <span>美味しいカレーレポート</span>
          </div>
        </div>
      </div>
    </div>
  );
}