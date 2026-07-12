# 英検準2級 AI合格アプリ - システム設計書

## 1. プロジェクト概要

### 1.1 目的
英検準2級の受験者が最短で合格できる学習アプリを開発する。

### 1.3 ターゲットユーザー
- 英検準2級初受験者
- 過去に不合格だった者
- 効率的に学習したい学生・社会人

### 1.4 プラットフォーム
- Webアプリケーション（PWA対応）
- iOS/Androidブラウザ対応
- PC対応

---

## 2. 技術スタック

### 2.1 フロントエンド
| カテゴリ | 技術 | 用途 |
|---------|------|------|
| フレームワーク | Next.js 15 (App Router) | SSR/SSG/ISR |
| 言語 | TypeScript 5 | 型安全な開発 |
| スタイリング | TailwindCSS 4 | ユーティリティファーストCSS |
| UIコンポーネント | shadcn/ui | Apple風コンポーネント |
| 状態管理 | Zustand | 軽量ステート管理 |
| フォーム | React Hook Form + Zod | フォーム管理・バリデーション |
| アニメーション | Framer Motion | モーションデザイン |
| PWA | next-pwa | プログレッシブWebアプリ |

### 2.2 バックエンド
| カテゴリ | 技術 | 用途 |
|---------|------|------|
| BaaS | Supabase | 認証・DB・ストレージ |
| AI | OpenAI API | 文法解説・添削・質問回答 |
| APIルート | Next.js API Routes | サーバーサイド処理 |

### 2.3 インフラ
| カテゴリ | 技術 | 用途 |
|---------|------|------|
| デプロイ | Vercel | ホスティング |
| CDN | Vercel Edge | グローバル配信 |
| 監視 | Vercel Analytics | パフォーマンス監視 |

---

## 3. ディレクトリ構成

```
eiken-pre2-app/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # 認証レイアウトグループ
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/              # メインレイアウトグループ
│   │   │   ├── page.tsx              # ホーム画面
│   │   │   ├── words/                # 単語学習
│   │   │   ├── idioms/               # 熟語学習
│   │   │   ├── grammar/              # 文法学習
│   │   │   ├── reading/              # 長文読解
│   │   │   ├── listening/            # リスニング
│   │   │   ├── writing/              # ライティング
│   │   │   ├── mock-exam/            # 模試
│   │   │   ├── ai-tutor/             # AI先生
│   │   │   ├── analytics/            # 学習分析
│   │   │   ├── ranking/             # ランキング
│   │   │   ├── profile/              # マイページ
│   │   │   └── layout.tsx            # ダッシュボードレイアウト
│   │   ├── admin/                    # 管理画面
│   │   ├── api/                      # APIルート
│   │   │   ├── auth/
│   │   │   ├── openai/
│   │   │   ├── progress/
│   │   │   ├── review/
│   │   │   └── webhook/
│   │   ├── layout.tsx                # ルートレイアウト
│   │   └── globals.css               # グローバルスタイル
│   ├── components/                   # Reactコンポーネント
│   │   ├── ui/                       # shadcn/uiベース
│   │   ├── layout/                   # レイアウトコンポーネント
│   │   ├── words/                    # 単語学習コンポーネント
│   │   ├── idioms/                   # 熟語学習コンポーネント
│   │   ├── grammar/                  # 文法コンポーネント
│   │   ├── reading/                  # 読解コンポーネント
│   │   ├── listening/                # リスニングコンポーネント
│   │   ├── writing/                  # ライティングコンポーネント
│   │   ├── shared/                   # 共有コンポーネント
│   │   └── providers/                # Context Provider
│   ├── lib/                          # ユーティリティ
│   │   ├── supabase/                 # Supabaseクライアント
│   │   ├── openai/                   # OpenAIクライアント
│   │   ├── utils.ts                  # 汎用関数
│   │   └── constants.ts              # 定数
│   ├── hooks/                        # カスタムフック
│   │   ├── useAuth.ts
│   │   ├── useProgress.ts
│   │   ├── useReview.ts
│   │   └── useGamification.ts
│   ├── stores/                       # Zustandストア
│   │   ├── authStore.ts
│   │   ├── progressStore.ts
│   │   └── uiStore.ts
│   ├── types/                        # TypeScript型定義
│   │   ├── database.ts               # DBスキーマ型
│   │   ├── api.ts                    # APIレスポンス型
│   │   └── index.ts                  # エクスポート
│   └── styles/                       # 追加スタイル
├── public/                           # 静的ファイル
│   ├── audio/                        # 音声ファイル
│   └── icons/                        # アイコン
├── supabase/                         # Supabase設定
│   ├── migrations/                   # DBマイグレーション
│   ├── functions/                    # Edge Functions
│   └── config.ts                     # Supabase設定
├── docs/                             # ドキュメント
│   ├── API.md
│   └── DATABASE.md
├── .env.local                        # 環境変数
├── next.config.js                    # Next.js設定
├── tailwind.config.ts                # Tailwind設定
├── tsconfig.json                     # TypeScript設定
└── package.json                      # 依存関係
```

