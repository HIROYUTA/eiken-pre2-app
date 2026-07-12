/**
 * ローカル認証システム
 * Supabaseが設定されていない場合に使用
 */

import type { User } from '@/types'

const STORAGE_KEY = 'eiken_local_auth'

export interface LocalAuthData {
  user: User | null
  isAuthenticated: boolean
}

/**
 * ローカルストレージから認証データを取得
 */
export function getLocalAuth(): LocalAuthData {
  if (typeof window === 'undefined') {
    return { user: null, isAuthenticated: false }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      return {
        user: data.user,
        isAuthenticated: !!data.user,
      }
    }
  } catch (error) {
    console.error('Failed to get local auth:', error)
  }

  return { user: null, isAuthenticated: false }
}

/**
 * ローカルストレージに認証データを保存
 */
export function setLocalAuth(user: User | null): void {
  if (typeof window === 'undefined') return

  try {
    const data: LocalAuthData = {
      user,
      isAuthenticated: !!user,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to set local auth:', error)
  }
}

/**
 * ローカルストレージから認証データを削除
 */
export function clearLocalAuth(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear local auth:', error)
  }
}

/**
 * メールアドレスで新規登録
 */
export async function localSignup(email: string, password: string, displayName: string): Promise<User> {
  // パスワードは8文字以上
  if (password.length < 8) {
    throw new Error('パスワードは8文字以上である必要があります')
  }

  // 既存ユーザーチェック
  const auth = getLocalAuth()
  if (auth.user?.email === email) {
    throw new Error('このメールアドレスは既に登録されています')
  }

  // ユーザー作成
  const newUser: User = {
    id: generateId(),
    email,
    display_name: displayName,
    provider: 'email',
    level: 1,
    exp: 0,
    streak_days: 0,
    total_study_time: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  setLocalAuth(newUser)

  return newUser
}

/**
 * メールアドレスでログイン
 */
export async function localLogin(email: string, password: string): Promise<User> {
  // 簡易的な認証（実際にはパスワードハッシュ化が必要）
  const stored = localStorage.getItem(`eiken_user_${email}`)

  if (!stored) {
    throw new Error('メールアドレスまたはパスワードが正しくありません')
  }

  const userData = JSON.parse(stored)

  // パスワードチェック（簡易版）
  if (userData.password !== password) {
    throw new Error('メールアドレスまたはパスワードが正しくありません')
  }

  const user: User = {
    id: userData.id,
    email: userData.email,
    display_name: userData.display_name,
    provider: 'email',
    level: userData.level || 1,
    exp: userData.exp || 0,
    streak_days: userData.streak_days || 0,
    total_study_time: userData.total_study_time || 0,
    created_at: userData.created_at,
    updated_at: userData.updated_at,
  }

  setLocalAuth(user)

  return user
}

/**
 * ユーザーデータを保存
 */
export function saveUserData(email: string, password: string, user: User): void {
  if (typeof window === 'undefined') return

  try {
    const userData = {
      ...user,
      password, // 注意: 実際にはハッシュ化が必要
    }
    localStorage.setItem(`eiken_user_${email}`, JSON.stringify(userData))
  } catch (error) {
    console.error('Failed to save user data:', error)
  }
}

/**
 * ログアウト
 */
export function localLogout(): void {
  clearLocalAuth()
}

/**
 * ランダムID生成
 */
function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}
