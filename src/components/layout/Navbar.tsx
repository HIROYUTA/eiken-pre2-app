/**
 * ナビゲーションバー
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Headphones, PenTool, Trophy, User, LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'ホーム', icon: Home },
  { href: '/dashboard/words', label: '単語', icon: '📝' },
  { href: '/dashboard/idioms', label: '熟語', icon: '💬' },
  { href: '/dashboard/grammar', label: '文法', icon: '📚' },
  { href: '/dashboard/reading', label: '読解', icon: BookOpen },
  { href: '/dashboard/listening', label: 'リスニング', icon: Headphones },
  { href: '/dashboard/writing', label: 'ライティング', icon: PenTool },
  { href: '/dashboard/mock-exam', label: '模試', icon: Trophy },
]

export function Navbar() {
  const pathname = usePathname()
  const { user, logout, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return null
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* ロゴ */}
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold">英検準2級</span>
        </Link>

        {/* デスクトップナビゲーション */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = typeof item.icon === 'string' ? null : item.icon

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {typeof item.icon === 'string' && item.icon}
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </div>

        {/* ユーザーメニュー */}
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/profile">
            <Button variant="ghost" size="icon" className="gap-2">
              <User className="h-5 w-5" />
              <span className="hidden md:inline">
                Lv.{user?.level || 1}
              </span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            title="ログアウト"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* モバイルメニューボタン */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  )
}
