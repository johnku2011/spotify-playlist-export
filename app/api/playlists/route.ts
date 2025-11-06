import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchAllPlaylists } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    console.log("Session in /api/playlists:", {
      hasSession: !!session,
      hasAccessToken: !!session?.accessToken,
      error: session?.error,
      userEmail: session?.user?.email,
    });

    if (!session || !session.accessToken) {
      console.error("No session or access token:", {
        session: !!session,
        accessToken: !!session?.accessToken,
      });
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (session.error === "RefreshAccessTokenError") {
      console.error("Token refresh error");
      return NextResponse.json(
        { error: "Token refresh failed. Please sign in again." },
        { status: 401 }
      );
    }

    const playlists = await fetchAllPlaylists(session.accessToken);
    console.log(`Fetched ${playlists.length} playlists`);

    return NextResponse.json({ playlists });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch playlists";
    console.error("Error details:", {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

