'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';
import PostCard from './PostCard';
import InfiniteScroll from './InfiniteScroll';

interface PostGalleryProps {
  posts: Post[];
  isLoading: boolean;
}

export default function PostGallery({ posts, isLoading }: PostGalleryProps) {
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const postsPerPage = 6;

  useEffect(() => {
    setDisplayedPosts(posts.slice(0, postsPerPage));
    setPage(1);
  }, [posts]);

  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newPosts = posts.slice(0, nextPage * postsPerPage);
      setDisplayedPosts(newPosts);
      setPage(nextPage);
      setIsLoadingMore(false);
    }, 500); // 読み込みアニメーション用の遅延
  };

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
        {/* <h3 className="text-lg font-medium text-gray-900 mb-2">
          投稿がありません
        </h3> */}
        <p className="text-gray-600 mb-4">
          まだ投稿がありません
        </p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      hasMore={hasMore}
      isLoading={isLoadingMore}
      onLoadMore={loadMore}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </InfiniteScroll>
  );
}