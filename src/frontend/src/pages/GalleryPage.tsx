import { CategoryTabs } from "@/components/CategoryTabs";
import { Layout } from "@/components/Layout";
import { SearchBar } from "@/components/SearchBar";
import { WallpaperCard } from "@/components/WallpaperCard";
import { WALLPAPERS } from "@/data/wallpapers";
import { useFavorites } from "@/hooks/useFavorites";
import { useSearch } from "@/hooks/useSearch";
import { DetailPage } from "@/pages/DetailPage";
import type { Wallpaper, WallpaperCategory } from "@/types/wallpaper";
import { useCallback, useState } from "react";
import type { AppPage } from "../App";

interface GalleryPageProps {
  onNavigate: (page: AppPage) => void;
}

export default function GalleryPage({ onNavigate }: GalleryPageProps) {
  const [category, setCategory] = useState<WallpaperCategory>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Wallpaper | null>(null);

  const { favorites, toggleFavorite, isFavorite, favoriteCount } =
    useFavorites();

  const { filtered } = useSearch({
    wallpapers: WALLPAPERS,
    query,
    category,
    showFavorites: false,
    favorites,
  });

  const handleCategoryChange = useCallback((cat: WallpaperCategory) => {
    setCategory(cat);
  }, []);

  const handleClearSearch = useCallback(() => {
    setQuery("");
    setCategory("all");
  }, []);

  return (
    <>
      <Layout>
        {/* Hero Banner */}
        <section className="relative overflow-hidden bg-card border-b border-border/50">
          <img
            src="/assets/generated/hero-wallpaper-gallery.dim_1200x600.jpg"
            alt="WallX Premium Wallpapers"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12">
            <p className="text-xs font-medium text-accent uppercase tracking-widest mb-2">
              Premium Collection · प्रीमियम संग्रह
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
              Your Perfect <span className="text-gradient">Wallpaper</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Luxury cars, superheroes &amp; 4K nature — all in one place.
            </p>
          </div>
        </section>

        {/* Controls */}
        <section
          className="bg-muted/30 border-b border-border/40 sticky top-14 z-30 backdrop-blur-md"
          data-ocid="gallery.controls"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <CategoryTabs
              active={category}
              onChange={handleCategoryChange}
              onNavigateFavorites={() => onNavigate("favorites")}
              favoriteCount={favoriteCount}
            />
            <div className="sm:ml-auto w-full sm:w-auto">
              <SearchBar
                value={query}
                onChange={setQuery}
                onClear={handleClearSearch}
              />
            </div>
          </div>
        </section>

        {/* Gallery grid */}
        <section
          className="max-w-7xl mx-auto px-4 py-6"
          data-ocid="gallery.section"
        >
          {/* Result count & clear */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-muted-foreground">
              {filtered.length} wallpaper{filtered.length !== 1 ? "s" : ""}{" "}
              found
            </p>
            {(query || category !== "all") && (
              <button
                type="button"
                data-ocid="gallery.clear_filters_button"
                onClick={handleClearSearch}
                className="text-xs text-accent hover:text-accent/80 transition-colors"
              >
                Clear filters ✕
              </button>
            )}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div
              data-ocid="gallery.empty_state"
              className="flex flex-col items-center justify-center py-20 gap-4 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-3xl">
                🔍
              </div>
              <h3 className="font-display text-lg font-medium text-foreground">
                No wallpapers found
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Try a different search term or category
              </p>
              <button
                type="button"
                data-ocid="gallery.empty_clear_button"
                onClick={handleClearSearch}
                className="text-sm text-accent border border-accent/40 px-4 py-2 rounded-full hover:bg-accent/10 transition-smooth"
              >
                View All Wallpapers
              </button>
            </div>
          )}

          {/* Grid */}
          {filtered.length > 0 && (
            <div
              data-ocid="gallery.list"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            >
              {filtered.map((wallpaper, index) => (
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
          )}
        </section>
      </Layout>

      {/* Detail page — full-screen overlay */}
      {selected && (
        <DetailPage
          wallpaper={selected}
          isFavorite={isFavorite(selected.id)}
          onToggleFavorite={toggleFavorite}
          onBack={() => setSelected(null)}
        />
      )}
    </>
  );
}
