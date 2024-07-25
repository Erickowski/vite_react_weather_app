import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@src/components": path.resolve(__dirname, "./src/components"),
      "@src/views": path.resolve(__dirname, "./src/views"),
      "@src/types": path.resolve(__dirname, "./src/types"),
    },
  },
  plugins: [react()],
});