---

## 4. データベース設計

### 4.1 テーブル一覧

#### users（ユーザー）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| email | text | メールアドレス |
| display_name | text | 表示名 |
| avatar_url | text | アバターURL |
| provider | text | 認証プロバイダ |
| target_date | date | 目標日 |
| level | int | レベル |
| exp | int | 経験値 |
| streak_days | int | 連続学習日数 |
| total_study_time | int | 総学習時間(分) |
| created_at | timestamp | 作成日時 |
| updated_at | timestamp | 更新日時 |

#### words（単語）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| word | text | 単語 |
| reading | text | 読み方 |
| meaning | text | 意味 |
| example_sentence | text | 例文 |
| example_translation | text | 例文和訳 |
| category | text | カテゴリ |
| level | text | 難易度 |
| frequency | int | 出現頻度 |

#### idioms（熟語）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| idiom | text | 熟語 |
| reading | text | 読み方 |
| meaning | text | 意味 |
| example_sentence | text | 例文 |
| example_translation | text | 例文和訳 |
| category | text | カテゴリ |
| level | text | 難易度 |

#### grammar（文法）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| category | text | 文法カテゴリ |
| subcategory | text | サブカテゴリ |
| title | text | タイトル |
| explanation | text | 解説 |
| examples | jsonb | 例文配列 |
| order | int | 順序 |

#### grammar_questions（文法問題）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| grammar_id | uuid | FK(grammar) |
| question | text | 問題文 |
| options | jsonb | 選択肢 |
| correct_answer | int | 正解(0-3) |
| explanation | text | 解説 |
| difficulty | int | 難易度 |

#### reading（長文）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| title | text | タイトル |
| content | text | 本文 |
| translation | text | 和訳 |
| words | jsonb | 重要単語配列 |
| difficulty | int | 難易度 |
| estimated_time | int | 予想時間(秒) |

#### reading_questions（読解問題）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| reading_id | uuid | FK(reading) |
| question | text | 問題文 |
| options | jsonb | 選択肢 |
| correct_answer | int | 正解 |
| explanation | text | 解説 |

#### listening（リスニング）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| title | text | タイトル |
| audio_url | text | 音声URL |
| script | text | スクリプト |
| translation | text | 和訳 |
| difficulty | int | 難易度 |

#### listening_questions（リスニング問題）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| listening_id | uuid | FK(listening) |
| question | text | 問題文 |
| options | jsonb | 選択肢 |
| correct_answer | int | 正解 |
| explanation | text | 解説 |

#### mock_exams（模試）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| title | text | タイトル |
| description | text | 説明 |
| time_limit | int | 制限時間(分) |
| questions | jsonb | 問題ID配列 |
| passing_score | int | 合格点 |

#### user_progress（学習進捗）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| user_id | uuid | FK(users) |
| content_type | text | コンテンツタイプ |
| content_id | uuid | コンテンツID |
| status | text | ステータス |
| score | int | スコア |
| completed_at | timestamp | 完了日時 |
| attempts | int | 挑戦回数 |

#### review_schedule（復習スケジュール）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| user_id | uuid | FK(users) |
| content_type | text | コンテンツタイプ |
| content_id | uuid | コンテンツID |
| next_review | date | 次回復習日 |
| interval | int | 復習間隔(日) |
| ease_factor | float | 忘却曲線係数 |

