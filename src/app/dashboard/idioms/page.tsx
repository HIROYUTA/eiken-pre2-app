/**
 * 熟語学習ページ
 */

'use client'

import { useState, useEffect } from 'react'
import { Volume2, RotateCw, Star, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockIdioms } from '@/lib/data/mockData'
import type { Idiom } from '@/types'
import { cn } from '@/lib/utils'

export default function IdiomsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [idioms, setIdioms] = useState<Idiom[]>(mockIdioms)
  const [isFlipped, setIsFlipped] = useState(false)
  const [learnedCount, setLearnedCount] = useState(0)

  const currentIdiom = idioms[currentIndex]
  const progress = ((currentIndex + 1) / idioms.length) * 100

  const handleAnswer = (quality: number) => {
    setLearnedCount((prev) => prev + 1)

    if (currentIndex < idioms.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setIsFlipped(false)
    } else {
      alert(`🎉 お疲れ様でした！\n${learnedCount + 1}個の熟語を学習しました！`)
      setCurrentIndex(0)
      setLearnedCount(0)
    }
  }

  const speakIdiom = () => {
    if ('speechSynthesis' in window && currentIdiom) {
      const utterance = new SpeechSynthesisUtterance(currentIdiom.idiom)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    const shuffled = [...mockIdioms].sort(() => Math.random() - 0.5)
    setIdioms(shuffled)
  }, [])

  if (!currentIdiom) {
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
          <h1 className="text-3xl font-bold">熟語学習</h1>
          <p className="text-muted-foreground">
            熟語{currentIndex + 1} / {idioms.length}
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          学習済み: {learnedCount}個
        </div>
      </div>

      {/* 進捗バー */}
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* カード */}
      <div
        className={cn(
          'relative w-full max-w-lg mx-auto cursor-pointer transition-all duration-500',
          isFlipped ? 'flipped' : ''
        )}
        style={{ transformStyle: 'preserve-3d', minHeight: '320px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <Card
          className={cn(
            'absolute inset-0 transition-all duration-500',
            isFlipped ? 'rotate-y-180' : ''
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
            <h2 className="mb-4 text-4xl font-bold">{currentIdiom.idiom}</h2>
            <p className="mb-8 text-xl text-muted-foreground">{currentIdiom.reading}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                speakIdiom()
              }}
            >
              <Volume2 className="h-6 w-6" />
            </Button>
            <p className="mt-8 text-sm text-muted-foreground">
              タップして解答を見る
            </p>
          </CardContent>
        </Card>

        <Card
          className={cn(
            'absolute inset-0 transition-all duration-500',
            !isFlipped ? 'rotate-y-180' : ''
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          }}
        >
          <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
            <p className="mb-4 text-2xl font-bold">{currentIdiom.meaning}</p>
            <div className="mb-4 rounded-lg bg-muted p-4 text-left">
              <p className="text-sm italic">{currentIdiom.example_sentence}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {currentIdiom.example_translation}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                speakIdiom()
              }}
            >
              <Volume2 className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 回答ボタン */}
      {isFlipped && (
        <div className="grid w-full max-w-lg mx-auto grid-cols-5 gap-2 animate-fade-in">
          <Button
            variant="destructive"
            onClick={() => handleAnswer(1)}
            className="h-auto flex-col gap-1 py-4 text-sm"
          >
            <span className="text-lg">😵</span>
            <span>全然わからない</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleAnswer(2)}
            className="h-auto flex-col gap-1 py-4 text-sm"
          >
            <span className="text-lg">😕</span>
            <span>難しかった</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleAnswer(3)}
            className="h-auto flex-col gap-1 py-4 text-sm"
          >
            <span className="text-lg">😐</span>
            <span>何とか覚えた</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleAnswer(4)}
            className="h-auto flex-col gap-1 py-4 text-sm"
          >
            <span className="text-lg">🙂</span>
            <span>少し迷った</span>
          </Button>
          <Button
            variant="default"
            onClick={() => handleAnswer(5)}
            className="h-auto flex-col gap-1 py-4 text-sm"
          >
            <span className="text-lg">😊</span>
            <span>完全に覚えた</span>
          </Button>
        </div>
      )}

      {/* 操作ボタン */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            if (currentIndex > 0) setCurrentIndex((prev) => prev - 1)
          }}
          disabled={currentIndex === 0}
          className="px-6 py-2 rounded-lg border border-border bg-background hover:bg-accent disabled:opacity-50"
        >
          ← 前の熟語
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % idioms.length)}
          className="px-6 py-2 rounded-lg border border-border bg-background hover:bg-accent"
        >
          次の熟語 →
        </button>
      </div>
    </div>
  )
}
