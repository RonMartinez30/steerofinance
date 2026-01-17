import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap";

// Define all routes for the sitemap
const dynamicRoutes = [
  "/",
  "/pourquoi-steero",
  "/fonctionnalites",
  "/blog",
  "/faq",
  "/mentions-legales",
  "/cgs",
  "/politique-confidentialite",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    Sitemap({
      hostname: "https://steerofinance.lovable.app",
      dynamicRoutes,
      exclude: ["/404"],
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date(),
      outDir: "dist",
      robots: [
        { userAgent: "*", allow: "/" },
        { userAgent: "Googlebot", allow: "/" },
      ],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