#### study_sessions（学習セッション）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| user_id | uuid | FK(users) |
| content_type | text | 学習タイプ |
| duration | int | 学習時間(秒) |
| exp_earned | int | 獲得EXP |
| created_at | timestamp | 開始日時 |

#### user_achievements（実績）
| カラム | 型 | 説明 |
|--------|------|------|
| id | uuid | PK |
| user_id | uuid | FK(users) |
| achievement_id | text | 実績ID |
| unlocked_at | timestamp | 解除日時 |

#### badges（バッジ定義）
| カラム | 型 | 説明 |
|--------|------|------|
| id | text | PK (e.g., 'first_lesson') |
| name | text | 名前 |
| description | text | 説明 |
| icon | text | アイコン |
| requirement | jsonb | 解除条件 |

---

## 5. API設計

### 5.1 認証関連
| エンドポイント | メソッド | 説明 |
|---------------|----------|------|
| /api/auth/signup | POST | 新規登録 |
| /api/auth/login | POST | ログイン |
| /api/auth/google | POST | Googleログイン |
| /api/auth/logout | POST | ログアウト |
| /api/auth/reset-password | POST | パスワードリセット |

### 5.2 学習関連
| エンドポイント | メソッド | 説明 |
|---------------|----------|------|
| /api/words | GET | 単語一覧取得 |
| /api/words/:id | GET | 単語詳細取得 |
| /api/words/progress | POST | 学習記録保存 |
| /api/idioms | GET | 熟語一覧取得 |
| /api/grammar | GET | 文法一覧取得 |
| /api/reading | GET | 長文一覧取得 |
| /api/listening | GET | リスニング一覧取得 |

### 5.3 復習関連
| エンドポイント | メソッド | 説明 |
|---------------|----------|------|
| /api/review/due | GET | 復習対象取得 |
| /api/review/schedule | POST | 復習スケジュール更新 |
| /api/review/algorithm | POST | 忘却曲線計算 |

### 5.4 AI関連
| エンドポイント | メソッド | 説明 |
|---------------|----------|------|
| /api/openai/chat | POST | チャット |
| /api/openai/correct | POST | ライティング添削 |
| /api/openai/explain | POST | 文法解説生成 |

### 5.5 模試関連
| エンドポイント | メソッド | 説明 |
|---------------|----------|------|
| /api/mock-exam/start | POST | 模試開始 |
| /api/mock-exam/submit | POST | 回答提出 |
| /api/mock-exam/result | GET | 結果取得 |

### 5.6 分析関連
| エンドポイント | メソッド | 説明 |
|---------------|----------|------|
| /api/analytics/overview | GET | 学習概要 |
| /api/analytics/progress | GET | 進捗推移 |
| /api/analytics/weak-points | GET | 苦手分野 |

---

## 6. 機能詳細設計

### 6.1 忘却曲線アルゴリズム（SM-2ベース）

```
初期設定:
- 間隔(I) = 1日
- 易しさ(EF) = 2.5

学習後の評価:
- 5: 完全に覚えた
- 4: 回答に少し迷った
- 3: 難しく感じた
- 2: 間違えたが意味を知っていた
- 1: 全くわからなかった

更新式:
I(n+1) = I(n) × EF
EF' = EF + (0.1 - (3 - 評価) × (0.08 + (3 - 評価) × 0.02))

次回復習日 = 今日 + I(n+1)
```

### 6.2 レベル・EXPシステム

| レベル | 必要EXP | タイトル |
|--------|---------|----------|
| 1 | 0 | 初級者 |
| 2 | 100 | 入門者 |
| 3 | 300 | 初見 |
| 4 | 600 | 初級 |
| 5 | 1000 | 中級初級 |
| ... | ... | ... |
| 50 | 50000 | 合格間近 |

EXP獲得条件:
- 単語1語: +5EXP
- 熟語1個: +5EXP
- 文法1問: +10EXP
- 読解1問: +15EXP
- リスニング1問: +15EXP
- ライティング1回: +30EXP
- 模試完了: +100EXP
- 連続ログイン: +20EXP/日

