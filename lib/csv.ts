import Papa from "papaparse";
import {
  CSVRow,
  SpotifyPlaylist,
  SpotifyPlaylistTrack,
} from "@/types/spotify";

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
 * Convert playlist tracks to CSV rows
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
        playlist_id: playlist.id,
        playlist_name: playlist.name,
        playlist_owner: playlist.owner.display_name,
        playlist_public: playlist.public,
        track_name: track.name,
        artists: track.artists.map((artist) => artist.name).join("; "),
        album_name: track.album.name,
        album_release_date: track.album.release_date,
        duration_ms: track.duration_ms,
        duration_min: formatDuration(track.duration_ms),
        explicit: track.explicit,
        popularity: track.popularity,
        added_at: item.added_at,
        track_uri: track.uri,
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

