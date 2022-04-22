import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
    // 开启 attributify 属性化
    attributify: true,
    // 封装一系列的原子化能力
    shortcuts: {
        "flex-c": "flex justify-center items-center",
    }
});