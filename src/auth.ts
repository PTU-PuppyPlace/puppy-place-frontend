import { login } from '@/services/account';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const protectedRoutes = ['/mypage']; // 보호된 라우트 목록
const protectedWhenLoggedIn = ['/login', '/signup']; // 로그인된 사용자가 접근할 때 보호된 라우트 목록

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update, // Beta!
} = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await login({
            username: credentials.username as string,
            password: credentials.password as string,
          });

          console.log('user', user);
          if (user.isSuccess) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error('로그인 에러:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  pages: {
    signIn: '/login/email',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );
      const isProtectedWhenLoggedIn = protectedWhenLoggedIn.some((route) =>
        nextUrl.pathname.startsWith(route)
      );
      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isProtectedWhenLoggedIn) {
        return Response.redirect(new URL('/map', nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshTokenInfo = user.refreshTokenInfo;
      }

      if (token.refreshTokenInfo?.expiresAt) {
        if (new Date() > new Date(token.refreshTokenInfo.expiresAt)) {
          token.refreshTokenExpired = true;
        }
      }

      return token;
    },
  },
});
