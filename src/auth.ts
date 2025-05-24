import { login } from '@/services/account';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const protectedRoutes = ['/main/mypage']; // 보호된 라우트 목록
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
    maxAge: 86400000, // 1000ms * 60초 * 60분 * 24시간 = 1일
  },
  pages: {
    signIn: '/login/email',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
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
        return Response.redirect(new URL('/main/map', nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshTokenInfo = user.refreshTokenInfo;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshTokenInfo = token.refreshTokenInfo;

      return session;
    },
  },
});
