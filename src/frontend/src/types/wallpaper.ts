export type WallpaperCategory =
  | "all"
  | "luxury-cars"
  | "avengers"
  | "spider-man"
  | "4k";

export interface Wallpaper {
  id: string;
  title: string;
  titleHindi: string;
  category: Exclude<WallpaperCategory, "all">;
  categoryLabel: string;
  thumbnail: string;
  fullUrl: string;
  resolution: string;
  fileSize: string;
  tags: string[];
}

export const CATEGORIES: {
  id: WallpaperCategory;
  label: string;
  labelHindi: string;
  emoji: string;
}[] = [
  { id: "all", label: "All", labelHindi: "सभी", emoji: "✦" },
  {
    id: "luxury-cars",
    label: "Luxury Cars",
    labelHindi: "लक्ज़री कारें",
    emoji: "🚗",
  },
  { id: "avengers", label: "Avengers", labelHindi: "अवेंजर्स", emoji: "⚡" },
  {
    id: "spider-man",
    label: "Spider-Man",
    labelHindi: "स्पाइडर-मैन",
    emoji: "🕷",
  },
  { id: "4k", label: "4K Ultra", labelHindi: "4K अल्ट्रा", emoji: "✦" },
];
