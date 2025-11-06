import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchPlaylist, fetchPlaylistTracks, fetchSavedTracks } from "@/lib/spotify";
import { tracksToCSVRows, generateCSV } from "@/lib/csv";
import { CSVRow, SpotifyPlaylist } from "@/types/spotify";

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
      let playlist: SpotifyPlaylist;
      let tracks;

      // Handle special "liked-songs" ID
      if (playlistId === "liked-songs") {
        // Create a pseudo-playlist object for Liked Songs
        playlist = {
          id: "liked-songs",
          name: "Liked Songs",
          description: "Your liked songs collection",
          public: false,
          collaborative: false,
          owner: {
            id: session.user?.id || "",
            display_name: session.user?.name || "You",
            external_urls: { spotify: "" },
            href: "",
            type: "user",
            uri: "",
          },
          tracks: {
            href: "https://api.spotify.com/v1/me/tracks",
            total: 0, // Will be updated by actual count
          },
          images: [],
          external_urls: {
            spotify: "https://open.spotify.com/collection/tracks",
          },
          href: "",
          snapshot_id: "",
          type: "playlist",
          uri: "spotify:user:liked-songs",
        };
        tracks = await fetchSavedTracks(session.accessToken);
      } else {
        [playlist, tracks] = await Promise.all([
          fetchPlaylist(session.accessToken, playlistId),
          fetchPlaylistTracks(session.accessToken, playlistId),
        ]);
      }

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
    return NextResponse.json(
      { error: "Failed to export playlists" },
      { status: 500 }
    );
  }
}

