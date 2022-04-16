import { defineConfig } from 'vite'
// import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 手动指定项目根目录位置
  // root: path.join(__dirname, 'src'),
  plugins: [react()]
})
