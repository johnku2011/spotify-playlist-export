import Papa from "papaparse";
import {
  CSVRow,
  SpotifyPlaylist,
  SpotifyPlaylistTrack,
} from "@/types/spotify";

/**
 * Sanitize a string to prevent CSV injection attacks
 * Escapes cells that start with =, +, -, @, or Tab characters
 */
function sanitizeCSVField(value: string | number | boolean): string | number | boolean {
  if (typeof value !== "string") {
    return value;
  }

  // Check if the string starts with potentially dangerous characters
  const dangerousChars = ["=", "+", "-", "@", "\t", "\r"];
  const startsWithDangerousChar = dangerousChars.some((char) =>
    value.startsWith(char)
  );

  if (startsWithDangerousChar) {
    // Prepend with a single quote to neutralize the formula
    return `'${value}`;
  }

  return value;
}

/**
 * Format duration from milliseconds to MM:SS format
 */
export function formatDuration(durationMs: number): string {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Convert playlist tracks to CSV rows with sanitization
 */
export function tracksToCSVRows(
  playlist: SpotifyPlaylist,
  tracks: SpotifyPlaylistTrack[]
): CSVRow[] {
  return tracks
    .filter((item) => item.track) // Filter out null tracks (deleted tracks)
    .map((item) => {
      const track = item.track;
      return {
        playlist_id: sanitizeCSVField(playlist.id) as string,
        playlist_name: sanitizeCSVField(playlist.name) as string,
        playlist_owner: sanitizeCSVField(playlist.owner.display_name) as string,
        playlist_public: playlist.public,
        track_name: sanitizeCSVField(track.name) as string,
        artists: sanitizeCSVField(
          track.artists.map((artist) => artist.name).join("; ")
        ) as string,
        album_name: sanitizeCSVField(track.album.name) as string,
        album_release_date: sanitizeCSVField(track.album.release_date) as string,
        duration_ms: track.duration_ms,
        duration_min: formatDuration(track.duration_ms),
        explicit: track.explicit,
        popularity: track.popularity,
        added_at: sanitizeCSVField(item.added_at) as string,
        track_uri: sanitizeCSVField(track.uri) as string,
      };
    });
}

/**
 * Generate CSV string from CSV rows
 */
export function generateCSV(rows: CSVRow[]): string {
  return Papa.unparse(rows, {
    quotes: true,
    header: true,
    columns: [
      "playlist_id",
      "playlist_name",
      "playlist_owner",
      "playlist_public",
      "track_name",
      "artists",
      "album_name",
      "album_release_date",
      "duration_ms",
      "duration_min",
      "explicit",
      "popularity",
      "added_at",
      "track_uri",
    ],
  });
}

/**
 * Trigger browser download of CSV file
 */
export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

