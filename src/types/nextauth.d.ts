export declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshTokenInfo?: {
      token: User.refreshTokenInfo.token;
      expiresAt: User.refreshTokenInfo.expiresAt;
    };
  }
  interface Session {
    accessToken?: User.accessToken;
    refreshTokenInfo?: {
      token: User.refreshTokenInfo.token;
      expiresAt: User.refreshTokenInfo.expiresAt;
    };
    refreshTokenExpired?: boolean;
  }
}
export declare module '@auth/core/jwt' {
  interface JWT {
    accessToken?: User.accessToken;
    refreshTokenInfo?: {
      token: User.refreshTokenInfo.token;
      expiresAt: User.refreshTokenInfo.expiresAt;
    };
    refreshTokenExpired?: boolean;
  }
}
