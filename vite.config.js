import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  proxyTable: {
    '/api': {
      target: 'http://localhost:8080', //后期可以改
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  }
})
