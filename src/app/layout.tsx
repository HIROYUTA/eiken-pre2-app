/**
 * ルートレイアウト
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: '英検準2級 AI合格アプリ',
  description: 'AIが徹底的にサポートする英検準2級合格アプリ',
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '英検準2級',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://eiken-pre2.app',
    title: '英検準2級 AI合格アプリ',
    description: 'AIがあなたの学習を徹底的にサポート。最短で合格を目指しましょう。',
    siteName: '英検準2級 AI合格アプリ',
  },
  twitter: {
    card: 'summary_large_image',
    title: '英検準2級 AI合格アプリ',
    description: 'AIがあなたの学習を徹底的にサポート。最短で合格を目指しましょう。',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
