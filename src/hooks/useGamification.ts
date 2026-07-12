/**
 * ゲーミフィケーション関連のフック
 */

import { LEVEL_EXP_REQUIREMENTS, EXP_REWARDS, BADGES } from '@/lib/constants'
import type { Badge } from '@/types'

/**
 * レベルアップに必要な残りEXPを計算する
 */
export function getExpToNextLevel(currentExp: number, currentLevel: number): number {
  const nextLevel = currentLevel + 1
  const nextLevelExp = LEVEL_EXP_REQUIREMENTS[nextLevel]

  if (!nextLevelExp) return 0

  return Math.max(0, nextLevelExp - currentExp)
}

/**
 * EXPからレベルを計算する
 */
export function calculateLevelFromExp(exp: number): number {
  let level = 1

  for (const [lvl, requiredExp] of Object.entries(LEVEL_EXP_REQUIREMENTS)) {
    if (exp >= requiredExp) {
      level = parseInt(lvl)
    } else {
      break
    }
  }

  return level
}

/**
 * 実績解除状況をチェックする
 */
export function checkBadgeUnlock(
  achievements: Record<string, Date>,
  badgeId: string
): boolean {
  return !!achievements[badgeId]
}

/**
 * 全てのバッジを取得する
 */
export function getAllBadges(unlockedBadges: Record<string, Date> = {}): Badge[] {
  return Object.values(BADGES).map((badge) => ({
    id: badge.id,
    name: badge.name,
    description: badge.description,
    icon: badge.icon,
    unlocked_at: unlockedBadges[badge.id]?.toISOString(),
  }))
}

/**
 * 連続ログインボーナスを計算する
 */
export function calculateStreakBonus(streakDays: number): number {
  // 連続日数が多いほどボーナスが増える（最大2倍）
  const multiplier = Math.min(1 + (streakDays * 0.02), 2)
  return parseFloat(multiplier.toFixed(2))
}

/**
 * 学習時間からEXPを計算する
 */
export function calculateExpFromStudyTime(seconds: number): number {
  // 1分あたり約0.5EXP
  return Math.floor(seconds / 120)
}

/**
 * 正答率から評価を取得する
 */
export function getAccuracyRating(accuracy: number): string {
  if (accuracy >= 90) return 'S'
  if (accuracy >= 80) return 'A'
  if (accuracy >= 70) return 'B'
  if (accuracy >= 60) return 'C'
  return 'D'
}
