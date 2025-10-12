'use client';

import { useEffect, useRef, useState } from 'react';

interface SafeEmbedProps {
  embedCode: string;
  className?: string;
}

// Twitterウィジェットの型定義
interface TwitterWidgets {
  load: () => void;
}

interface TwitterWidget {
  widgets: TwitterWidgets;
}

// グローバルWindowオブジェクトの型拡張
declare global {
  interface Window {
    twttr?: TwitterWidget;
  }
}

export default function SafeEmbed({ embedCode, className = '' }: SafeEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !embedCode) return;

    const container = containerRef.current;

    // 埋め込みコードをクリーンアップ
    const cleanEmbedCode = embedCode
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // コンテナに埋め込みコードを挿入
    container.innerHTML = cleanEmbedCode;

    // スクリプトを動的に実行
    const scripts = container.querySelectorAll('script');
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    setIsLoaded(true);

    // Twitterの埋め込みを再初期化
    setTimeout(() => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    }, 100);
  }, [embedCode]);

  // Type declarations and global initialization
  useEffect(() => {
    // Twitterグローバル初期化
    window.twttr = window.twttr || { widgets: { load: () => {} } };
  }, []);

  return (
    <div className={`embed-container ${className}`}>
      <div ref={containerRef} className="embed-content" />
      {!isLoaded && (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
          <div className="text-gray-500 text-sm">
            読み込み中...
          </div>
        </div>
      )}
    </div>
  );
}