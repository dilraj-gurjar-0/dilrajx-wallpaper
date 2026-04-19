import { useMemo } from "react";
import type { Wallpaper, WallpaperCategory } from "../types/wallpaper";

interface UseSearchOptions {
  wallpapers: Wallpaper[];
  query: string;
  category: WallpaperCategory;
  showFavorites: boolean;
  favorites: Set<string>;
}

export function useSearch({
  wallpapers,
  query,
  category,
  showFavorites,
  favorites,
}: UseSearchOptions) {
  const filtered = useMemo(() => {
    let result = wallpapers;

    if (showFavorites) {
      result = result.filter((w) => favorites.has(w.id));
    } else if (category !== "all") {
      result = result.filter((w) => w.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.titleHindi.includes(q) ||
          w.tags.some((t) => t.includes(q)) ||
          w.categoryLabel.toLowerCase().includes(q),
      );
    }

    return result;
  }, [wallpapers, query, category, showFavorites, favorites]);

  return { filtered, total: filtered.length };
}
