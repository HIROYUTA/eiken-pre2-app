# 英検準2級 AI合格アプリ

AIが徹底的にサポートする英検準2級合格アプリ。

## 機能

- 📝 **単語学習**: 1500語の英検準2級頻出単語をフラッシュカード方式で学習
- 💬 **熟語学習**: 500個の頻出熟語を学習
- 📚 **文法学習**: 8つの文法カテゴリを詳細に学習
- 📖 **長文読解**: 100問以上の読解問題に挑戦
- 🎧 **リスニング**: 速度変更・シャドーイング機能付きリスニング
- ✍️ **ライティング**: AIが即座に添削
- 🏆 **模試**: 本番形式の模試で実力測定
- 🤖 **AI先生**: 24時間対応のAIチャット
- 📊 **学習分析**: 詳細な分析で弱点を克服
- 🎮 **ゲーミフィケーション**: EXP・レベル・バッジ・実績システム

## 技術スタック

- **フロントエンド**: Next.js 15, TypeScript, TailwindCSS
- **UI**: shadcn/ui, Framer Motion
- **バックエンド**: Supabase (認証・DB・ストレージ)
- **AI**: OpenAI API (GPT-4)
- **デプロイ**: Vercel

## セットアップ

### 環境変数の設定

`.env.local`ファイルを作成し、以下を設定してください：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 依存関係のインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

### ビルド

```bash
npm run build
npm start
```

## プロジェクト構成

```
src/
├── app/              # Next.js App Router
├── components/       # Reactコンポーネント
├── lib/             # ユーティリティ
├── hooks/           # カスタムフック
├── stores/          # Zustandストア
└── types/           # TypeScript型定義
```

## データベースセットアップ

SupabaseのSQLエディタで以下のテーブルを作成してください：

詳細は `SYSTEM_DESIGN.md` を参照してください。

## ライセンス

MIT License
