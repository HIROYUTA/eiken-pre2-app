/**
 * フラッシュカードコンポーネント
 */

'use client'

import { useState } from 'react'
import { Volume2, RotateCw, Star, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Word } from '@/types'

interface FlashCardProps {
  word: Word
  onAnswer: (quality: number) => void
}

export function FlashCard({ word, onAnswer }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(word.word)
      utterance.lang = 'en-US'
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const handleAnswer = (quality: number) => {
    onAnswer(quality)
    setIsFlipped(false)
  }

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6">
      {/* カード */}
      <div
        className={cn(
          'relative h-80 w-full cursor-pointer perspective-1000 transition-all duration-500',
          isFlipped ? 'flipped' : ''
        )}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Card
          className={cn(
            'absolute inset-0 h-full w-full transition-all duration-500',
            isFlipped ? 'rotate-y-180' : ''
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
            <h2 className="mb-4 text-4xl font-bold">{word.word}</h2>
            <p className="mb-8 text-xl text-muted-foreground">{word.reading}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                speakWord()
              }}
              disabled={isSpeaking}
            >
              <Volume2 className={cn('h-6 w-6', isSpeaking && 'animate-pulse')} />
            </Button>
            <p className="mt-8 text-sm text-muted-foreground">
              タップして解答を見る
            </p>
          </CardContent>
        </Card>

        <Card
          className={cn(
            'absolute inset-0 h-full w-full transition-all duration-500',
            !isFlipped ? 'rotate-y-180' : ''
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          }}
        >
          <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
            <p className="mb-4 text-2xl font-bold">{word.meaning}</p>
            <div className="mb-4 rounded-lg bg-muted p-4 text-left">
              <p className="text-sm italic">{word.example_sentence}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {word.example_translation}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  speakWord()
                }}
                disabled={isSpeaking}
              >
                <Volume2 className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 回答ボタン */}
      {isFlipped && (
        <div className="grid w-full grid-cols-5 gap-2 animate-fade-in">
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

      {/* アクションボタン */}
      <div className="flex gap-4">
        <Button variant="outline" size="icon">
          <Star className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon">
          <RotateCw className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon">
          <Check className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
