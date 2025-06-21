import { resolve } from "node:path";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const configEnv = loadEnv(mode, process.cwd(), "CONFIG");
  const env = loadEnv(mode, process.cwd(), "VITE");

  return {
    server: {
      https: {
        key: configEnv.CONFIG_SSL_CRT_FILE,
        cert: configEnv.CONFIG_SSL_KEY_FILE,
      },
      host: configEnv.CONFIG_HOST,
      port: 3000,
      proxy: {
        "/api": {
          target: configEnv.CONFIG_API_PROXY_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [
      // eslint-disable-next-line new-cap
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      svgr(),
      react(),
      // Добавляем Sentry плагин только в production и если есть DSN
      mode === "production" &&
        env.VITE_SENTRY_DSN &&
        sentryVitePlugin({
          authToken: process.env.SENTRY_AUTH_TOKEN,
          org: "v-b",
          project: "bottle-code-frontend",
          url: "https://sentry.v-b.tech/",
          sourcemaps: {
            assets: "./dist/**",
            ignore: ["node_modules/**"],
          },
        }),
    ].filter(Boolean),

    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
    },
    // optimizeDeps: {
    //   //workaround for the problem https://github.com/vitejs/vite/issues/7719
    //   extensions: [".css"],
    //   esbuildOptions: {
    //     plugins: [
    //       (await import("esbuild-sass-plugin")).sassPlugin({
    //         type: "style",
    //       }),
    //     ],
    //   },
    // },
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName:
          mode === "production"
            ? "[local]--[hash:base64:10]"
            : "[path][name]__[local]--[hash:base64:10]",
      },
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  };
});
