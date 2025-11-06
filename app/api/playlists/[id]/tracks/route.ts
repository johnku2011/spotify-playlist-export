import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchPlaylistTracks, fetchSavedTracks } from "@/lib/spotify";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id: playlistId } = await params;
    
    // Check if this is the special "liked-songs" ID
    let tracks;
    if (playlistId === "liked-songs") {
      tracks = await fetchSavedTracks(session.accessToken);
    } else {
      tracks = await fetchPlaylistTracks(session.accessToken, playlistId);
    }

    return NextResponse.json({ tracks });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch playlist tracks" },
      { status: 500 }
    );
  }
}

