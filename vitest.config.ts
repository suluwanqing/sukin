/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from 'path'
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    define: {
        PROD: JSON.stringify(false),
        DEV: JSON.stringify(false),
        TEST: JSON.stringify(true),
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: [resolve(__dirname, './vitest.setup.ts')]
    }, build: {
        rollupOptions: {
            onwarn(warning, warn) {
                // 打印详细变量解析日志
                if (warning.code === 'MISSING_EXPORT') {
                    console.warn('未找到的变量:', warning)
                }
                warn(warning)
            }
        }
      }
});