/**
 * 文法学習ページ
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockGrammar, mockGrammarQuestions } from '@/lib/data/mockData'
import { CheckCircle, XCircle } from 'lucide-react'

export default function GrammarPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentMode, setCurrentMode] = useState<'learn' | 'practice'>('learn')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const categories = [
    { id: 'tense', name: '時制', icon: '📅' },
    { id: 'passive', name: '受動態', icon: '🔄' },
    { id: 'infinitive', name: '不定詞', icon: '➡️' },
    { id: 'gerund', name: '動名詞', icon: '📝' },
    { id: 'relative_pronoun', name: '関係代名詞', icon: '🔗' },
    { id: 'comparison', name: '比較', icon: '⚖️' },
  ]

  const selectedGrammarData = selectedCategory
    ? mockGrammar.find((g) => g.category === selectedCategory)
    : null
  const grammarQuestions = selectedCategory
    ? mockGrammarQuestions.filter((q) => {
        const grammar = mockGrammar.find((g) => g.id === q.grammar_id)
        return grammar?.category === selectedCategory
      })
    : []
  const currentQuestion = grammarQuestions[currentQuestionIndex]
  const isCorrect = selectedAnswer === currentQuestion?.correct_answer

  const handleStartPractice = () => {
    setCurrentMode('practice')
    setCurrentQuestionIndex(0)
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
    if (currentQuestionIndex < grammarQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      const score = Math.round((correctCount / grammarQuestions.length) * 100)
      alert(`🎉 練習完了！\n正答率: ${score}%`)
      setCurrentMode('learn')
      setCurrentQuestionIndex(0)
      setCorrectCount(0)
    }
  }

  if (!selectedCategory) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">文法学習</h1>
          <p className="text-muted-foreground">学習したい文法カテゴリを選択してください</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <span className="text-4xl mb-2">{category.icon}</span>
                <p className="font-medium">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (currentMode === 'learn' && selectedGrammarData) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{selectedGrammarData.title}</h1>
            <p className="text-muted-foreground">文法解説</p>
          </div>
          <Button onClick={() => setSelectedCategory(null)}>戻る</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>解説</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-line">{selectedGrammarData.explanation}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">例文</h3>
              <div className="space-y-3">
                {selectedGrammarData.examples.map((example, index) => (
                  <div key={index} className="rounded-lg bg-muted p-4">
                    <p className="font-medium">{example.sentence}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {example.translation}
                    </p>
                    {example.note && (
                      <p className="text-xs text-primary mt-2">💡 {example.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleStartPractice} className="w-full" size="lg">
          練習問題を始める
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{selectedGrammarData?.title}</h1>
          <p className="text-muted-foreground">
            問題{currentQuestionIndex + 1} / {grammarQuestions.length}
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          正解: {correctCount}問
        </div>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
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
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-success" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive" />
                )}
                <p className="font-medium">{isCorrect ? '正解！' : '不正解...'}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {showExplanation && (
            <Button onClick={handleNext} className="w-full">
              {currentQuestionIndex < grammarQuestions.length - 1
                ? '次の問題'
                : '完了'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
