/**
 * 認証関連のカスタムフック
 */

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { getLocalAuth } from '@/lib/auth/localAuth'

export function useAuth() {
  const { user, isLoading, isAuthenticated, setUser, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    // ローカルストレージから認証状態を復元
    const auth = getLocalAuth()

    if (auth.user) {
      setUser(auth.user)
    }

    // ログイン状態の永続化チェック
    const interval = setInterval(() => {
      const currentAuth = getLocalAuth()
      if (!currentAuth.isAuthenticated && isAuthenticated) {
        logout()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [setUser, logout, isAuthenticated])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    logout: handleLogout,
  }
}
