'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';
import { PREFECTURES } from '@/types';
import { validatePostContent } from '@/lib/validation';

interface EditPostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (postId: string, embedCode: string, prefecture: string) => void;
  isLoading?: boolean;
}

export default function EditPostModal({
  post,
  isOpen,
  onClose,
  onUpdate,
  isLoading = false
}: EditPostModalProps) {
  const [embedCode, setEmbedCode] = useState('');
  const [prefecture, setPrefecture] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  // モーダルが開いたときに値を設定
  useEffect(() => {
    if (post) {
      setEmbedCode(post.embedCode);
      setPrefecture(post.prefecture);
      setErrors([]);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!post) return;

    // バリデーション
    const validationErrors = validatePostContent(embedCode);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!prefecture) {
      setErrors(['都道府県を選択してください']);
      return;
    }

    setErrors([]);
    onUpdate(post.id, embedCode, prefecture);
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              投稿を編集
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="editPrefecture" className="block text-sm font-medium text-gray-700 mb-2">
                都道府県 *
              </label>
              <select
                id="editPrefecture"
                value={prefecture}
                onChange={(e) => setPrefecture(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PREFECTURES.filter(pref => pref !== 'すべて').map(pref => (
                  <option key={pref} value={pref}>{pref}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="editEmbedCode" className="block text-sm font-medium text-gray-700 mb-2">
                埋め込みコード *
              </label>
              <textarea
                id="editEmbedCode"
                value={embedCode}
                onChange={(e) => setEmbedCode(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <ul className="text-sm text-red-800 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
              >
                {isLoading ? '更新中...' : '更新'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}