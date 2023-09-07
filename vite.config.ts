import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.md"],
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      dts: "./auto-imports.d.ts",
      imports: [
        "vue",
        "vue-router",
        {
          "@vueuse/core": [
            "useMouse", // import { useMouse } from '@vueuse/core',
            ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          axios: [
            ["default", "axios"], // import { default as axios } from 'axios',
          ],
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"],
        },
        {
          from: "vue-router",
          imports: ["RouteLocationRaw"],
          type: true,
        },
      ],
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      injectAtEnd: true,
    }),
    Components({
      // resolvers for custom components
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
