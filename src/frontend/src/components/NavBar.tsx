import { Layers } from "lucide-react";

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-card border-b border-border/60 shadow-[0_2px_16px_black/30] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-[0_0_10px_oklch(0.70_0.20_50/0.5)]">
            <Layers className="h-4 w-4 text-accent-foreground" />
          </div>
          <span className="font-display text-base font-semibold text-foreground hidden sm:block">
            WallX
          </span>
          <span className="text-xs text-muted-foreground hidden sm:block">
            · वॉलपेपर गैलरी
          </span>
        </div>

        {/* Tagline */}
        <p className="text-xs text-muted-foreground hidden md:block text-center flex-1">
          Premium wallpapers for your device · प्रीमियम वॉलपेपर
        </p>

        {/* Resolution badge */}
        <div className="shrink-0">
          <span className="text-xs px-2.5 py-1 rounded-full border border-accent/40 text-accent bg-accent/10 font-medium">
            4K · 8K
          </span>
        </div>
      </div>
    </header>
  );
}
