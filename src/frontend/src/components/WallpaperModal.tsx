import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileImage, Heart, Share2, X } from "lucide-react";
import { toast } from "sonner";
import type { Wallpaper } from "../types/wallpaper";

interface WallpaperModalProps {
  wallpaper: Wallpaper | null;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

export function WallpaperModal({
  wallpaper,
  isFavorite,
  onToggleFavorite,
  onClose,
}: WallpaperModalProps) {
  if (!wallpaper) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = wallpaper.fullUrl;
    link.download = `${wallpaper.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    link.click();
    toast.success("Download started!", { description: wallpaper.title });
  };

  const handleShare = async () => {
    const url = `${window.location.origin}?wallpaper=${wallpaper.id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!", { description: "Share link in clipboard" });
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    /* Backdrop — not a dialog itself; dismiss on click */
    <div
      data-ocid="wallpaper.dialog"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      {/* Inner card — actual dialog semantics */}
      <section
        aria-label="Wallpaper preview"
        className="relative w-full max-w-3xl bg-card border border-border/60 rounded-2xl overflow-hidden shadow-[0_24px_64px_oklch(0_0_0/0.6)]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
      >
        {/* Close */}
        <button
          type="button"
          data-ocid="wallpaper.close_button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-foreground/20 text-foreground hover:bg-foreground/40 transition-colors"
          aria-label="Close preview"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Full-size preview */}
        <div className="relative aspect-video bg-muted">
          <img
            src={wallpaper.fullUrl}
            alt={wallpaper.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Info bar */}
        <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display text-lg font-semibold text-foreground">
                {wallpaper.title}
              </h2>
              <Badge className="border-accent/40 bg-accent/10 text-accent text-xs">
                {wallpaper.categoryLabel}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              {wallpaper.titleHindi}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileImage className="h-3.5 w-3.5" />
                {wallpaper.resolution}
              </span>
              <span>{wallpaper.fileSize}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              data-ocid="wallpaper.favorite_toggle_button"
              onClick={() => onToggleFavorite(wallpaper.id)}
              aria-label="Toggle favorite"
              aria-pressed={isFavorite}
              className={[
                "p-2.5 rounded-full border transition-smooth",
                isFavorite
                  ? "bg-destructive/20 border-destructive/50 text-destructive"
                  : "bg-card border-border/60 text-muted-foreground hover:text-foreground hover:border-accent/50",
              ].join(" ")}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-destructive" : ""}`}
              />
            </button>

            <button
              type="button"
              data-ocid="wallpaper.share_button"
              onClick={handleShare}
              aria-label="Share wallpaper"
              className="p-2.5 rounded-full border bg-card border-border/60 text-muted-foreground hover:text-foreground hover:border-accent/50 transition-smooth"
            >
              <Share2 className="h-5 w-5" />
            </button>

            <Button
              data-ocid="wallpaper.download_primary_button"
              onClick={handleDownload}
              className="bg-accent text-accent-foreground hover:bg-accent/80 font-medium gap-2 shadow-[0_0_16px_oklch(0.70_0.20_50/0.4)] transition-smooth"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
