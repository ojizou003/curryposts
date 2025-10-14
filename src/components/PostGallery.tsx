'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Post } from '@/types';
import PostCard from './PostCard';

interface PostGalleryProps {
  posts: Post[];
  isLoading: boolean;
}

export default function PostGallery({ posts, isLoading }: PostGalleryProps) {
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const postsPerPage = 6;
  const observerRef = useRef<HTMLDivElement>(null);

  // 投稿リストが変更されたらリセット
  useEffect(() => {
    setDisplayedPosts(posts.slice(0, postsPerPage));
    setPage(1);
    setIsLoadingMore(false);
  }, [posts]);

  // 無限スクロールの処理
  const loadMore = useCallback(() => {
    if (isLoadingMore || displayedPosts.length >= posts.length) return;

    setIsLoadingMore(true);

    // 少し遅延を入れて視覚的なフィードバックを提供
    setTimeout(() => {
      const nextPage = page + 1;
      const newPosts = posts.slice(0, nextPage * postsPerPage);
      setDisplayedPosts(newPosts);
      setPage(nextPage);
      setIsLoadingMore(false);
    }, 300);
  }, [page, posts, displayedPosts.length, isLoadingMore]);

  // IntersectionObserverの設定
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && displayedPosts.length < posts.length && !isLoadingMore) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
      observer.disconnect();
    };
  }, [loadMore, displayedPosts.length, posts.length, isLoadingMore]);

  const hasMore = displayedPosts.length < posts.length;

  if (isLoading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">読み込み中...</span>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4 text-6xl">
          🍛
        </div>
        <p className="text-gray-600 mb-4">
          まだ投稿がありません
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* 無限スクロールトリガー */}
      {hasMore && (
        <div
          ref={observerRef}
          className="py-8 text-center"
        >
          {isLoadingMore ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600 text-sm">読み込み中...</span>
            </div>
          ) : (
            <div className="text-gray-400 text-sm">
              スクロールしてもっと見る
            </div>
          )}
        </div>
      )}
    </div>
  );
}