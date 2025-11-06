"use client";

import { SpotifyPlaylist } from "@/types/spotify";
import { useState, useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

interface PlaylistListProps {
  playlists: SpotifyPlaylist[];
  selectedPlaylists: string[];
  onSelectionChange: (playlistIds: string[]) => void;
}

type SortKey = "name" | "tracks";
type SortOrder = "asc" | "desc";

export default function PlaylistList({
  playlists,
  selectedPlaylists,
  onSelectionChange,
}: PlaylistListProps) {
  const { t } = useLanguage();
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaylists = useMemo(() => {
    return playlists.filter((playlist) =>
      playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [playlists, searchQuery]);

  const sortedPlaylists = useMemo(() => {
    const sorted = [...filteredPlaylists].sort((a, b) => {
      if (sortKey === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === "asc"
          ? a.tracks.total - b.tracks.total
          : b.tracks.total - a.tracks.total;
      }
    });
    return sorted;
  }, [filteredPlaylists, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedPlaylists.length === sortedPlaylists.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(sortedPlaylists.map((p) => p.id));
    }
  };

  const handleTogglePlaylist = (playlistId: string) => {
    if (selectedPlaylists.includes(playlistId)) {
      onSelectionChange(selectedPlaylists.filter((id) => id !== playlistId));
    } else {
      onSelectionChange([...selectedPlaylists, playlistId]);
    }
  };

  if (playlists.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          {t("playlist.noPlaylists")}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <input
          type="text"
          placeholder={t("playlist.search")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label={t("playlist.search")}
        />

        {/* Sort and Select All */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => handleSort("name")}
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium"
              aria-label={t("playlist.sortBy.name")}
            >
              {t("playlist.sortBy.name")} {sortKey === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSort("tracks")}
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium"
              aria-label={t("playlist.sortBy.tracks")}
            >
              {t("playlist.sortBy.tracks")} {sortKey === "tracks" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
          </div>
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            aria-label={
              selectedPlaylists.length === sortedPlaylists.length
                ? t("export.deselectAll")
                : t("export.selectAll")
            }
          >
            {selectedPlaylists.length === sortedPlaylists.length
              ? t("export.deselectAll")
              : t("export.selectAll")}
          </button>
        </div>
      </div>

      {/* Playlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedPlaylists.map((playlist) => {
          const isSelected = selectedPlaylists.includes(playlist.id);
          const imageUrl = playlist.images[0]?.url;

          return (
            <div
              key={playlist.id}
              className={`relative bg-white dark:bg-zinc-900 border rounded-lg overflow-hidden transition-all cursor-pointer hover:shadow-lg ${
                isSelected
                  ? "border-green-500 ring-2 ring-green-500"
                  : "border-zinc-200 dark:border-zinc-800"
              }`}
              onClick={() => handleTogglePlaylist(playlist.id)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleTogglePlaylist(playlist.id);
                }
              }}
            >
              {/* Checkbox */}
              <div className="absolute top-2 right-2 z-10">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleTogglePlaylist(playlist.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-5 h-5 rounded border-2 border-zinc-300 dark:border-zinc-600 accent-green-500 cursor-pointer"
                  aria-label={`Select ${playlist.name}`}
                />
              </div>

              {/* Cover Image */}
              <div className="relative w-full aspect-square bg-zinc-200 dark:bg-zinc-800">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`${playlist.name} cover`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-zinc-400 dark:text-zinc-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Playlist Info */}
              <div className="p-4">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate mb-1">
                  {playlist.name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate mb-2">
                  {t("playlist.by")} {playlist.owner.display_name}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 dark:text-zinc-500">
                    {playlist.tracks.total} {t("playlist.tracks")}
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      playlist.public
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    {playlist.public ? t("playlist.public") : t("playlist.private")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

