/**
 * プロフィールページ
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Camera, Calendar, Target, Award, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/authStore'
import { formatDate } from '@/lib/utils'
import { mockWords } from '@/lib/data/mockData'
import { getAllBadges } from '@/hooks/useGamification'

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState(user?.display_name || '')
  const [targetDate, setTargetDate] = useState(
    user?.target_date || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  )

  const handleSave = () => {
    // ローカルストレージに保存（モック）
    localStorage.setItem('eiken_profile', JSON.stringify({
      displayName,
      targetDate,
    }))
    setIsEditing(false)
  }

  const getDaysUntilTarget = () => {
    if (!targetDate) return null
    const target = new Date(targetDate)
    const today = new Date()
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntilTarget = getDaysUntilTarget()
  const badges = getAllBadges()

  const handleLogout = () => {
    if (confirm('ログアウトしますか？')) {
      localStorage.removeItem('eiken_auth')
      logout()
      window.location.href = '/'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">マイページ</h1>
          <p className="text-muted-foreground">プロフィールと学習状況</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleLogout}
            title="ログアウト"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* プロフィールカード */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* アバター */}
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
                {displayName?.charAt(0).toUpperCase() || 'U'}
              </div>
              {isEditing && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* プロフィール情報 */}
            <div className="flex-1 space-y-4 w-full">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">表示名</label>
                  {isEditing ? (
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  ) : (
                    <p className="text-lg">{displayName || 'ゲスト'}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">メールアドレス</label>
                  <p className="text-lg">{user?.email || 'guest@example.com'}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">目標日</label>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                    />
                  ) : (
                    <p className="text-lg">
                      {targetDate ? formatDate(targetDate) : '未設定'}
                    </p>
                  )}
                </div>
              </div>

              {daysUntilTarget !== null && daysUntilTarget >= 0 && (
                <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">目標日まで</p>
                    <p className="font-bold text-primary">
                      あと{daysUntilTarget}日
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="flex gap-2 md:justify-end">
              <Button onClick={handleSave}>保存</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                キャンセル
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="md:justify-end">
              編集
            </Button>
          )}
        </CardContent>
      </Card>

      {/* 統計カード */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">現在のレベル</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Award className="h-10 w-10 text-primary" />
              <div>
                <p className="text-3xl font-bold">Lv.{user?.level || 1}</p>
                <p className="text-sm text-muted-foreground">EXP: {user?.exp || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">連続学習日数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 text-xl">
                🔥
              </div>
              <div>
                <p className="text-3xl font-bold">{user?.streak_days || 0}</p>
                <p className="text-sm text-muted-foreground">日</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">総学習時間</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Target className="h-10 w-10 text-primary" />
              <div>
                <p className="text-3xl font-bold">
                  {Math.floor((user?.total_study_time || 0) / 60)}
                </p>
                <p className="text-sm text-muted-foreground">時間</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 学習統計 */}
      <Card>
        <CardHeader>
          <CardTitle>学習統計</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold">{mockWords.length}</p>
              <p className="text-sm text-muted-foreground">総単語数</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">習得単語</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold">0%</p>
              <p className="text-sm text-muted-foreground">単語習得率</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">模試回数</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* バッジ */}
      <Card>
        <CardHeader>
          <CardTitle>獲得バッジ</CardTitle>
          <CardDescription>実績解除状況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`flex aspect-square items-center justify-center rounded-lg text-3xl transition-all ${
                  badge.unlocked_at
                    ? 'bg-primary/10 scale-100'
                    : 'bg-muted opacity-30 scale-90'
                }`}
                title={badge.name}
              >
                {badge.icon}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            学習を進めてバッジを集めましょう！
          </p>
        </CardContent>
      </Card>

      {/* 目標設定 */}
      <Card>
        <CardHeader>
          <CardTitle>学習目標</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-4">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">毎日20分の学習</p>
                <p className="text-sm text-muted-foreground">今日の達成: {Math.floor((user?.total_study_time || 0) / 60)}/20分</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{Math.min(100, Math.floor(((user?.total_study_time || 0) / 60) / 20 * 100))}%</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-4">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">レベルアップ</p>
                <p className="text-sm text-muted-foreground">次のレベルまで: {100 - (user?.exp || 0) % 100}EXP</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">Lv.{(user?.level || 1) + 1}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
