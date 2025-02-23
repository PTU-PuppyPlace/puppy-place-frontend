import { login } from '@/services/account';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
        const user = await login({
          username: credentials.username as string,
          password: credentials.password as string,
        });
        if (user.isSuccess) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // JSON Web Token 사용
  },
  pages: {
    signIn: '/login/email',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (new Date() > new Date(token.refreshTokenInfo?.expiresAt)) {
        token.refreshTokenExpired = true;
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (token.refreshTokenExpired) {
        session.refreshTokenExpired = true;
      }

      return {
        ...session,
        ...token,
      };
    },
  },
});
