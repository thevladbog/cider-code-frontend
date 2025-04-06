import { resolve } from "node:path";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // eslint-disable-next-line new-cap
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    svgr(),
    react(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
  optimizeDeps: {
    //workaround for the problem https://github.com/vitejs/vite/issues/7719
    extensions: [".css"],
    esbuildOptions: {
      plugins: [
        (await import("esbuild-sass-plugin")).sassPlugin({
          type: "style",
        }),
      ],
    },
  },
});
