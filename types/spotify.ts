export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyUser {
  id: string;
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  type: string;
  uri: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string | null;
  owner: SpotifyUser;
  public: boolean;
  collaborative: boolean;
  images: SpotifyImage[];
  tracks: {
    total: number;
    href: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  snapshot_id: string;
  type: string;
  uri: string;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  images: SpotifyImage[];
  artists: SpotifyArtist[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  duration_ms: number;
  explicit: boolean;
  popularity: number;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyPlaylistTrack {
  added_at: string;
  track: SpotifyTrack;
}

export interface SpotifyPlaylistsResponse {
  items: SpotifyPlaylist[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
}

export interface SpotifyPlaylistTracksResponse {
  items: SpotifyPlaylistTrack[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
}

export interface CSVRow {
  playlist_id: string;
  playlist_name: string;
  playlist_owner: string;
  playlist_public: boolean;
  track_name: string;
  artists: string;
  album_name: string;
  album_release_date: string;
  duration_ms: number;
  duration_min: string;
  explicit: boolean;
  popularity: number;
  added_at: string;
  track_uri: string;
}

