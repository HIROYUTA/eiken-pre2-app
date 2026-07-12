/**
 * 長文読解ページ
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockReading, mockReadingQuestions, getItemById } from '@/lib/data/mockData'
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'

export default function ReadingPage() {
  const [selectedReading, setSelectedReading] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const reading = selectedReading
    ? mockReading.find((r) => r.id === selectedReading)
    : null
  const questions = selectedReading
    ? mockReadingQuestions.filter((q) => q.reading_id === selectedReading)
    : []
  const currentQuestion = questions[currentQuestionIndex]
  const isCorrect = selectedAnswer === currentQuestion?.correct_answer

  const handleReadingSelect = (id: string) => {
    setSelectedReading(id)
    setCurrentQuestionIndex(0)
    setShowTranslation(false)
    setCorrectCount(0)
  }

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
    setShowExplanation(true)

    if (index === currentQuestion.correct_answer) {
      setCorrectCount((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      const score = Math.round((correctCount / questions.length) * 100)
      alert(`🎉 読解完了！\n正答率: ${score}% (${correctCount}/${questions.length})`)
      setCurrentQuestionIndex(0)
      setCorrectCount(0)
    }
  }

  if (!selectedReading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">長文読解</h1>
          <p className="text-muted-foreground">
            読みたい長文を選択してください
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {mockReading.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleReadingSelect(item.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      推定時間: {Math.floor(item.estimated_time / 60)}分
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      難易度: {'★'.repeat(Math.min(item.difficulty, 5))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!reading) return null

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setSelectedReading(null)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{reading.title}</h1>
            <p className="text-muted-foreground">
              問題{currentQuestionIndex + 1} / {questions.length}
            </p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          正解: {correctCount}問
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 本文 */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">本文</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
              >
                {showTranslation ? '和訳を隠す' : '和訳を表示'}
              </Button>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-line leading-relaxed">
                {reading.content}
              </p>
            </div>

            {showTranslation && (
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
                  和訳
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {reading.translation}
                </p>
              </div>
            )}

            {/* 重要単語 */}
            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="font-semibold mb-2">重要単語</h4>
              <div className="flex flex-wrap gap-2">
                {reading.words.map((word, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs"
                  >
                    <span className="font-medium">{word.word}</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-muted-foreground">{word.meaning}</span>
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 問題 */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold">問題</h3>

            <p className="text-lg font-medium">{currentQuestion.question}</p>

            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => {
                let variant: 'default' | 'outline' | 'destructive' | 'secondary' = 'outline'

                if (showExplanation) {
                  if (index === currentQuestion.correct_answer) {
                    variant = 'default'
                  } else if (index === selectedAnswer && !isCorrect) {
                    variant = 'destructive'
                  }
                } else if (selectedAnswer === index) {
                  variant = 'secondary'
                }

                return (
                  <Button
                    key={index}
                    variant={variant}
                    className="w-full justify-start text-left"
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                  >
                    <span className="mr-4 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                )
              })}
            </div>

            {showExplanation && (
              <div
                className={`rounded-lg p-4 ${
                  isCorrect
                    ? 'bg-success/10 border border-success/20'
                    : 'bg-destructive/10 border border-destructive/20'
                }`}
              >
                <p className="font-medium">{isCorrect ? '正解！' : '不正解...'}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {showExplanation && (
              <Button onClick={handleNext} className="w-full">
                {currentQuestionIndex < questions.length - 1
                  ? '次の問題'
                  : '完了'}
              </Button>
            )}

            {/* 問題ナビゲーション */}
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-border">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentQuestionIndex
                      ? 'bg-primary'
                      : 'bg-muted'
                  }`}
                  onClick={() => {
                    if (index < currentQuestionIndex || showExplanation) {
                      setCurrentQuestionIndex(index)
                      setSelectedAnswer(null)
                      setShowExplanation(false)
                    }
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
