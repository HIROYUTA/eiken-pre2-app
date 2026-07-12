/**
 * サーバー用Supabaseクライアントの設定
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * サーバー用のSupabaseクライアントを作成
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // サーバーコンポーネントではsetAllが利用できない場合がある
          }
        },
      },
    }
  )
}

/**
 * サービスロール用のSupabaseクライアントを作成（管理者用）
 */
import { createClient as createServiceClient } from '@supabase/supabase-js'

export function createServiceRoleClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
