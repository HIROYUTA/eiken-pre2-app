/**
 * 学習進捗管理ストア
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProgress, StudySession, ReviewSchedule } from '@/types'
import { CONTENT_TYPES } from '@/lib/constants'

interface ProgressState {
  /** 今日の学習時間（秒） */
  todayStudyTime: number
  /** 連続学習日数 */
  streakDays: number
  /** 学習進捗 */
  progress: Record<string, UserProgress>
  /** 復習スケジュール */
  reviewSchedule: Record<string, ReviewSchedule>
  /** 最近の学習セッション */
  recentSessions: StudySession[]

  /** 学習時間を追加 */
  addStudyTime: (seconds: number, contentType: string) => void
  /** 進捗を更新 */
  updateProgress: (progress: UserProgress) => void
  /** 復習スケジュールを更新 */
  updateReviewSchedule: (schedule: ReviewSchedule) => void
  /** 復習対象を取得 */
  getDueReviews: () => ReviewSchedule[]
  /** 連続学習日数を更新 */
  updateStreakDays: (days: number) => void
  /** セッションを追加 */
  addSession: (session: StudySession) => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      todayStudyTime: 0,
      streakDays: 0,
      progress: {},
      reviewSchedule: {},
      recentSessions: [],

      addStudyTime: (seconds, contentType) => {
        set((state) => ({
          todayStudyTime: state.todayStudyTime + seconds,
        }))
      },

      updateProgress: (progress) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [`${progress.content_type}-${progress.content_id}`]: progress,
          },
        }))
      },

      updateReviewSchedule: (schedule) => {
        set((state) => ({
          reviewSchedule: {
            ...state.reviewSchedule,
            [`${schedule.content_type}-${schedule.content_id}`]: schedule,
          },
        }))
      },

      getDueReviews: () => {
        const { reviewSchedule } = get()
        const now = new Date()
        const dueReviews: ReviewSchedule[] = []

        Object.values(reviewSchedule).forEach((schedule) => {
          const reviewDate = new Date(schedule.next_review)
          if (reviewDate <= now) {
            dueReviews.push(schedule)
          }
        })

        return dueReviews
      },

      updateStreakDays: (days) => {
        set({ streakDays: days })
      },

      addSession: (session) => {
        set((state) => ({
          recentSessions: [session, ...state.recentSessions].slice(0, 10),
        }))
      },
    }),
    {
      name: 'progress-storage',
      partialize: (state) => ({
        todayStudyTime: state.todayStudyTime,
        streakDays: state.streakDays,
        progress: state.progress,
        reviewSchedule: state.reviewSchedule,
      }),
    }
  )
)
