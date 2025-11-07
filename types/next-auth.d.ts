import { DefaultSession } from "next-auth";

// Extended user type for Spotify profile
export interface SpotifyProfile {
  id: string;
  display_name: string;
  email: string;
  images?: Array<{
    url: string;
    height?: number | null;
    width?: number | null;
  }>;
  country?: string;
  product?: string;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
    user?: SpotifyProfile;
  }
}

