import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap";

// Blog article slugs (kept in sync with src/pages/Blog.tsx)
const blogArticleSlugs = [
  "pourquoi-sans-rituel-aucun-outil-financier-ne-fonctionne",
  "montee-en-competences-financieres-du-flou-au-pilotage",
  "tu-depenses-trop-chaque-mois-voici-pourquoi",
  "5-minutes-par-jour-pour-ne-plus-subir-sa-fin-de-mois",
  "tes-finances-ne-sont-pas-un-bulletin-de-notes",
  "regle-50-30-20-limites-alternative",
  "pourquoi-tableau-excel-budget-ne-tient-pas",
  "economiser-500-euros-ce-mois-ci",
  "meilleure-app-pour-gerer-son-argent",
  "carte-bancaire-douleur-de-payer-saisie-manuelle",
];

// Define all routes for the sitemap
const dynamicRoutes = [
  "/",
  "/pourquoi-steero",
  "/fonctionnalites",
  "/pricing",
  "/blog",
  ...blogArticleSlugs.map((s) => `/blog/${s}`),
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
      outDir: "dist",
      generateRobotsTxt: true,
      robots: [
        { userAgent: "*", allow: "/" },
        { userAgent: "Googlebot", allow: "/" },
      ],
      // Custom priority per route (1.0 accueil, 0.9 principales, 0.3 légales)
      priority: {
        "/": 1.0,
        "/pourquoi-steero": 0.9,
        "/fonctionnalites": 0.9,
        "/pricing": 0.9,
        "/blog": 0.8,
        "/faq": 0.7,
        "/mentions-legales": 0.3,
        "/cgs": 0.3,
        "/politique-confidentialite": 0.3,
        "*": 0.5,
      },
      // Custom changefreq per route
      changefreq: {
        "/": "weekly",
        "/blog": "weekly",
        "/pourquoi-steero": "monthly",
        "/fonctionnalites": "monthly",
        "/pricing": "monthly",
        "/faq": "monthly",
        "/mentions-legales": "yearly",
        "/cgs": "yearly",
        "/politique-confidentialite": "yearly",
        "*": "monthly",
      },
    }),
  ].filter(Boolean),
  build: {
    assetsInlineLimit: 0,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