### 6.3 合格率計算

```
合格率 = (
  単語習得率 × 0.25 +
  文法正答率 × 0.25 +
  読解正答率 × 0.25 +
  リスニング正答率 × 0.25
) × 100
```

---

## 7. 実装ロードマップ

### Phase 1: 基盤構築（1週目）
- [x] プロジェクトセットアップ
- [ ] Supabase設定・DB構築
- [ ] 認証システム実装
- [ ] 基本レイアウト実装
- [ ] ナビゲーション実装

### Phase 2: 学習機能（2週目）
- [ ] 単語学習実装
- [ ] 熟語学習実装
- [ ] 忘却曲線アルゴリズム実装
- [ ] 復習システム実装

### Phase 3: 文法・読解・リスニング（3週目）
- [ ] 文法学習実装
- [ ] 長文読解実装
- [ ] リスニング実装
- [ ] 音声再生機能

### Phase 4: 高度な機能（4週目）
- [ ] ライティング添削実装
- [ ] AIチャット実装
- [ ] 模試実装
- [ ] タイマー機能

### Phase 5: ゲーミフィケーション・分析（5週目）
- [ ] EXP/レベルシステム
- [ ] バッジ・実績
- [ ] ランキング
- [ ] 学習分析グラフ
- [ ] 通知機能

### Phase 6: 仕上げ（6週目）
- [ ] PWA対応
- [ ] ダークモード
- [ ] SEO最適化
- [ ] パフォーマンス最適化
- [ ] テスト・デプロイ

---

## 8. セキュリティ設計

### 8.1 認証・認可
- Supabase Auth使用
- JWTトークン検証
- RLS(Row Level Security)によるアクセス制御

### 8.2 データ保護
- HTTPS通信
- 環境変数での秘密管理
- SQLインジェクション対策（Prisma使用）

### 8.3 CSRF対策
- SameSite Cookie属性
- CSRFトークン検証

---

## 9. SEO設計

### 9.1 メタデータ
```typescript
// 各ページのメタデータ設定
export const metadata = {
  title: '英検準2級 AI合格アプリ',
  description: 'AIが徹底的にサポートする英検準2級合格アプリ',
  openGraph: {
    title: '英検準2級 AI合格アプリ',
    description: '最短で合格！AIがあなたに最適化された学習を提供',
    url: 'https://eiken-pre2.app',
    siteName: '英検準2級 AI合格アプリ',
    images: ['/ogp.png'],
    locale: 'ja_JP',
  },
}
```

### 9.2 構造化データ
- JSON-LD形式で実装
- WebApplicationタイプ

---

## 10. PWA設計

### 10.1 マニフェスト
```json
{
  "name": "英検準2級 AI合格アプリ",
  "short_name": "英検準2級",
  "description": "AIが徹底的にサポートする英検準2級合格アプリ",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#007AFF"
}
```

### 10.2 サービスワーカー
- キャッシュ戦略: Stale-While-Revalidate
- オフライン対応: 基本ページ・単語データ

---

## 11. UIデザインガイドライン

### 11.1 カラーパレット
```css
/* ライトモード */
--primary: #007AFF;      /* Apple Blue */
--background: #FFFFFF;
--surface: #F5F5F7;
--text: #1D1D1F;
--text-secondary: #86868B;
--border: #E5E5EA;
--success: #34C759;
--warning: #FF9500;
--error: #FF3B30;

/* ダークモード */
--background: #000000;
--surface: #1C1C1E;
--text: #FFFFFF;
--text-secondary: #8E8E93;
--border: #38383A;
```

### 11.2 タイポグラフィ
```css
/* 見出し */
font-size: 28px;
font-weight: 700;
line-height: 1.3;

/* 本文 */
font-size: 16px;
font-weight: 400;
line-height: 1.6;

/* 注釈 */
font-size: 14px;
font-weight: 400;
color: var(--text-secondary);
```

### 11.3 コンポーネント設計
- 角丸: 12px (カード), 8px (ボタン)
- シャドウ: 極力使用しない
- アニメーション: 300ms ease-out
- タッチターゲット: 44px以上

---

この設計書に基づき、実装を進めていきます。
