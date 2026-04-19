import { CATEGORIES, type WallpaperCategory } from "../types/wallpaper";

interface CategoryTabsProps {
  active: WallpaperCategory;
  onChange: (cat: WallpaperCategory) => void;
  onNavigateFavorites: () => void;
  favoriteCount: number;
}

export function CategoryTabs({
  active,
  onChange,
  onNavigateFavorites,
  favoriteCount,
}: CategoryTabsProps) {
  return (
    <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1 items-center">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            type="button"
            key={cat.id}
            data-ocid={`category.tab.${cat.id}`}
            onClick={() => onChange(cat.id)}
            className={[
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-smooth border",
              isActive
                ? "bg-accent text-accent-foreground border-accent shadow-[0_0_12px_oklch(0.70_0.20_50/0.4)]"
                : "bg-card text-muted-foreground border-border/50 hover:text-foreground hover:border-accent/50",
            ].join(" ")}
          >
            <span className="text-xs">{cat.emoji}</span>
            <span className="hidden sm:inline">{cat.label}</span>
            <span className="sm:hidden">{cat.labelHindi}</span>
          </button>
        );
      })}

      {/* Favorites tab — navigates to FavoritesPage */}
      <button
        type="button"
        data-ocid="category.tab.favorites"
        onClick={onNavigateFavorites}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-smooth border bg-card text-muted-foreground border-border/50 hover:text-foreground hover:border-accent/50"
      >
        <span>❤</span>
        <span className="hidden sm:inline">Favorites</span>
        <span className="sm:hidden">पसंद</span>
        {favoriteCount > 0 && (
          <span className="ml-0.5 bg-accent/20 text-accent rounded-full px-1.5 py-0 text-xs">
            {favoriteCount}
          </span>
        )}
      </button>
    </div>
  );
}
