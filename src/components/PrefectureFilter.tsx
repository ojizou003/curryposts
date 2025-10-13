'use client';

import { PREFECTURES } from '@/types';

interface PrefectureFilterProps {
  selectedPrefecture: string;
  onPrefectureChange: (prefecture: string) => void;
  postCount: number;
}

export default function PrefectureFilter({
  selectedPrefecture,
  onPrefectureChange,
  postCount
}: PrefectureFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <label htmlFor="prefecture" className="block text-sm font-medium text-gray-700 mb-2">
            都道府県で絞り込み
          </label>
          <select
            id="prefecture"
            value={selectedPrefecture}
            onChange={(e) => onPrefectureChange(e.target.value)}
            className="w-full sm:w-48 bg-white text-gray-900 text-base sm:text-sm px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {PREFECTURES.map(prefecture => (
              <option key={prefecture} value={prefecture}>
                {prefecture}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm text-gray-500">
          投稿数: {postCount}件
        </div>
      </div>
    </div>
  );
}