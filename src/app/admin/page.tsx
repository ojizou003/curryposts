import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          管理者ページ
        </h1>
        <p className="text-gray-600">
          カレー投稿の管理を行います
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          新規投稿追加
        </h2>
        <div className="text-center py-8 text-gray-500">
          <p>投稿追加機能は現在開発中です</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          投稿一覧
        </h2>
        <div className="text-center py-8 text-gray-500">
          <p>まだ投稿がありません</p>
          <Link
            href="/"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            トップページに戻る →
          </Link>
        </div>
      </div>
    </div>
  );
}