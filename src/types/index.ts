/**
 * アプリケーション全体で使用する型定義
 */

import { CONTENT_TYPES, LEARNING_STATUS } from '@/lib/constants'

/** ユーザー */
export interface User {
  id: string
  email: string
  display_name: string
  avatar_url?: string
  provider: 'email' | 'google'
  target_date?: string
  level: number
  exp: number
  streak_days: number
  total_study_time: number
  created_at: string
  updated_at: string
}

/** 単語 */
export interface Word {
  id: string
  word: string
  reading: string
  meaning: string
  example_sentence: string
  example_translation: string
  category: string
  level: number
  frequency: number
  is_favorite?: boolean
  is_learned?: boolean
  next_review?: string
}

/** 熟語 */
export interface Idiom {
  id: string
  idiom: string
  reading: string
  meaning: string
  example_sentence: string
  example_translation: string
  category: string
  level: number
  is_favorite?: boolean
  is_learned?: boolean
  next_review?: string
}

/** 文法カテゴリ */
export interface Grammar {
  id: string
  category: string
  subcategory: string
  title: string
  explanation: string
  examples: Array<{
    sentence: string
    translation: string
    note?: string
  }>
  order: number
}

/** 文法問題 */
export interface GrammarQuestion {
  id: string
  grammar_id: string
  question: string
  options: string[]
  correct_answer: number
  explanation: string
  difficulty: number
  user_answer?: number
}

/** 長文 */
export interface Reading {
  id: string
  title: string
  content: string
  translation: string
  words: Array<{
    word: string
    meaning: string
  }>
  difficulty: number
  estimated_time: number
}

/** 読解問題 */
export interface ReadingQuestion {
  id: string
  reading_id: string
  question: string
  options: string[]
  correct_answer: number
  explanation: string
  user_answer?: number
}

/** リスニング */
export interface Listening {
  id: string
  title: string
  audio_url: string
  script: string
  translation: string
  difficulty: number
  speed?: number
}

/** リスニング問題 */
export interface ListeningQuestion {
  id: string
  listening_id: string
  question: string
  options: string[]
  correct_answer: number
  explanation: string
  user_answer?: number
}

/** ライティング評価結果 */
export interface WritingEvaluation {
  vocabulary_score: number // 0-25
  grammar_score: number // 0-25
  content_score: number // 0-25
  organization_score: number // 0-25
  total_score: number // 0-100
  feedback: string
  improved_version?: string
  model_answer?: string
}

/** 模試 */
export interface MockExam {
  id: string
  title: string
  description: string
  time_limit: number
  questions: {
    grammar?: string[]
    reading?: string[]
    listening?: string[]
  }
  passing_score: number
}

/** 模試結果 */
export interface MockExamResult {
  exam_id: string
  user_id: string
  score: number
  grammar_score: number
  reading_score: number
  listening_score: number
  completed_at: string
  time_taken: number
  answers: Record<string, number>
}

/** 学習進捗 */
export interface UserProgress {
  id: string
  user_id: string
  content_type: string
  content_id: string
  status: string
  score?: number
  completed_at?: string
  attempts: number
  last_attempt_at?: string
}

/** 復習スケジュール */
export interface ReviewSchedule {
  id: string
  user_id: string
  content_type: string
  content_id: string
  next_review: string
  interval: number
  ease_factor: number
  quality?: number
}

/** 学習セッション */
export interface StudySession {
  id: string
  user_id: string
  content_type: string
  duration: number
  exp_earned: number
  created_at: string
}

/** 実績 */
export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  unlocked_at: string
}

/** バッジ */
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked_at?: string
}

/** 学習統計 */
export interface StudyStats {
  total_study_time: number
  today_study_time: number
  streak_days: number
  words_learned: number
  idioms_learned: number
  grammar_completed: number
  reading_completed: number
  listening_completed: number
  overall_accuracy: number
  pass_probability: number
}

/** 日次学習データ */
export interface DailyStudyData {
  date: string
  study_time: number
  exp_earned: number
  words_learned: number
  accuracy: number
}

/** 週間ランキング */
export interface WeeklyRanking {
  rank: number
  user_id: string
  display_name: string
  avatar_url?: string
  exp_earned: number
}

/** AIチャットメッセージ */
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

/** フラッシュカード評価 */
export type CardQuality = 1 | 2 | 3 | 4 | 5

/** レスポンス共通型 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/** ページネーションレスポンス */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  page_size: number
  has_more: boolean
}
