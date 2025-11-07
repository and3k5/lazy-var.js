import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    srcDir: "docs",

    title: "lazy-var.js",
    description: "Lazy initialize values",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Examples", link: "/examples" },
            { text: "Reference", link: "/reference" },
        ],

        sidebar: [
            {
                text: "Examples",
                items: [{ text: "Examples", link: "/examples" }],
            },
            {
                text: "References",
                items: [{ text: "Reference", link: "/reference" }],
            },
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],
    },
});
