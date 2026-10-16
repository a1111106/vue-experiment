import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base 必须与 GitHub 仓库名一致，部署到 https://<username>.github.io/vue-experiment/
export default defineConfig({
  plugins: [vue()],
  base: '/vue-experiment/'
})
