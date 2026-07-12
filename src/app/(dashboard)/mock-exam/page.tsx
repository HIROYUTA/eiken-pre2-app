/**
 * 模試ページ
 */

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Trophy } from 'lucide-react'

// 模試データ（各セクション5問）
const mockExamData = {
  grammar: [
    { id: 1, question: 'I _____ English every day.', options: ['study', 'studies', 'studied', 'studying'], correct: 1 },
    { id: 2, question: 'She _____ to school by bus.', options: ['go', 'goes', 'going', 'went'], correct: 1 },
    { id: 3, question: 'They _____ soccer on weekends.', options: ['play', 'plays', 'playing', 'played'], correct: 0 },
    { id: 4, question: 'The cake _____ by the dog.', options: ['ate', 'was eaten', 'is eaten', 'will be eaten'], correct: 1 },
    { id: 5, question: 'I want _____ Japan.', options: ['visit', 'to visit', 'visiting', 'visited'], correct: 1 },
  ],
  reading: [
    { id: 1, question: 'What time does Tom wake up?', options: ['6:00', '6:30', '7:00', '7:30'], correct: 1 },
    { id: 2, question: 'How does Tom go to school?', options: ['by car', 'by bus', 'by train', 'on foot'], correct: 1 },
    { id: 3, question: 'What is Tom\'s favorite subject?', options: ['Math', 'Science', 'English', 'History'], correct: 2 },
    { id: 4, question: 'What does Tom want to be?', options: ['a teacher', 'a doctor', 'a scientist', 'an engineer'], correct: 1 },
    { id: 5, question: 'Where does Tom study on weekends?', options: ['at home', 'at school', 'at the library', 'at a cafe'], correct: 2 },
  ],
  listening: [
    { id: 1, question: 'Which train goes to Tokyo Station?', options: ['Platform 1', 'Platform 2', 'Platform 3', 'Platform 4'], correct: 0 },
    { id: 2, question: 'What time does the train leave?', options: ['8:00', '8:15', '8:30', '9:00'], correct: 2 },
    { id: 3, question: 'What time does the train arrive at Tokyo?', options: ['9:00', '9:15', '9:30', '9:45'], correct: 1 },
    { id: 4, question: 'What is the customer looking for?', options: ['a shirt', 'pants', 'shoes', 'a hat'], correct: 0 },
    { id: 5, question: 'What size does the customer need?', options: ['Small', 'Medium', 'Large', 'XL'], correct: 1 },
  ],
}

type ExamSection = 'grammar' | 'reading' | 'listening'
type ExamState = 'intro' | 'exam' | 'result'

