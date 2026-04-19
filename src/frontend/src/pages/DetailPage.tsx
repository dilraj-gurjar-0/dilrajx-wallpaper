import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Download,
  FileImage,
  HardDrive,
  Heart,
  Monitor,
  Share2,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Wallpaper } from "../types/wallpaper";

interface DetailPageProps {
  wallpaper: Wallpaper;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
}

export function DetailPage({
  wallpaper,
  isFavorite,
  onToggleFavorite,
  onBack,
}: DetailPageProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");

  // Lock body scroll while detail is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard: Escape = back, ArrowLeft = back
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "ArrowLeft") onBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onBack]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = wallpaper.fullUrl;
    link.download = `${wallpaper.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("डाउनलोड शुरू हुआ!", {
      description: `${wallpaper.title} — ${wallpaper.resolution}`,
    });
  };

  const handleShare = async () => {
    const url = `${window.location.origin}?wallpaper=${wallpaper.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: wallpaper.title,
          text: `Check out this wallpaper: ${wallpaper.title}`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setShareState("copied");
        toast.success("लिंक कॉपी हुआ!", {
          description: "Share link copied to clipboard",
        });
        setTimeout(() => setShareState("idle"), 2500);
      }
    } catch {
      toast.error("Could not share wallpaper");
    }
  };

  return (
    <div
      data-ocid="detail.page"
      className="fixed inset-0 z-50 bg-background flex flex-col"
      style={{ contain: "strict" }}
    >
      {/* ── Top bar ── */}
      <header className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border/50 shrink-0">
        <button
          type="button"
          data-ocid="detail.back_button"
          onClick={onBack}
          aria-label="Back to gallery"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          <span className="hidden sm:inline">वापस / Back</span>
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="font-display text-base font-semibold text-foreground truncate">
            {wallpaper.title}
          </h1>
          <p className="text-xs text-muted-foreground truncate">
            {wallpaper.titleHindi}
          </p>
        </div>

        <Badge
          data-ocid="detail.category_badge"
          className="border-accent/40 bg-accent/10 text-accent text-xs shrink-0"
        >
          {wallpaper.categoryLabel}
        </Badge>
      </header>

      {/* ── Image area ── */}
      <div
        data-ocid="detail.image_panel"
        className="flex-1 relative bg-muted overflow-hidden"
      >
        {!imgLoaded && (
          <Skeleton
            data-ocid="detail.loading_state"
            className="absolute inset-0 w-full h-full rounded-none"
          />
        )}
        <img
          src={wallpaper.fullUrl}
          alt={wallpaper.title}
          className={[
            "w-full h-full object-contain transition-opacity duration-500",
            imgLoaded ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Gradient overlay at bottom for mobile metadata legibility */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/20 to-transparent pointer-events-none sm:hidden" />
      </div>

      {/* ── Info + Actions panel ── */}
      <div className="shrink-0 bg-card border-t border-border/50">
        {/* Metadata row */}
        <div className="px-4 pt-3 pb-1 flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <span
            data-ocid="detail.resolution_meta"
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Monitor className="h-3.5 w-3.5 text-accent" />
            {wallpaper.resolution}
          </span>
          <span
            data-ocid="detail.filesize_meta"
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <HardDrive className="h-3.5 w-3.5 text-accent" />
            {wallpaper.fileSize}
          </span>
          <span
            data-ocid="detail.format_meta"
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <FileImage className="h-3.5 w-3.5 text-accent" />
            JPEG
          </span>
        </div>

        {/* Tags */}
        {wallpaper.tags.length > 0 && (
          <div className="px-4 py-1.5 flex items-center gap-1.5 flex-wrap">
            <Tag className="h-3 w-3 text-muted-foreground/60 shrink-0" />
            {wallpaper.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="px-4 pt-2 pb-4 flex items-center gap-2">
          {/* Favorite */}
          <button
            type="button"
            data-ocid="detail.favorite_toggle_button"
            onClick={() => onToggleFavorite(wallpaper.id)}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            aria-pressed={isFavorite}
            className={[
              "p-2.5 rounded-full border transition-smooth shrink-0",
              isFavorite
                ? "bg-destructive/20 border-destructive/50 text-destructive"
                : "bg-muted/40 border-border/60 text-muted-foreground hover:text-foreground hover:border-accent/50",
            ].join(" ")}
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-destructive" : ""}`}
            />
          </button>

          {/* Share */}
          <button
            type="button"
            data-ocid="detail.share_button"
            onClick={handleShare}
            aria-label="Share wallpaper"
            className="p-2.5 rounded-full border bg-muted/40 border-border/60 text-muted-foreground hover:text-foreground hover:border-accent/50 transition-smooth shrink-0"
          >
            <Share2 className="h-5 w-5" />
          </button>

          {shareState === "copied" && (
            <span
              data-ocid="detail.share_success_state"
              className="text-xs text-accent animate-in fade-in slide-in-from-bottom-1 duration-200"
            >
              ✓ Copied!
            </span>
          )}

          {/* Download — primary CTA */}
          <Button
            type="button"
            data-ocid="detail.download_primary_button"
            onClick={handleDownload}
            className="ml-auto bg-accent text-accent-foreground hover:bg-accent/80 font-medium gap-2 shadow-[0_0_20px_oklch(0.70_0.20_50/0.35)] transition-smooth"
          >
            <Download className="h-4 w-4" />
            <span>डाउनलोड · Download</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
