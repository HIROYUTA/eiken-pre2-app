/**
 * アプリケーション全体で使用する定数
 */

/** コンテンツタイプ */
export const CONTENT_TYPES = {
  WORD: 'word',
  IDIOM: 'idiom',
  GRAMMAR: 'grammar',
  READING: 'reading',
  LISTENING: 'listening',
  WRITING: 'writing',
  MOCK_EXAM: 'mock_exam',
} as const

/** コンテンツタイプの型 */
export type ContentType = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES]

/** 難易度レベル */
export const DIFFICULTY_LEVELS = {
  BEGINNER: 1,
  ELEMENTARY: 2,
  INTERMEDIATE: 3,
  UPPER_INTERMEDIATE: 4,
  ADVANCED: 5,
} as const

/** 学習ステータス */
export const LEARNING_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  MASTERED: 'mastered',
  NEED_REVIEW: 'need_review',
} as const

/** 文法カテゴリ */
export const GRAMMAR_CATEGORIES = {
  TENSE: 'tense',
  PASSIVE: 'passive',
  INFINITIVE: 'infinitive',
  GERUND: 'gerund',
  RELATIVE_PRONOUN: 'relative_pronoun',
  COMPARISON: 'comparison',
  SUBJUNCTIVE: 'subjunctive',
  CONJUNCTION: 'conjunction',
} as const

/** 文法カテゴリの表示名 */
export const GRAMMAR_CATEGORY_LABELS: Record<string, string> = {
  [GRAMMAR_CATEGORIES.TENSE]: '時制',
  [GRAMMAR_CATEGORIES.PASSIVE]: '受動態',
  [GRAMMAR_CATEGORIES.INFINITIVE]: '不定詞',
  [GRAMMAR_CATEGORIES.GERUND]: '動名詞',
  [GRAMMAR_CATEGORIES.RELATIVE_PRONOUN]: '関係代名詞',
  [GRAMMAR_CATEGORIES.COMPARISON]: '比較',
  [GRAMMAR_CATEGORIES.SUBJUNCTIVE]: '仮定法',
  [GRAMMAR_CATEGORIES.CONJUNCTION]: '接続詞',
}

/** レベルごとの必要EXP */
export const LEVEL_EXP_REQUIREMENTS: Record<number, number> = (() => {
  const requirements: Record<number, number> = { 1: 0 }
  let totalExp = 0

  for (let level = 2; level <= 50; level++) {
    // レベルが上がるほど必要EXPが増える
    totalExp += Math.floor(100 * Math.pow(1.1, level - 2))
    requirements[level] = totalExp
  }

  return requirements
})()

/** レベルごとのタイトル */
export const LEVEL_TITLES: Record<number, string> = (() => {
  const titles: Record<number, string> = {}

  for (let level = 1; level <= 50; level++) {
    if (level <= 5) titles[level] = '初級者'
    else if (level <= 10) titles[level] = '入門者'
    else if (level <= 20) titles[level] = '中級者'
    else if (level <= 30) titles[level] = '上級者'
    else if (level <= 40) titles[level] = '準合格'
    else titles[level] = '合格間近'
  }

  return titles
})()

/** バッジ定義 */
export const BADGES = {
  FIRST_LESSON: {
    id: 'first_lesson',
    name: '最初の一歩',
    description: '初めてレッスンを完了',
    icon: '🎯',
  },
  THREE_DAY_STREAK: {
    id: 'three_day_streak',
    name: '三日坊主卒業',
    description: '3日連続で学習',
    icon: '🔥',
  },
  SEVEN_DAY_STREAK: {
    id: 'seven_day_streak',
    name: '一週間継続',
    description: '7日連続で学習',
    icon: '⭐',
  },
  THIRTY_DAY_STREAK: {
    id: 'thirty_day_streak',
    name: 'マンスリー達成',
    description: '30日連続で学習',
    icon: '👑',
  },
  WORD_MASTER: {
    id: 'word_master',
    name: '単語マスター',
    description: '1000語を習得',
    icon: '📚',
  },
  GRAMMAR_EXPERT: {
    id: 'grammar_expert',
    name: '文法エキスパート',
    description: '全ての文法カテゴリをクリア',
    icon: '📝',
  },
  READING_CHAMPION: {
    id: 'reading_champion',
    name: '読解チャンピオン',
    description: '長文読解を50問クリア',
    icon: '📖',
  },
  LISTENING_PRO: {
    id: 'listening_pro',
    name: 'リスニングプロ',
    description: 'リスニングを50問クリア',
    icon: '🎧',
  },
  PERFECT_SCORE: {
    id: 'perfect_score',
    name: '満点王',
    description: '模試で満点を取得',
    icon: '💯',
  },
} as const

/** EXP獲得量 */
export const EXP_REWARDS = {
  WORD_LEARNED: 5,
  IDIOM_LEARNED: 5,
  GRAMMAR_CORRECT: 10,
  READING_CORRECT: 15,
  LISTENING_CORRECT: 15,
  WRITING_SUBMITTED: 30,
  MOCK_EXAM_COMPLETED: 100,
  DAILY_LOGIN: 20,
} as const

/** 忘却曲線（SM-2）の初期設定 */
export const SPACED_REPETITION_DEFAULTS = {
  INITIAL_INTERVAL: 1, // 初期間隔（日）
  INITIAL_EASE_FACTOR: 2.5, // 初期易しさ係数
  MIN_EASE_FACTOR: 1.3, // 最小易しさ係数
} as const

/** 模試の制限時間（分） */
export const MOCK_EXAM_TIME_LIMIT = 50 // 50分

/** 模試の合格点 */
export const MOCK_EXAM_PASSING_SCORE = 60 // 60点

/** 1日の学習目標時間（分） */
export const DAILY_STUDY_GOAL_MINUTES = 20

/** 連続ログインボーナス */
export const STREAK_BONUS_MULTIPLIER = 1.1 // 連続ログインでEXPが1.1倍

/** APIリクエストの遅延（ミリ秒） */
export const API_DEBOUNCE_MS = 300

/** ページネーション */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const

/** ローカルストレージキー */
export const STORAGE_KEYS = {
  THEME: 'eiken-pre2-theme',
  SOUND_ENABLED: 'eiken-pre2-sound',
  AUTO_PLAY_AUDIO: 'eiken-pre2-autoplay',
  LAST_STUDY_DATE: 'eiken-pre2-last-study',
} as const
