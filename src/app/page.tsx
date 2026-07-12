/**
 * トップページ
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Headphones, PenTool, Trophy, Sparkles, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI学習サポート',
    description: 'ChatGPT搭載のAI先生が24時間サポート。文法解説、添削、質問回答に対応',
  },
  {
    icon: TrendingUp,
    title: '忘却曲線学習',
    description: '最適な復習タイミングを自動計算。無駄なく効率的に記憶に定着',
  },
  {
    icon: BookOpen,
    title: '1500語の単語帳',
    description: '英検準2級頻出単語を網羅。例文、発音付きで効率的学習',
  },
  {
    icon: Headphones,
    title: 'リスニング特化',
    description: '速度変更、シャドーイング機能付き。本番さながらの対策',
  },
  {
    icon: PenTool,
    title: 'ライティング添削',
    description: 'AIが即座に添削。語彙、文法、内容、構成を4つの観点で評価',
  },
  {
    icon: Trophy,
    title: '模試＆分析',
    description: '本番形式の模試で実力測定。詳細な分析で弱点を克服',
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* ヒーローセクション */}
      <section className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        <div className="mx-auto max-w-3xl space-y-8 px-4 py-16">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            🎓 英検準2級合格を目指すなら
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            AIが徹底的にサポートする
            <br />
            <span className="text-primary">英検準2級</span>合格アプリ
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            毎日10〜20分の学習で、最短合格を目指しましょう。
            <br />
            単語・熟語・文法・読解・リスニング・ライティングを全てカバー。
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-base" asChild>
              <Link href="/signup">無料で始める</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base" asChild>
              <Link href="/login">ログイン</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="border-t border-border bg-muted/40 py-16">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            このアプリの特徴
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-none shadow-sm">
                <CardHeader>
                  <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 学習方法セクション */}
      <section className="py-16">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            効率的な学習方法
          </h2>
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                1
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">単語・熟語を覚える</h3>
                <p className="text-muted-foreground">
                  フラッシュカード方式で、英検準2級頻出の1500語・500熟語を学習。
                  忘却曲線に基づいて最適なタイミングで復習できます。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                2
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">文法・読解・リスニング</h3>
                <p className="text-muted-foreground">
                  8つの文法カテゴリを網羅。長文読解とリスニングで実践力を養います。
                  AIがわかりやすく解説します。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                3
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">ライティング・模試</h3>
                <p className="text-muted-foreground">
                  AIがライティングを添削。模試で本番形式の実戦演習ができます。
                  詳細な分析で弱点を克服しましょう。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="border-t border-border bg-muted/40 py-16">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            今すぐ無料で始めましょう
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            登録は1分で完了。クレジットカードも必要ありません。
            すぐに学習を始めて、英検準2級合格を目指しましょう。
          </p>
          <Button size="lg" className="text-base" asChild>
            <Link href="/signup">無料でアカウント作成</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
