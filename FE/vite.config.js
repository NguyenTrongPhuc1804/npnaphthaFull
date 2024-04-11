import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginRequire from "vite-plugin-require";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginRequire.default()],
  build: {
    // Đường dẫn cơ sở của ứng dụng khi triển khai
    outDir: "build",
  },
});
