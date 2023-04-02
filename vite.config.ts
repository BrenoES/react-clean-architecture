import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [react(), EnvironmentPlugin(['REACT_APP_TEXT'])],
  publicDir: 'public',
  resolve: {
    alias: {
      '@data': path.resolve(__dirname, './src/data'),
      '@domain': path.resolve(__dirname, './src/domain'),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
})
