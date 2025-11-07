import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
    test: {
        name: "Browser tests",
        environment: "jsdom",
        browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [
                { browser: "chromium" },
                { browser: "firefox" },
                { browser: "webkit" },
            ],
        },
    },
});
