import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: resolve("./tsconfig.build.json"),
            outDir: "lib/types",
        }),
    ],
    build: {
        lib: {
            entry: "src/index.ts",
            name: "lazy-var",
            fileName: (format, entryName) => `${format}/${entryName}.js`,
            formats: ["cjs", "es"],
        },
        outDir: "lib",
        emptyOutDir: true,
        target: ["node22", "chrome140"],
        sourcemap: true,
        minify: true,
    },
});
