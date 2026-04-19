import { Badge } from "@/components/ui/badge";
import { Download, Heart } from "lucide-react";
import type { Wallpaper } from "../types/wallpaper";

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (wallpaper: Wallpaper) => void;
  index: number;
}

export function WallpaperCard({
  wallpaper,
  isFavorite,
  onToggleFavorite,
  onClick,
  index,
}: WallpaperCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = wallpaper.fullUrl;
    link.download = `${wallpaper.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    link.click();
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(wallpaper.id);
  };

  return (
    <button
      type="button"
      data-ocid={`wallpaper.item.${index + 1}`}
      onClick={() => onClick(wallpaper)}
      className="group relative cursor-pointer rounded-2xl overflow-hidden bg-card border border-border/40 hover:border-accent/50 transition-smooth hover:shadow-[0_8px_32px_oklch(0.70_0.20_50/0.25)] hover:-translate-y-1 text-left w-full"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={wallpaper.thumbnail}
          alt={wallpaper.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top-right: favorite */}
        <button
          type="button"
          data-ocid={`wallpaper.favorite_button.${index + 1}`}
          onClick={handleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={[
            "absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-smooth",
            isFavorite
              ? "bg-destructive/80 text-destructive-foreground"
              : "bg-foreground/20 text-foreground/70 hover:bg-foreground/40 hover:text-foreground",
          ].join(" ")}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-white" : ""}`} />
        </button>

        {/* Bottom: download on hover */}
        <button
          type="button"
          data-ocid={`wallpaper.download_button.${index + 1}`}
          onClick={handleDownload}
          aria-label="Download wallpaper"
          className="absolute bottom-2 right-2 p-2 rounded-full bg-accent text-accent-foreground opacity-0 group-hover:opacity-100 transition-smooth hover:bg-accent/80 shadow-lg"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>

      {/* Card body */}
      <div className="p-3">
        <h3 className="font-display text-sm font-medium text-foreground truncate leading-tight">
          {wallpaper.title}
        </h3>
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          {wallpaper.titleHindi}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Badge
            variant="secondary"
            className="text-[10px] px-1.5 py-0 border border-accent/30 bg-accent/10 text-accent"
          >
            {wallpaper.categoryLabel}
          </Badge>
          <span className="text-[10px] text-muted-foreground ml-auto">
            {wallpaper.resolution.split(" ")[0]}
          </span>
        </div>
      </div>
    </button>
  );
}
