import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";

const SPOTIFY_SCOPES = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-private",
  "user-read-email",
  "user-library-read", // For accessing liked songs
].join(" ");

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  basePath: "/api/auth",
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: SPOTIFY_SCOPES,
        },
      },
    }),
  ],
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, account, profile }): Promise<JWT> {
      // Initial sign in
      if (account && profile) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at! * 1000, // Convert to milliseconds
          user: profile as any,
        } as JWT;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to refresh it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.error = token.error as string | undefined;
      if (token.user) {
        session.user = {
          ...session.user,
          id: token.user.id,
          name: token.user.display_name,
          email: token.user.email,
          image: token.user.images?.[0]?.url,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});

/**
 * Refresh the access token using the refresh token
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url = "https://accounts.spotify.com/api/token";
    const basicAuth = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error refreshing access token:", error);
    }
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

