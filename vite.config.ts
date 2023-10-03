import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Unimport from "unimport/unplugin";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.md"],
  plugins: [
    vue(),
    vueJsx(),
    Unimport.vite({
      addons: {
        vueTemplate: true,
      },
      dts: "src/unimport.d.ts", // Optional if not using TypeScript
      imports: [
        // {
        //   name: "fetchWithAuth",
        //   from: fileURLToPath(new URL("src/main.ts", import.meta.url)),
        // },
      ],
    }),
    AutoImport({
      dts: "./auto-imports.d.ts",
      imports: [
        "vue",
        "vue-router",
        // custom imports
        {
          "@vueuse/core": [
            "useMouse", // import { useMouse } from '@vueuse/core',
            ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          axios: [
            ["default", "axios"], // import { default as axios } from 'axios',
          ],
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"],
          notivue: ["usePush"],
        },
        //type imports
        {
          from: "naive-ui",
          imports: ["FormInst", "FormRules", "SelectOption", "FormItemRule"],
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
