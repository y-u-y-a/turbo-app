# セッション管理設計 (App Router)

## 1. NextAuthの設定

### セッションストラテジー
- `jwt`方式を採用
  - データベースアクセスが少なく、パフォーマンスが良い
  - JWTトークンにユーザー情報を格納可能

### セッション設定
```typescript:auth.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30日間
    updateAge: 24 * 60 * 60,    // 24時間ごとに更新
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.userId
      return session
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
## 2. セッション情報の型定義

```typescript:types/next-auth.d.ts
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image?: string
    }
  }
}
```

## 3. セッション管理方針

### クライアントサイド
- `useSession`フックを使用
- セッション切れの自動検知と再ログイン
- ログイン必須ページの保護

```typescript:components/AuthGuard.tsx
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export function AuthGuard({ children }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  return <>{children}</>
}
```

### サーバーサイド
- `getServerSideProps`でのセッション確認
- API routesでの認証チェック

```typescript:middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // 認証が必要なパスの制御
      if (req.nextUrl.pathname.startsWith('/api/')) {
        return !!token
      }
      return true
    },
  },
})

export const config = {
  matcher: [
    '/api/:path*',
    '/reports/:path*',
    '/invoices/:path*',
  ],
}
```

## 4. セキュリティ対策

### CSRF対策
- NextAuthの組み込みCSRF保護を使用
- セッショントークンの検証

### XSS対策
- HTTPOnly Cookieの使用
- Content Security Policy (CSP)の設定

```typescript:next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
    `
  },
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

## 5. エラーハンドリング

### セッション切れ
- 自動リダイレクト
- ユーザーデータの一時保存
- 再ログイン後の復帰

```typescript:hooks/useAuthRedirect.ts
export function useAuthRedirect() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      // 現在のURLを保存
      sessionStorage.setItem('redirectUrl', router.asPath)
      router.push('/auth/signin')
    }
  }, [status, router])

  return { session, status }
}
```

## 6. パフォーマンス最適化

### キャッシュ戦略
- セッション情報のメモリキャッシュ
- JWTの検証結果キャッシュ

### 更新頻度
- セッショントークン：30日
- 更新チェック：24時間
- ステータスポーリング：無効

## 7. 監視とロギング

### セッション関連イベント
- ログイン/ログアウト
- セッション更新
- 認証エラー

```typescript:lib/logger.ts
export const logAuthEvent = (event: string, userId: string, details?: any) => {
  console.log({
    timestamp: new Date().toISOString(),
    event,
    userId,
    details,
  })
}
``` 