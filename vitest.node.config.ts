import { fileURLToPath } from "url";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        name: "Node tests",
        environment: "node",
        root: fileURLToPath(new URL("./", import.meta.url)),
        browser: {
            enabled: false,
        },
    },
});
