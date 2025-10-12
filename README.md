# カレー投稿ギャラリー

Xのカレーに関する投稿を集めたギャラリーサイトです。日本全国の美味しいカレー投稿を都道府県別に閲覧できます。

## 🍛 技術構成

- **フレームワーク**: Next.js 14 (App Router)
- **ホスティング**: Vercel
- **データ管理**: JSONファイル (/data/posts.json)
- **スタイリング**: Tailwind CSS
- **認証**: 管理者ページはパスワード保護（環境変数で設定）

## 🚀 機能

- 投稿ギャラリー表示
- 都道府県別フィルター機能
- 無限スクロール
- 管理者ページ（投稿登録・編集・削除）
- レスポンシブデザイン
- PWA対応

## 📋 開発環境セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd curryposts
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

```bash
cp .env.example .env.local
```

`.env.local` ファイルを編集して、管理者パスワードを設定してください：

```env
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
NEXT_PUBLIC_APP_NAME=カレー投稿ギャラリー
NEXT_PUBLIC_APP_DESCRIPTION=Xのカレーに関する投稿を集めたギャラリーサイト
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 🌐 Vercelデプロイ手順

### 🔧 **人間が行うべき手順**

#### 1. Vercelプロジェクトの作成
1. [Vercelダッシュボード](https://vercel.com/dashboard)にログイン
2. 「New Project」をクリック
3. GitHubリポジトリを連携
4. `curryposts` リポジトリを選択
5. Import Project

#### 2. 環境変数の設定（必須）
Vercelプロジェクト設定で以下の環境変数を設定してください：

```env
# 基本設定
NEXT_PUBLIC_ADMIN_PASSWORD=production_secure_password_here
NEXT_PUBLIC_APP_NAME=カレー投稿ギャラリー
NEXT_PUBLIC_APP_DESCRIPTION=Xのカレーに関する投稿を集めたギャラリーサイト

# デプロイ設定
VERCEL_URL=your-vercel-app-url.vercel.app
VERCEL_ENV=production

# API設定
API_BASE_URL=https://your-vercel-app-url.vercel.app/api

# SEO用
NEXT_PUBLIC_BASE_URL=https://your-vercel-app-url.vercel.app
```

**⚠️ 重要**: `NEXT_PUBLIC_ADMIN_PASSWORD` はセキュリティのため、必ず強力なパスワードを設定してください。

#### 3. カスタムドメインの設定（任意）
1. Vercelプロジェクトの「Settings」→「Domains」
2. カスタムドメインを追加
3. DNSレコードを設定

#### 4. SSL証明書の確認
Vercelが自動的にSSL証明書を設定しますが、有効か確認してください。

#### 5. 本番環境での動作確認
1. デプロイ完了後、サイトにアクセス
2. 管理者ページにログインできるか確認
3. 投稿機能が正常に動作するかテスト
4. モバイル表示の確認

#### 6. パフォーマンス監視設定（推奨）
- Vercel Analyticsの有効化
- Google Search Consoleへのサイト登録
- Google Analyticsの設定（任意）

### 🤖 自動化されている設定

- ✅ ビルド設定最適化
- ✅ SEOメタデータ設定
- ✅ PWA設定
- ✅ サイトマップ自動生成
- ✅ robots.txt設定
- ✅ パフォーマンス最適化

## 📂 プロジェクト構成

```
curryposts/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reactコンポーネント
│   ├── types/              # TypeScript型定義
│   └── lib/                # ユーティリティ関数
├── data/                   # JSONデータファイル
├── public/                 # 静的ファイル
├── docs/                   # ドキュメント
├── vercel.json            # Vercel設定
├── next.config.ts         # Next.js設定
├── tailwind.config.ts     # Tailwind CSS設定
└── package.json           # プロジェクト設定
```

## 🔧 APIエンドポイント

- `GET /api/posts` - 投稿一覧取得
- `POST /api/posts` - 新規投稿作成
- `PUT /api/posts/[id]` - 投稿更新
- `DELETE /api/posts/[id]` - 投稿削除

## 📝 管理者ページ

URL: `/admin`

設定したパスワードでログインしてください。

## 🛠️ 開発スクリプト

```bash
npm run dev          # 開発サーバー起動
npm run build        # 本番用ビルド
npm run start        # 本番サーバー起動
npm run lint         # ESLint実行
```

## 🔒 セキュリティについて

- 埋め込みコードのXSS対策を実装
- 入力値のサニタイズ
- 環境変数によるパスワード管理
- APIエンドポイントの保護

## 📄 ライセンス

MIT License
