import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 },
      pngquant: { quality: [0.6, 0.8] },
      webp: { quality: 75 },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@clerk")) return "vendor-clerk";
            if (id.includes("motion")) return "vendor-motion";
            if (id.includes("@tanstack")) return "vendor-query";
            if (id.includes("react-router")) return "vendor-router";
            if (id.includes("react-dom") || id.includes("react/")) return "vendor-react";
            if (id.includes("lucide-react")) return "vendor-lucide";
            if (id.includes("zod")) return "vendor-zod";
            if (id.includes("react-hook-form") || id.includes("@hookform")) return "vendor-forms";
            return "vendor-misc";
          }
        },
      },
    },
  },
});