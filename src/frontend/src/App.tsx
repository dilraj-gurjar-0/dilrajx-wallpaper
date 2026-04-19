import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { FavoritesPage } from "./pages/FavoritesPage";
import GalleryPage from "./pages/GalleryPage";

export type AppPage = "gallery" | "favorites";

export const AppPageContext = {
  navigate: (_page: AppPage) => {},
};

export default function App() {
  const [page, setPage] = useState<AppPage>("gallery");

  return (
    <>
      {page === "gallery" ? (
        <GalleryPage onNavigate={setPage} />
      ) : (
        <FavoritesPage onNavigate={setPage} />
      )}
      <Toaster position="bottom-right" richColors />
    </>
  );
}
