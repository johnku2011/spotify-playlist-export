import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchAllPlaylists, fetchSavedTracks } from "@/lib/spotify";
import { SpotifyPlaylist } from "@/types/spotify";

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

    // Fetch saved tracks count to create a pseudo-playlist for Liked Songs
    let likedSongsPlaylist: SpotifyPlaylist | null = null;
    try {
      const savedTracksResponse = await fetch(
        "https://api.spotify.com/v1/me/tracks?limit=1",
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      if (savedTracksResponse.ok) {
        const savedTracksData = await savedTracksResponse.json();
        const totalSavedTracks = savedTracksData.total || 0;

        if (totalSavedTracks > 0) {
          // Create a pseudo-playlist for Liked Songs
          likedSongsPlaylist = {
            id: "liked-songs", // Special ID for liked songs
            name: "Liked Songs",
            description: "Your liked songs collection",
            public: false,
            collaborative: false,
            owner: {
              id: session.user?.id || "",
              display_name: session.user?.name || "You",
              external_urls: {
                spotify: "",
              },
              href: "",
              type: "user",
              uri: "",
            },
            tracks: {
              href: "https://api.spotify.com/v1/me/tracks",
              total: totalSavedTracks,
            },
            images: [
              {
                url: "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png",
                height: 300,
                width: 300,
              },
            ],
            external_urls: {
              spotify: "https://open.spotify.com/collection/tracks",
            },
            href: "",
            snapshot_id: "",
            type: "playlist",
            uri: "spotify:user:liked-songs",
          };
        }
      }
    } catch (error) {
      // Continue without liked songs if there's an error
    }

    // Combine Liked Songs with regular playlists (Liked Songs first)
    const allPlaylists = likedSongsPlaylist
      ? [likedSongsPlaylist, ...playlists]
      : playlists;

    return NextResponse.json({ playlists: allPlaylists });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch playlists";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

