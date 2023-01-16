module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: { "project": ["./tsconfig.json"] },
    plugins: [
        "unused-imports",
        "typescript"
    ],
    rules: {
        "no-unused-vars": 1,
        "no-duplicate-imports": 2,
        "unused-imports/no-unused-imports": 2,
        "no-trailing-spaces": 1,
        "indent": [1, 4],
    },
    ignorePatterns: ["src/**/spec.js","webpack.config.js"],
    env: {
        browser: true,
        node: false,
    },
};