export default function MockExamPage() {
  const [examState, setExamState] = useState<ExamState>('intro')
  const [currentSection, setCurrentSection] = useState<ExamSection>('grammar')
  const [timeLeft, setTimeLeft] = useState(600) // 10分
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (examState === 'exam' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [examState, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    setExamState('exam')
    setTimeLeft(600)
    setAnswers({})
    setCurrentSection('grammar')
  }

  const handleAnswer = (questionId: number, answer: number) => {
    setAnswers((prev) => ({ ...prev, [`${currentSection}-${questionId}`]: answer }))
  }

  const handleSubmit = () => {
    // スコア計算
    const grammarScore = calculateSectionScore('grammar')
    const readingScore = calculateSectionScore('reading')
    const listeningScore = calculateSectionScore('listening')

    const totalCorrect = grammarScore.correct + readingScore.correct + listeningScore.correct
    const totalQuestions = mockExamData.grammar.length + mockExamData.reading.length + mockExamData.listening.length
    const totalScore = Math.round((totalCorrect / totalQuestions) * 100)
    const passed = totalScore >= 60

    setResults({
      grammar: grammarScore,
      reading: readingScore,
      listening: listeningScore,
      totalScore,
      passed,
      totalCorrect,
      totalQuestions,
    })
    setExamState('result')
  }

  const calculateSectionScore = (section: ExamSection) => {
    const questions = mockExamData[section]
    let correct = 0
    questions.forEach((q) => {
      const userAnswer = answers[`${section}-${q.id}`]
      if (userAnswer === q.correct) correct++
    })
    return { correct, total: questions.length, score: Math.round((correct / questions.length) * 100) }
  }

  if (examState === 'intro') {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <Trophy className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-2">英検準2級 模擬試験</h1>
          <p className="text-muted-foreground">
            本番形式の模試で実力を測定しましょう
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>試験概要</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">試験時間</p>
                <p className="text-2xl font-bold">10分</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">問題数</p>
                <p className="text-2xl font-bold">15問</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">合格点</p>
                <p className="text-2xl font-bold">60点以上</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">問題構成</p>
                <p className="text-2xl font-bold">文法/読解/リスニング</p>
              </div>
            </div>

            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">注意事項</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• いったん開始すると、途中で中断できません</li>
                <li>• 時間になると自動的に提出されます</li>
                <li>• 合格率60点以上で合格となります</li>
              </ul>
            </div>

            <Button onClick={handleStart} className="w-full" size="lg">
              試験を開始する
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (examState === 'exam') {
    const sectionLabels = {
      grammar: '文法',
      reading: '読解',
      listening: 'リスニング',
    }

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">模試実施中</h1>
            <p className="text-muted-foreground">
              現在のセクション: {sectionLabels[currentSection]}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* セクションタブ */}
        <div className="flex gap-2">
          {(['grammar', 'reading', 'listening'] as ExamSection[]).map((section) => (
            <button
              key={section}
              onClick={() => setCurrentSection(section)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentSection === section
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/70'
              }`}
            >
              {sectionLabels[section]}
            </button>
          ))}
        </div>

        {/* 問題 */}
        <Card>
          <CardHeader>
            <CardTitle>{sectionLabels[currentSection]}問題</CardTitle>
            <CardDescription>
              {mockExamData[currentSection].length}問中{' '}
              {
                mockExamData[currentSection].filter(
                  (q) => answers[`${currentSection}-${q.id}`] !== undefined
                ).length
              }
              問回答済み
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {mockExamData[currentSection].map((question, index) => (
              <div key={question.id} className="space-y-3">
                <p className="font-medium">
                  {index + 1}. {question.question}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {question.options.map((option, optIndex) => (
                    <Button
                      key={optIndex}
                      variant={
                        answers[`${currentSection}-${question.id}`] === optIndex
                          ? 'default'
                          : 'outline'
                      }
                      className="justify-start text-left"
                      onClick={() => handleAnswer(question.id, optIndex)}
                    >
                      <span className="mr-2 font-bold">{String.fromCharCode(65 + optIndex)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-border">
              <Button
                onClick={handleSubmit}
                className="w-full"
                size="lg"
                disabled={Object.keys(answers).length < 15}
              >
                試験を提出する
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (examState === 'result' && results) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">試験結果</h1>
          <p className="text-muted-foreground">
            お疲れ様でした！
          </p>
        </div>

        {/* 総合結果 */}
        <Card className={results.passed ? 'border-success' : 'border-destructive'}>
          <CardHeader>
            <CardTitle className={results.passed ? 'text-success' : 'text-destructive'}>
              {results.passed ? '🎉 合格！' : '不合格...'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className={`text-6xl font-bold ${results.passed ? 'text-success' : 'text-destructive'}`}>
                {results.totalScore}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {results.totalCorrect} / {results.totalQuestions}問正解
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">文法</p>
                <p className="text-2xl font-bold">{results.grammar.score}%</p>
                <p className="text-xs text-muted-foreground">
                  {results.grammar.correct} / {results.grammar.total}
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">読解</p>
                <p className="text-2xl font-bold">{results.reading.score}%</p>
                <p className="text-xs text-muted-foreground">
                  {results.reading.correct} / {results.reading.total}
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">リスニング</p>
                <p className="text-2xl font-bold">{results.listening.score}%</p>
                <p className="text-xs text-muted-foreground">
                  {results.listening.correct} / {results.listening.total}
                </p>
              </div>
            </div>

            <Button onClick={() => setExamState('intro')} className="w-full" size="lg">
              もう一度受ける
            </Button>
          </CardContent>
        </Card>

        {/* 合格判定 */}
        <Card>
          <CardHeader>
            <CardTitle>学習アドバイス</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {results.grammar.score < 60 && (
                <p>• 文法の正答率が低いです。基礎文法の復習をおすすめします。</p>
              )}
              {results.reading.score < 60 && (
                <p>• 読解の正答率が低いです。長文を毎日読む練習をしましょう。</p>
              )}
              {results.listening.score < 60 && (
                <p>• リスニングの正答率が低いです。英語の音声を毎日聞く習慣をつけましょう。</p>
              )}
              {results.passed && (
                <p className="text-success font-medium">• おめでとうございます！合格です！引き続き学習を継続しましょう。</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
