import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchAllPlaylists } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (session.error === "RefreshAccessTokenError") {
      return NextResponse.json(
        { error: "Token refresh failed. Please sign in again." },
        { status: 401 }
      );
    }

    const playlists = await fetchAllPlaylists(session.accessToken);

    return NextResponse.json({ playlists });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json(
      { error: "Failed to fetch playlists" },
      { status: 500 }
    );
  }
}

