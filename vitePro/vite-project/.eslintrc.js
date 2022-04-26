// .eslintrc.js
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        // 1. 接入 prettier 的规则
        "prettier",
        "plugin:prettier/recommended"
    ],
    settings: {
        react: {
            version: "17.0.2"
        }
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    // 2. 加入 prettier 的 eslint 插件
    plugins: ["react", "@typescript-eslint", "prettier"],
    rules: {
        // 3. 注意要加上这一句，开启 prettier 自动修复的功能
        "prettier/prettier": "error",
        quotes: ["error", "single"],
        semi: ["error", "never"],
        "react/react-in-jsx-scope": "off"
    }
};