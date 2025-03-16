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
    maxAge: 30 * 24 * 60 * 60, // 일단 클라이언트에 저장되는 건 30일로 설정.
  },
  pages: {
    signIn: '/login/email',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isTokenExpired = auth?.refreshTokenExpired;

      const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );
      const isProtectedWhenLoggedIn = protectedWhenLoggedIn.some((route) =>
        nextUrl.pathname.startsWith(route)
      );

      // TODO: refreshToken 만료 시 정상적으로 로그아웃되고 로그인 페이지로 리다이렉트되는지 확인해야 함
      if (isTokenExpired) {
        await signOut();
        return Response.redirect(new URL('/login', nextUrl));
      }

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

      if (token.refreshTokenInfo?.expiresAt) {
        if (new Date() > new Date(token.refreshTokenInfo.expiresAt)) {
          token.refreshTokenExpired = true;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshTokenInfo = token.refreshTokenInfo;
      session.refreshTokenExpired = token.refreshTokenExpired;

      return session;
    },
  },
});
