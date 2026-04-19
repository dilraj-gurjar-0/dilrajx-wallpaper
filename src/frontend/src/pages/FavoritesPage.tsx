import { Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import type { AppPage } from "../App";
import { Layout } from "../components/Layout";
import { WallpaperCard } from "../components/WallpaperCard";
import { WallpaperModal } from "../components/WallpaperModal";
import { WALLPAPERS } from "../data/wallpapers";
import { useFavorites } from "../hooks/useFavorites";
import type { Wallpaper } from "../types/wallpaper";

interface FavoritesPageProps {
  onNavigate: (page: AppPage) => void;
}

export function FavoritesPage({ onNavigate }: FavoritesPageProps) {
  const { favorites, toggleFavorite, isFavorite, favoriteCount } =
    useFavorites();
  const [selected, setSelected] = useState<Wallpaper | null>(null);

  const favoriteWallpapers = WALLPAPERS.filter((w) => favorites.has(w.id));

  return (
    <>
      <Layout>
        {/* Page Header */}
        <section className="relative overflow-hidden bg-card border-b border-border/50">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              {/* Back button */}
              <button
                type="button"
                data-ocid="favorites.back_button"
                onClick={() => onNavigate("gallery")}
                className="p-2 rounded-full bg-muted/60 border border-border/40 text-muted-foreground hover:text-foreground hover:border-accent/50 transition-smooth"
                aria-label="Back to gallery"
              >
                ←
              </button>
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                <Heart className="h-5 w-5 text-destructive fill-destructive" />
              </div>
              <div>
                <p className="text-xs font-medium text-accent uppercase tracking-widest mb-0.5">
                  पसंदीदा संग्रह · Saved Collection
                </p>
                <h1 className="font-display text-2xl sm:text-3xl font-semibold text-foreground leading-tight">
                  My <span className="text-gradient">Favorites</span>
                </h1>
              </div>
            </div>
            {favoriteCount > 0 && (
              <div className="sm:ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 border border-border/40 w-fit">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span className="text-sm font-medium text-foreground">
                  {favoriteCount} saved
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <section
          className="max-w-7xl mx-auto px-4 py-6"
          data-ocid="favorites.section"
        >
          {/* Empty state */}
          {favoriteWallpapers.length === 0 && (
            <div
              data-ocid="favorites.empty_state"
              className="flex flex-col items-center justify-center py-20 gap-5 text-center"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                  <Heart className="h-9 w-9 text-muted-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-xs">
                  0
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                  No favorites yet
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                  पसंदीदा जोड़ने के लिए किसी भी वॉलपेपर पर ❤ दबाएं
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Tap the heart on any wallpaper to save it here
                </p>
              </div>
              <button
                type="button"
                data-ocid="favorites.browse_button"
                onClick={() => onNavigate("gallery")}
                className="text-sm text-accent border border-accent/40 px-5 py-2.5 rounded-full hover:bg-accent/10 transition-smooth inline-flex items-center gap-2"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Browse Wallpapers
              </button>
            </div>
          )}

          {/* Favorites grid */}
          {favoriteWallpapers.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-muted-foreground">
                  {favoriteWallpapers.length} wallpaper
                  {favoriteWallpapers.length !== 1 ? "s" : ""} saved ·{" "}
                  <span className="text-accent">पसंदीदा</span>
                </p>
                <button
                  type="button"
                  data-ocid="favorites.browse_more_link"
                  onClick={() => onNavigate("gallery")}
                  className="text-xs text-accent hover:text-accent/80 transition-colors"
                >
                  + Add more
                </button>
              </div>
              <div
                data-ocid="favorites.list"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
              >
                {favoriteWallpapers.map((wallpaper, index) => (
                  <WallpaperCard
                    key={wallpaper.id}
                    wallpaper={wallpaper}
                    isFavorite={isFavorite(wallpaper.id)}
                    onToggleFavorite={toggleFavorite}
                    onClick={setSelected}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </Layout>

      {/* Detail Modal */}
      <WallpaperModal
        wallpaper={selected}
        isFavorite={selected ? isFavorite(selected.id) : false}
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
