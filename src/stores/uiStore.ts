/**
 * UI状態管理ストア
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface UIState {
  /** テーマ */
  theme: Theme
  /** サイドバーの開閉状態 */
  isSidebarOpen: boolean
  /** 音声有効フラグ */
  isSoundEnabled: boolean
  /** 自動再生フラグ */
  isAutoPlayEnabled: boolean
  /** トースト通知 */
  toasts: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>

  /** テーマを設定 */
  setTheme: (theme: Theme) => void
  /** サイドバーを切り替え */
  toggleSidebar: () => void
  /** 音声を切り替え */
  toggleSound: () => void
  /** 自動再生を切り替え */
  toggleAutoPlay: () => void
  /** トーストを追加 */
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void
  /** トーストを削除 */
  removeToast: (id: string) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      isSidebarOpen: false,
      isSoundEnabled: true,
      isAutoPlayEnabled: false,
      toasts: [],

      setTheme: (theme) => {
        set({ theme })
      },

      toggleSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
      },

      toggleSound: () => {
        set((state) => ({ isSoundEnabled: !state.isSoundEnabled }))
      },

      toggleAutoPlay: () => {
        set((state) => ({ isAutoPlayEnabled: !state.isAutoPlayEnabled }))
      },

      addToast: (message, type = 'info') => {
        const id = Math.random().toString(36).substring(2)
        set((state) => ({
          toasts: [...state.toasts, { id, message, type }],
        }))

        // 自動で削除
        setTimeout(() => {
          get().removeToast(id)
        }, 3000)
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      },
    }),
    {
      name: 'ui-storage',
    }
  )
)
