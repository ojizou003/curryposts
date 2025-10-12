'use client';

import { useEffect } from 'react';

interface EmbedScriptLoaderProps {
  embedCode: string;
}

export default function EmbedScriptLoader({ embedCode }: EmbedScriptLoaderProps) {
  useEffect(() => {
    // Twitter埋め込みの場合
    if (embedCode.includes('twitter-tweet')) {
      // Twitterスクリプトがまだ読み込まれていない場合のみ読み込む
      if (!document.querySelector('script[src*="platform.twitter.com/widgets.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.charset = 'utf-8';
        script.async = true;
        document.body.appendChild(script);
      } else {
        // すでにスクリプトがある場合は手動で再実行
        // if (window.twttr && window.twttr.widgets) {
        //   window.twttr.widgets.load();
        // }
      }
    }

    // Instagram埋め込みの場合
    if (embedCode.includes('instagram-media')) {
      // Instagramスクリプトがまだ読み込まれていない場合のみ読み込む
      if (!document.querySelector('script[src*="www.instagram.com/embed.js"]')) {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
      } else {
        // すでにスクリプトがある場合は手動で再実行
        // if (window.instgrm && window.instgrm.Embeds) {
        //   window.instgrm.Embeds.process();
        // }
      }
    }
  }, [embedCode]);

  // Type declarations for global window objects
  // useEffect(() => {
  //   (window as any).twttr = (window as any).twttr || { widgets: { load: () => {} } };
  //   (window as any).instgrm = (window as any).instgrm || { Embeds: { process: () => {} } };
  // }, []);

  return null;
}