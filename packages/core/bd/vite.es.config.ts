import { defineConfig } from "vite";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { resolve, join } from "path";
import { filter, map, includes } from "lodash-es";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

const isProd = process.env.NODE_ENV === "production";

function getDirectoriesSync(basePath: string) {
    const entries = readdirSync(basePath, { withFileTypes: true });
    return map(
        filter(entries, (entry) => entry.isDirectory()),
        (entry) => entry.name
    );
}

// 自定义插件：合并所有 theme/*.css 为 main.css
function mergeAllCssPlugin() {
    return {
        name: "merge-all-css",
        closeBundle() {
            // 注意：这里假设 vite outDir 是 dist（或 dist/es），theme 在 dist/theme 下
            const themeDir = resolve(__dirname, "../dist/theme");
            let cssFiles = readdirSync(themeDir)
                .filter(f => f.endsWith(".css") && f !== "main.css"); // 排除 main.css 本身
            // 排序可自定义，默认按文件名
            cssFiles.sort();

            let merged = "";
            for (const file of cssFiles) {
                const content = readFileSync(join(themeDir, file), "utf8");
                merged += `/* ${file} */\n` + content + "\n";
            }
            writeFileSync(join(themeDir, "main.css"), merged, "utf8");
            console.log("✨ 已生成 dist/theme/main.css");
        }
    };
}

export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: "../../tsconfig.build.json",
            outDir: "dist/types",
        }),
        mergeAllCssPlugin(), // 插件加在最后
    ],
    build: {
        outDir: "dist",
        minify: false,
        cssCodeSplit: true,
        sourcemap: !isProd,
        lib: {
            entry: resolve(__dirname, "../index.ts"),
            name: "sukin",
            fileName: (format) => `es/index.${format}.js`,
            formats: ["es"],
        },
        rollupOptions: {
            external: [
                "vue",
                "@fortawesome/fontawesome-svg-core",
                "@fortawesome/free-solid-svg-icons",
                "@fortawesome/vue-fontawesome",
                "@popperjs/core",
                "async-validator",
            ],
            output: {
                chunkFileNames: (chunkInfo) => {
                    const match = chunkInfo.name?.match(/^packages\/components\/([^/]+)\//);
                    if (match) {
                        return `es/${match[1]}.js`;
                    }
                    return "es/[name].js";
                },
                assetFileNames: (chunkInfo) => {
                    if (chunkInfo.name === "style.css") {
                        return "index.css"; // 全局 css
                    }
                    if (
                        chunkInfo.type === "asset" &&
                        /\.(css)$/i.test(chunkInfo.name as string)
                    ) {
                        return "theme/[name][extname]"; // 分包 css
                    }
                    return "[name][extname]";
                },
                manualChunks(id) {
                    if (includes(id, "node_modules")) return "vendor";
                    if (includes(id, "/packages/hooks")) return "hooks";
                    if (
                        includes(id, "/packages/utils") ||
                        includes(id, "plugin-vue:export-helper")
                    )
                        return "utils";
                    for (const item of getDirectoriesSync("../components")) {
                        if (includes(id, `/packages/components/${item}`)) return item;
                    }
                },
            },
        },
    },
});