import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
}

export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        data-ocid="search.search_input"
        type="text"
        aria-label="Wallpaper search"
        placeholder="Search wallpapers... / खोजें"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-9 bg-card border-border/60 focus:border-accent/60 text-foreground placeholder:text-muted-foreground h-10 rounded-xl transition-smooth"
      />
      {value && (
        <button
          type="button"
          data-ocid="search.clear_button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
