/**
 * フッター
 */

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40 py-8">
      <div className="container flex flex-col items-center justify-center space-y-4 text-center">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold">英検準2級 AI合格アプリ</span>
        </div>
        <p className="text-sm text-muted-foreground">
          AIがあなたの学習を徹底的にサポート
        </p>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground">
            利用規約
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            プライバシーポリシー
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            お問い合わせ
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} 英検準2級 AI合格アプリ All rights reserved.
        </p>
      </div>
    </footer>
  )
}
