"use client";

import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface ExportControlsProps {
  selectedCount: number;
  onExport: () => Promise<void>;
}

export default function ExportControls({
  selectedCount,
  onExport,
}: ExportControlsProps) {
  const { t } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleExport = async () => {
    if (selectedCount === 0) return;

    setIsExporting(true);
    setStatus("Preparing export...");
    setError("");

    try {
      await onExport();
      setStatus("Export completed successfully!");
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to export playlists";
      setError(errorMessage);
      console.error("Export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="sticky bottom-0 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {selectedCount === 0 ? (
              t("export.selectToExport")
            ) : (
              <>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedCount}
                </span>{" "}
                {t("export.playlists")}
              </>
            )}
          </p>
          {status && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              {status}
            </p>
          )}
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {error}
            </p>
          )}
        </div>

        <button
          onClick={handleExport}
          disabled={selectedCount === 0 || isExporting}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            selectedCount === 0 || isExporting
              ? "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg active:scale-95"
          }`}
          aria-label={t("export.export")}
        >
          {isExporting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {t("export.export")}...
            </span>
          ) : (
            t("export.export")
          )}
        </button>
      </div>
    </div>
  );
}

