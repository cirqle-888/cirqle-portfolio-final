import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";
import path from "path";

export default defineConfig({
  plugins: [react(), viteCompression({ algorithm: 'brotliCompress' }), viteCompression({ algorithm: 'gzip' })],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "figma:asset/fda5abfd538782442882b2f230e1b2307e39e0bc.png": path.resolve(
        __dirname,
        "./src/assets/fda5abfd538782442882b2f230e1b2307e39e0bc.png"
      ),
      "figma:asset/a79873ff7b54a9a37128bda14561149e5eeb12b3.png": path.resolve(
        __dirname,
        "./src/assets/a79873ff7b54a9a37128bda14561149e5eeb12b3.png"
      ),
      "class-variance-authority@0.7.1": "class-variance-authority",
      "lucide-react@0.487.0": "lucide-react",
      "@radix-ui/react-slot@1.1.2": "@radix-ui/react-slot",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    outDir: "dist",
    cssCodeSplit: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
          ui: ["lucide-react", "clsx", "tailwind-merge"],
          motion: ["motion"],
          contentful: ["contentful"],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
