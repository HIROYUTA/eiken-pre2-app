/**
 * 忘却曲線（SM-2アルゴリズム）用フック
 */

import { SPACED_REPETITION_DEFAULTS } from '@/lib/constants'
import type { CardQuality, ReviewSchedule } from '@/types'

/**
 * SM-2アルゴリズムで次回復習日を計算する
 */
export function calculateNextReview(
  currentSchedule: ReviewSchedule | null,
  quality: CardQuality
): Omit<ReviewSchedule, 'id' | 'user_id' | 'content_type' | 'content_id'> {
  // 初期値
  let interval = currentSchedule?.interval ?? SPACED_REPETITION_DEFAULTS.INITIAL_INTERVAL
  let easeFactor =
    currentSchedule?.ease_factor ?? SPACED_REPETITION_DEFAULTS.INITIAL_EASE_FACTOR

  // 易しさ係数を更新
  // EF' = EF + (0.1 - (3 - quality) × (0.08 + (3 - quality) × 0.02))
  easeFactor =
    easeFactor +
    (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02))

  // 最小値を保証
  easeFactor = Math.max(
    easeFactor,
    SPACED_REPETITION_DEFAULTS.MIN_EASE_FACTOR
  )

  // 間隔を計算
  if (quality < 3) {
    // 間違えた場合は初めから
    interval = SPACED_REPETITION_DEFAULTS.INITIAL_INTERVAL
  } else {
    // 正解した場合は間隔を伸ばす
    interval = interval * easeFactor
  }

  // 次回復習日を計算
  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + Math.floor(interval))

  return {
    next_review: nextReviewDate.toISOString(),
    interval: Math.floor(interval),
    ease_factor: parseFloat(easeFactor.toFixed(2)),
    quality,
  }
}

/**
 * 復習が必要かどうかを判定する
 */
export function isReviewDue(schedule: ReviewSchedule): boolean {
  const now = new Date()
  const reviewDate = new Date(schedule.next_review)
  return reviewDate <= now
}

/**
 * 復習までの残り日数を計算する
 */
export function getDaysUntilReview(schedule: ReviewSchedule): number {
  const now = new Date()
  const reviewDate = new Date(schedule.next_review)
  const diffTime = reviewDate.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * 品質評価の表示テキストを取得する
 */
export function getQualityLabel(quality: CardQuality): string {
  const labels = {
    1: '全くわからなかった',
    2: '難しく感じた',
    3: '何とか覚えた',
    4: '少し迷った',
    5: '完全に覚えた',
  }
  return labels[quality]
}
