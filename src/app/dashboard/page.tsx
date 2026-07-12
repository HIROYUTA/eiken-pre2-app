/**
 * ダッシュボードホーム
 */

'use client'

import Link from 'next/link'
import { BookOpen, Headphones, PenTool, Trophy, Clock, Flame, Target, TrendingUp, Book } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'
import { useProgressStore } from '@/stores/progressStore'
import { formatDuration } from '@/lib/utils'
import { mockWords } from '@/lib/data/mockData'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { todayStudyTime, streakDays } = useProgressStore()

  // 今日のタスク（サンプル）
  const todayTasks = [
    {
      type: 'words',
      title: '単語復習',
      description: `${mockWords.length}語の復習`,
      count: mockWords.length,
      href: '/dashboard/words',
      icon: '📝',
    },
    {
      type: 'grammar',
      title: '文法学習',
      description: '時制・受動態',
      count: 2,
      href: '/dashboard/grammar',
      icon: '📚',
    },
    {
      type: 'reading',
      title: '長文読解',
      description: '読解2問',
      count: 2,
      href: '/dashboard/reading',
      icon: BookOpen,
    },
    {
      type: 'listening',
      title: 'リスニング',
      description: 'リスニング5問',
      count: 5,
      href: '/dashboard/listening',
      icon: Headphones,
    },
  ]

  // 苦手分野（サンプル）
  const weakPoints = ['関係代名詞', '仮定法', '受動態']

  // 合格率計算（簡易版）
  const passProbability = user ? Math.min(95, Math.floor(user.level * 2 + 30)) : 40

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* セクションヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            こんにちは、{user?.display_name || 'ゲスト'}さん
          </h1>
          <p className="text-muted-foreground">
            今日も学習を続けましょう！
          </p>
        </div>
        <Link href="/dashboard/mock-exam">
          <Button size="lg">
            <Trophy className="mr-2 h-5 w-5" />
            模試を受ける
          </Button>
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>連続学習日数</CardDescription>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streakDays}日</div>
            <p className="text-xs text-muted-foreground">
              継続は力なり！
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>今日の学習時間</CardDescription>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDuration(todayStudyTime)}
            </div>
            <p className="text-xs text-muted-foreground">
              目標：20分
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>現在のレベル</CardDescription>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Lv.{user?.level || 1}</div>
            <p className="text-xs text-muted-foreground">
              EXP: {user?.exp || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>予想合格率</CardDescription>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passProbability}%</div>
            <p className="text-xs text-muted-foreground">
              {passProbability >= 60 ? '順調に上達中！' : 'まだまだこれから！'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 今日のタスク */}
      <Card>
        <CardHeader>
          <CardTitle>今日やるべき学習</CardTitle>
          <CardDescription>
            単語: {mockWords.length}語 | 文法: 2項目 | 読解: 2問 | リスニング: 5問
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {todayTasks.map((task) => (
              <Link
                key={task.type}
                href={task.href}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {typeof task.icon === 'string' ? (
                      <span className="text-2xl">{task.icon}</span>
                    ) : (
                      <task.icon className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {task.count}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 学習メニュー */}
      <Card>
        <CardHeader>
          <CardTitle>学習を始める</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/words">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-6">
                <span className="text-2xl">📝</span>
                <span>単語</span>
              </Button>
            </Link>
            <Link href="/dashboard/idioms">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-6">
                <span className="text-2xl">💬</span>
                <span>熟語</span>
              </Button>
            </Link>
            <Link href="/dashboard/grammar">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-6">
                <span className="text-2xl">📚</span>
                <span>文法</span>
              </Button>
            </Link>
            <Link href="/dashboard/reading">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-6">
                <BookOpen className="h-8 w-8" />
                <span>読解</span>
              </Button>
            </Link>
            <Link href="/dashboard/listening">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-6">
                <Headphones className="h-8 w-8" />
                <span>リスニング</span>
              </Button>
            </Link>
            <Link href="/dashboard/writing">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-6">
                <PenTool className="h-8 w-8" />
                <span>ライティング</span>
              </Button>
            </Link>
            <Link href="/dashboard/mock-exam">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-6">
                <Trophy className="h-8 w-8" />
                <span>模試</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 苦手分野 */}
      <Card>
        <CardHeader>
          <CardTitle>苦手分野</CardTitle>
          <CardDescription>
            重点的に復習しましょう
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {weakPoints.map((point) => (
              <Link
                key={point}
                href="/dashboard/grammar"
                className="rounded-full bg-destructive/10 px-4 py-2 text-sm text-destructive hover:bg-destructive/20 transition-colors"
              >
                {point}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 進捗状況 */}
      <Card>
        <CardHeader>
          <CardTitle>学習進捗</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>単語</span>
              <span>0 / {mockWords.length}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '0%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>文法</span>
              <span>0 / 8</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '0%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>読解</span>
              <span>0 / 2</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '0%' }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
