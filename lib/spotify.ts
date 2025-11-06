import {
  SpotifyPlaylistsResponse,
  SpotifyPlaylistTracksResponse,
  SpotifyPlaylist,
  SpotifyPlaylistTrack,
} from "@/types/spotify";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

interface FetchWithRetryOptions {
  maxRetries?: number;
  initialDelay?: number;
}

/**
 * Fetch with exponential backoff retry logic
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  { maxRetries = 3, initialDelay = 1000 }: FetchWithRetryOptions = {}
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const delay = retryAfter
          ? parseInt(retryAfter) * 1000
          : initialDelay * Math.pow(2, attempt);

        console.log(`Rate limited. Retrying after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      // Handle server errors (5xx)
      if (response.status >= 500) {
        if (attempt < maxRetries) {
          const delay = initialDelay * Math.pow(2, attempt);
          console.log(`Server error. Retrying after ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        const delay = initialDelay * Math.pow(2, attempt);
        console.log(`Request failed. Retrying after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error("Max retries exceeded");
}

/**
 * Fetch all user playlists with pagination
 */
export async function fetchAllPlaylists(
  accessToken: string
): Promise<SpotifyPlaylist[]> {
  const playlists: SpotifyPlaylist[] = [];
  let url: string | null = `${SPOTIFY_API_BASE}/me/playlists?limit=50`;

  console.log("Fetching playlists from:", url);

  while (url) {
    const response = await fetchWithRetry(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Playlist fetch response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spotify API error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Failed to fetch playlists: ${response.statusText} - ${errorText}`);
    }

    const data: SpotifyPlaylistsResponse = await response.json();
    console.log("Spotify API response:", JSON.stringify(data, null, 2));
    console.log(`Fetched ${data.items?.length || 0} playlists in this batch`);
    console.log(`Total in response: ${data.total}, Limit: ${data.limit}, Offset: ${data.offset}`);
    
    if (data.items && data.items.length > 0) {
      playlists.push(...data.items);
    }
    url = data.next;
  }

  return playlists;
}

/**
 * Fetch all tracks for a specific playlist with pagination
 */
export async function fetchPlaylistTracks(
  accessToken: string,
  playlistId: string
): Promise<SpotifyPlaylistTrack[]> {
  const tracks: SpotifyPlaylistTrack[] = [];
  let url: string | null = `${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks?limit=50`;

  while (url) {
    const response = await fetchWithRetry(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch tracks for playlist ${playlistId}: ${response.statusText}`
      );
    }

    const data: SpotifyPlaylistTracksResponse = await response.json();
    tracks.push(...data.items);
    url = data.next;
  }

  return tracks;
}

/**
 * Fetch a single playlist's metadata
 */
export async function fetchPlaylist(
  accessToken: string,
  playlistId: string
): Promise<SpotifyPlaylist> {
  const response = await fetchWithRetry(
    `${SPOTIFY_API_BASE}/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch playlist ${playlistId}: ${response.statusText}`
    );
  }

  return response.json();
}

