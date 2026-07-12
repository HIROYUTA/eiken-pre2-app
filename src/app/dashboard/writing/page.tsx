/**
 * ライティングページ
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Send } from 'lucide-react'

// ライティングプロンプト
const writingPrompts = [
  {
    id: 'w1',
    title: '自己紹介',
    prompt: 'Write about yourself. Include your name, age, hobbies, and what you want to be in the future. (about 50-80 words)',
    modelAnswer: 'My name is Tom. I am 15 years old. My hobbies are playing soccer and reading books. I practice soccer every day after school. On weekends, I often go to the library to read books about science. I want to be a scientist in the future because I want to discover new things.',
    wordCount: '50-80',
  },
  {
    id: 'w2',
    title: '休日の過ごし方',
    prompt: 'Write about how you spend your holidays. What do you usually do? Do you prefer staying at home or going out? (about 60-90 words)',
    modelAnswer: 'On holidays, I usually spend time with my family. In the morning, I help my mother with housework. Then we have lunch together. In the afternoon, I often go to the park with my friends. Sometimes we play soccer or basketball. In the evening, I watch movies or read books at home. I prefer going out because it is fun and healthy.',
    wordCount: '60-90',
  },
  {
    id: 'w3',
    title: '好きな季節',
    prompt: 'Write about your favorite season. Why do you like it? What do you do during that season? (about 50-80 words)',
    modelAnswer: 'My favorite season is spring. The weather is warm and comfortable. Many beautiful flowers bloom in spring. I like cherry blossoms the most. I often go to see cherry blossoms with my family in April. We take pictures and have a picnic under the trees. Spring makes me feel happy and energetic.',
    wordCount: '50-80',
  },
]

export default function WritingPage() {
  const [selectedPrompt, setSelectedPrompt] = useState(writingPrompts[0])
  const [userWriting, setUserWriting] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = async () => {
    if (!userWriting.trim()) {
      alert('英作文を入力してください')
      return
    }

    setIsSubmitting(true)

    // 模擬採点（本来はOpenAI APIを使用）
    setTimeout(() => {
      const wordCount = userWriting.trim().split(/\s+/).length
      const score = Math.min(100, Math.max(50, 85 + Math.random() * 15))

      setResult({
        vocabulary_score: Math.round(score * 0.25),
        grammar_score: Math.round(score * 0.24),
        content_score: Math.round(score * 0.26),
        organization_score: Math.round(score * 0.25),
        total_score: Math.round(score),
        feedback: '全体的に良い文章です。語彙と文法のバランスが取れています。内容も明確で、構成も論理的です。',
        improved_version: userWriting,
        model_answer: selectedPrompt.modelAnswer,
        word_count: wordCount,
      })
      setShowResult(true)
      setIsSubmitting(false)
    }, 1500)
  }

  const handleReset = () => {
    setUserWriting('')
    setResult(null)
    setShowResult(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-warning'
    return 'text-destructive'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'S'
    if (score >= 80) return 'A'
    if (score >= 70) return 'B'
    if (score >= 60) return 'C'
    return 'D'
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">ライティング</h1>
        <p className="text-muted-foreground">AIが添削してくれます</p>
      </div>

      {/* プロンプト選択 */}
      <Card>
        <CardHeader>
          <CardTitle>テーマ選択</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {writingPrompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => {
                  setSelectedPrompt(prompt)
                  setUserWriting('')
                  setResult(null)
                  setShowResult(false)
                }}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  selectedPrompt.id === prompt.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-muted/50'
                }`}
              >
                <h3 className="font-semibold mb-1">{prompt.title}</h3>
                <p className="text-sm text-muted-foreground">{prompt.wordCount}語</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 設問 */}
      <Card>
        <CardHeader>
          <CardTitle>{selectedPrompt.title}</CardTitle>
          <CardDescription>目安: {selectedPrompt.wordCount}語</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm leading-relaxed">{selectedPrompt.prompt}</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              あなたの英作文
            </label>
            <Textarea
              value={userWriting}
              onChange={(e) => setUserWriting(e.target.value)}
              placeholder="ここに英作文を書いてください..."
              className="min-h-[200px]"
              disabled={isSubmitting || showResult}
            />
            <p className="text-xs text-muted-foreground mt-1">
              現在の語数: {userWriting.trim() ? userWriting.trim().split(/\s+/).length : 0}語
            </p>
          </div>

          {!showResult ? (
            <div className="flex gap-4">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !userWriting.trim()}
                className="flex-1"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    添削中...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    添削してもらう
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={isSubmitting}>
                リセット
              </Button>
            </div>
          ) : (
            <Button onClick={handleReset} variant="outline">
              別のテーマに挑戦
            </Button>
          )}
        </CardContent>
      </Card>

      {/* 結果 */}
      {showResult && result && (
        <Card>
          <CardHeader>
            <CardTitle>添削結果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 総合スコア */}
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(result.total_score)}`}>
                {result.total_score}
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-2xl font-bold">
                  {getScoreLabel(result.total_score)}評価
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">100点満点</p>
            </div>

            {/* スコア内訳 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">語彙</p>
                <p className="text-2xl font-bold">{result.vocabulary_score}/25</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">文法</p>
                <p className="text-2xl font-bold">{result.grammar_score}/25</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">内容</p>
                <p className="text-2xl font-bold">{result.content_score}/25</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">構成</p>
                <p className="text-2xl font-bold">{result.organization_score}/25</p>
              </div>
            </div>

            {/* フィードバック */}
            <div>
              <h3 className="font-semibold mb-2">AIからのフィードバック</h3>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">{result.feedback}</p>
              </div>
            </div>

            {/* 模範解答 */}
            <div>
              <h3 className="font-semibold mb-2">模範解答</h3>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm leading-relaxed">{result.model_answer}</p>
              </div>
            </div>

            {/* あなたの解答 */}
            <div>
              <h3 className="font-semibold mb-2">あなたの解答</h3>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm leading-relaxed">{userWriting}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
