'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';
import PrefectureFilter from '@/components/PrefectureFilter';
import PostGallery from '@/components/PostGallery';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>('すべて');
  const [isLoading, setIsLoading] = useState(true);

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
        setPosts(data.posts);
        setFilteredPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 都道府県フィルター処理
  useEffect(() => {
    if (selectedPrefecture === 'すべて') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.prefecture === selectedPrefecture));
    }
  }, [selectedPrefecture, posts]);

  const handlePrefectureChange = (prefecture: string) => {
    setSelectedPrefecture(prefecture);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          全国のカレー🍛大集合！！！
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Xのカレーに関する投稿を集めたギャラリーサイト
        </p>
        <p className="text-sm text-gray-500">
          都道府県で絞り込んで、美味しそうなカレーを探そう！
        </p>
      </div> */}

      <PrefectureFilter
        selectedPrefecture={selectedPrefecture}
        onPrefectureChange={handlePrefectureChange}
        postCount={filteredPosts.length}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <PostGallery posts={filteredPosts} isLoading={isLoading} />
      )}
    </div>
  );
}
