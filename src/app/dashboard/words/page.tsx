/**
 * 単語学習ページ
 */

'use client'

import { useState, useEffect } from 'react'
import { FlashCard } from '@/components/words/FlashCard'
import { mockWords } from '@/lib/data/mockData'
import type { Word } from '@/types'

export default function WordsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [words, setWords] = useState<Word[]>(mockWords)
  const [learnedCount, setLearnedCount] = useState(0)
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set())

  const currentWord = words[currentIndex]
  const progress = words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0
  const remainingWords = words.length - completedCards.size

  const handleAnswer = async (quality: number) => {
    // 学習したカードを記録
    if (currentWord) {
      setCompletedCards(prev => new Set(prev).add(currentWord.id))
      setLearnedCount(prev => prev + 1)

      // ローカルストレージに保存
      const saved = localStorage.getItem('eiken_words_progress')
      const progress = saved ? JSON.parse(saved) : {}
      progress[currentWord.id] = {
        quality,
        learnedAt: new Date().toISOString(),
      }
      localStorage.setItem('eiken_words_progress', JSON.stringify(progress))
    }

    // 次のカードへ
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      // 完了
      alert(`🎉 お疲れ様でした！\n${learnedCount + 1}語を学習しました！`)
      setCurrentIndex(0)
      setCompletedCards(new Set())
      setLearnedCount(0)
    }
  }

  // セッション開始時にシャッフル
  useEffect(() => {
    const shuffled = [...mockWords].sort(() => Math.random() - 0.5)
    setWords(shuffled)
  }, [])

  if (!currentWord) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-lg text-muted-foreground">読み込み中...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">単語学習</h1>
          <p className="text-muted-foreground">
            単語{currentIndex + 1} / {words.length}
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          学習済み: {completedCards.size}語
        </div>
      </div>

      {/* 進捗バー */}
      <div className="space-y-2">
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          残り{remainingWords}語
        </p>
      </div>

      {/* フラッシュカード */}
      <FlashCard word={currentWord} onAnswer={handleAnswer} />

      {/* 統計情報 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <p className="text-2xl font-bold">{words.length}</p>
          <p className="text-sm text-muted-foreground">総単語数</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <p className="text-2xl font-bold">{completedCards.size}</p>
          <p className="text-sm text-muted-foreground">学習済み</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <p className="text-2xl font-bold">{remainingWords}</p>
          <p className="text-sm text-muted-foreground">残り</p>
        </div>
      </div>

      {/* 操作ボタン */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex((prev) => prev - 1)
            }
          }}
          disabled={currentIndex === 0}
          className="px-6 py-2 rounded-lg border border-border bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← 前の単語
        </button>
        <button
          onClick={() => {
            setCurrentIndex((prev) => (prev + 1) % words.length)
          }}
          className="px-6 py-2 rounded-lg border border-border bg-background hover:bg-accent"
        >
          次の単語 →
        </button>
      </div>
    </div>
  )
}
