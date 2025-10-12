export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          全国のカレー投稿ギャラリー
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          XとInstagramのカレーに関する投稿を集めたギャラリーサイト
        </p>
        <p className="text-sm text-gray-500">
          都道府県で絞り込んで、美味しそうなカレーを探そう！
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <label htmlFor="prefecture" className="block text-sm font-medium text-gray-700 mb-2">
              都道府県で絞り込み
            </label>
            <select
              id="prefecture"
              className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">全国</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            投稿数: 0件
          </div>
        </div>
      </div>

      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          🍛
        </div>
        <p className="text-gray-600 mb-2">
          まだ投稿がありません
        </p>
        <p className="text-sm text-gray-500">
          管理者ページから投稿を追加してください
        </p>
      </div>
    </div>
  );
}
