export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-pepper-gray via-cumin-brown/90 to-spice text-white border-t border-spice/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {/* <span className="text-2xl">🍛</span> */}
            {/* <span className="text-xl font-semibold text-curry">カレー投稿ギャラリー</span> */}
          </div>
          <p className="text-curry text-sm leading-relaxed font-medium">
            © 2025 カレー投稿ギャラリー - 全国の美味しいカレーを共有
          </p>
          <p className="text-turmeric text-xs leading-relaxed max-w-md mx-auto">
            Xのカレー投稿を集めたギャラリーサイト。<br/>
            {/* 日本全国のカレーラバーの皆さん、美味しいカレーレポートをお待ちしています！ */}
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-yogurt-white/60 pt-4 border-t border-white/20">
            <span>🔥 スパイスフルなカレーを共有</span>
            <span>•</span>
            <span>📍 全国47都道府県</span>
            <span>•</span>
            <span>📱 ソーシャル投稿</span>
          </div>
        </div>
      </div>
    </footer>
  );
}