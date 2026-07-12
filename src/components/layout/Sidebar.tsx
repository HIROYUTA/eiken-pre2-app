/**
 * サイドバー（モバイル用）
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Headphones, PenTool, Trophy, User, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { href: '/dashboard', label: 'ホーム', icon: Home },
  { href: '/dashboard/words', label: '単語', icon: '📝' },
  { href: '/dashboard/idioms', label: '熟語', icon: '💬' },
  { href: '/dashboard/grammar', label: '文法', icon: '📚' },
  { href: '/dashboard/reading', label: '読解', icon: BookOpen },
  { href: '/dashboard/listening', label: 'リスニング', icon: Headphones },
  { href: '/dashboard/writing', label: 'ライティング', icon: PenTool },
  { href: '/dashboard/mock-exam', label: '模試', icon: Trophy },
  { href: '/dashboard/profile', label: 'プロフィール', icon: User },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* オーバーレイ */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />

      {/* サイドバー */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-background p-6 transition-transform duration-300 md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 hover:bg-accent"
        >
          <X className="h-5 w-5" />
        </button>

        <nav className="mt-12 flex flex-col space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = typeof item.icon === 'string' ? null : item.icon

            return (
              <Link key={item.href} href={item.href} onClick={onClose}>
                <div
                  className={cn(
                    'flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  )}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  {typeof item.icon === 'string' && (
                    <span className="text-lg">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
