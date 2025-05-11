export declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshTokenInfo?: {
      token: User.refreshTokenInfo.token;
      expiresAt: User.refreshTokenInfo.expiresAt;
    };
    username?: string;
  }
  interface Session {
    accessToken?: User.accessToken;
    refreshTokenInfo?: {
      token: User.refreshTokenInfo.token;
      expiresAt: User.refreshTokenInfo.expiresAt;
    };
    user?: {
      username?: string;
    } & DefaultSession['user'];
  }
}
export declare module '@auth/core/jwt' {
  interface JWT {
    accessToken?: User.accessToken;
    refreshTokenInfo?: {
      token: User.refreshTokenInfo.token;
      expiresAt: User.refreshTokenInfo.expiresAt;
    };
    username?: string;
    loginMethod?: string;
  }
}
