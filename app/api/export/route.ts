import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchPlaylist, fetchPlaylistTracks } from "@/lib/spotify";
import { tracksToCSVRows, generateCSV } from "@/lib/csv";
import { CSVRow } from "@/types/spotify";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.error === "RefreshAccessTokenError") {
      return NextResponse.json(
        { error: "Token refresh failed. Please sign in again." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { playlistIds } = body as { playlistIds: string[] };

    if (!playlistIds || !Array.isArray(playlistIds) || playlistIds.length === 0) {
      return NextResponse.json(
        { error: "Invalid playlist IDs" },
        { status: 400 }
      );
    }

    const allRows: CSVRow[] = [];

    // Fetch tracks for each selected playlist
    for (const playlistId of playlistIds) {
      const [playlist, tracks] = await Promise.all([
        fetchPlaylist(session.accessToken, playlistId),
        fetchPlaylistTracks(session.accessToken, playlistId),
      ]);

      const rows = tracksToCSVRows(playlist, tracks);
      allRows.push(...rows);
    }

    // Generate CSV
    const csv = generateCSV(allRows);

    // Return CSV as downloadable file
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="spotify-playlists-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting playlists:", error);
    return NextResponse.json(
      { error: "Failed to export playlists" },
      { status: 500 }
    );
  }
}

