import {defineConfig, normalizePath} from 'vite'
// 如果类型报错，需要安装 @types/node: pnpm i @types/node -D
import path from 'path'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import windi from "vite-plugin-windicss";

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'))

export default defineConfig({
    // 手动指定项目根目录位置
    plugins: [
        react(),
        windi()
    ],
    css: {
        // 预处理器配置
        preprocessorOptions: {
            scss: {
                // additionalData 的内容会在每个 scss 文件的开头自动注入
                additionalData: `@import "${variablePath}";`
            }
        },
        // css modules配置
        modules: {
            // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
            // 其中，name 表示当前文件名，local 表示类名
            generateScopedName: "[name]__[local]___[hash:base64:5]"
        },
        // 进行 PostCSS 配置
        postcss: {
            plugins: [
                autoprefixer({
                    // 指定目标浏览器
                    overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
                })
            ]
        }
    }
})
