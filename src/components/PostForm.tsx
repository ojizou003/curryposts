'use client';

import { useState } from 'react';
import { PREFECTURES } from '@/types';
import { validatePostContent } from '@/lib/validation';

interface PostFormProps {
  onSubmit: (embedCode: string, prefecture: string) => void;
  isLoading?: boolean;
}

export default function PostForm({ onSubmit, isLoading = false }: PostFormProps) {
  const [embedCode, setEmbedCode] = useState('');
  const [prefecture, setPrefecture] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
    onSubmit(embedCode, prefecture);
  };

  const handleReset = () => {
    setEmbedCode('');
    setPrefecture('');
    setErrors([]);
    setIsPreview(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        新規投稿追加
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="prefecture" className="block text-sm font-medium text-gray-700 mb-2">
            都道府県 *
          </label>
          <select
            id="prefecture"
            value={prefecture}
            onChange={(e) => setPrefecture(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">選択してください</option>
            {PREFECTURES.filter(pref => pref !== 'すべて').map(pref => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="embedCode" className="block text-sm font-medium text-gray-700 mb-2">
            埋め込みコード *
          </label>
          <textarea
            id="embedCode"
            value={embedCode}
            onChange={(e) => setEmbedCode(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Xの埋め込みコードを貼り付けてください"
          />
          <p className="text-xs text-gray-500 mt-1">
            X: ポストの「...」メニュー → 「ポストを埋め込む」
          </p>
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

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {isLoading ? '追加中...' : '投稿を追加'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            リセット
          </button>
          {/* <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            {isPreview ? 'プレビューを隠す' : 'プレビュー'}
          </button> */}
        </div>
      </form>

      {isPreview && embedCode && (
        <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">プレビュー:</h3>
          <div
            className="embed-container"
            dangerouslySetInnerHTML={{ __html: embedCode }}
          />
        </div>
      )}
    </div>
  );
}