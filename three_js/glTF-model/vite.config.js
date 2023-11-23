import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 添加处理静态资源的配置
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
