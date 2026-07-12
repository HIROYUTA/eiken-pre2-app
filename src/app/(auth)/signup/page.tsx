/**
 * サインアップページ
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'
import { useUIStore } from '@/stores/uiStore'
import { localSignup, saveUserData } from '@/lib/auth/localAuth'

export default function SignupPage() {
  const router = useRouter()
  const { addToast } = useUIStore()
  const { setUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    // パスワード確認
    if (password !== confirmPassword) {
      addToast('パスワードが一致しません', 'error')
      return
    }

    // パスワード長
    if (password.length < 8) {
      addToast('パスワードは8文字以上である必要があります', 'error')
      return
    }

    setLoading(true)

    try {
      const user = await localSignup(email, password, displayName)

      // ユーザーデータを保存
      saveUserData(email, password, user)

      setUser(user)
      addToast('アカウントを作成しました！', 'success')
      router.push('/dashboard')
    } catch (error) {
      addToast((error as Error).message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">アカウント作成</CardTitle>
        <CardDescription>
          英検準2級合格アプリを始めましょう
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* デモアカウント作成ボタン */}
        <Button
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary/10"
          asChild
        >
          <Link href="/login">
            🎮 まずはデモで試す
          </Link>
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">または</span>
          </div>
        </div>

        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="表示名（ニックネーム）"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              autoComplete="name"
            />
            <Input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              type="password"
              placeholder="パスワード（8文字以上）"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
            <Input
              type="password"
              placeholder="パスワード（確認）"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '登録中...' : 'アカウント作成'}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          すでにアカウントをお持ち？
          <Link href="/login" className="ml-1 text-primary hover:underline">
            ログイン
          </Link>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          登録することで、
          <Link href="/terms" className="underline">
            利用規約
          </Link>
          と
          <Link href="/privacy" className="underline">
            プライバシーポリシー
          </Link>
          に同意したものとみなされます。
        </p>

        <p className="text-xs text-center text-muted-foreground">
          ※データはブラウザに保存されます
        </p>
      </CardContent>
    </Card>
  )
}
