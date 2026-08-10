import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/become-a-legend/",
  plugins: [react()],
  build: {
    outDir: "github-pages-dist",
    emptyOutDir: true,
  },
});
