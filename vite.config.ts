import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@src/adapters": path.resolve(__dirname, "./src/adapters"),
      "@src/api": path.resolve(__dirname, "./src/api"),
      "@src/components": path.resolve(__dirname, "./src/components"),
      "@src/stores": path.resolve(__dirname, "./src/stores"),
      "@src/types": path.resolve(__dirname, "./src/types"),
      "@src/views": path.resolve(__dirname, "./src/views"),
    },
  },
  plugins: [react()],
});
