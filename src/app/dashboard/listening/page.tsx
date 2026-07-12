/**
 * リスニングページ
 */

'use client'

import { useState } from 'react'
import { Play, Pause, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockListening, mockListeningQuestions, getItemById } from '@/lib/data/mockData'

export default function ListeningPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [correctCount, setCorrectCount] = useState(0)

  const currentListening = mockListening[0]
  const listeningQuestions = mockListeningQuestions.filter(q => q.listening_id === currentListening.id)
  const currentQuestion = listeningQuestions[currentQuestionIndex]
  const isCorrect = selectedAnswer === currentQuestion.correct_answer

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // 実際の音声再生はここで実装
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
    if (currentQuestionIndex < listeningQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      // 全問完了
      const score = Math.round((correctCount / listeningQuestions.length) * 100)
      alert(`🎉 リスニング完了！\n正答率: ${score}% (${correctCount}/${listeningQuestions.length})`)
      setCurrentQuestionIndex(0)
      setCorrectCount(0)
    }
  }

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">リスニング</h1>
          <p className="text-muted-foreground">
            問題{currentQuestionIndex + 1} / {listeningQuestions.length}
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          正解: {correctCount}問
        </div>
      </div>

      {/* スクリプト表示 */}
      <Card>
        <CardHeader>
          <CardTitle>スクリプト</CardTitle>
          <CardDescription>
            音声を聞いて、問題に答えてください
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {currentListening.script}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              variant={isPlaying ? 'secondary' : 'default'}
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="mr-2 h-5 w-5" />
              ) : (
                <Play className="mr-2 h-5 w-5" />
              )}
              {isPlaying ? '一時停止' : '再生'}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(false)}
            >
              <RotateCw className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">速度:</span>
            {[0.75, 1, 1.25, 1.5].map((speed) => (
              <Button
                key={speed}
                variant={playbackSpeed === speed ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => handleSpeedChange(speed)}
              >
                {speed}x
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 問題 */}
      <Card>
        <CardHeader>
          <CardTitle>問題</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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

          {/* 解説 */}
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

          {/* 次へボタン */}
          {showExplanation && (
            <Button onClick={handleNext} className="w-full">
              {currentQuestionIndex < listeningQuestions.length - 1
                ? '次の問題'
                : '完了'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
