import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [react(), EnvironmentPlugin('all', { prefix: 'REACT_APP' })],
  publicDir: 'public',
  resolve: {
    alias: [
      { find: '@data', replacement: path.resolve(__dirname, './src/data') },
      { find: '@domain', replacement: path.resolve(__dirname, './src/domain') },
      { find: '@infra', replacement: path.resolve(__dirname, './src/infra') },
      {
        find: '@presentation',
        replacement: path.resolve(__dirname, './src/presentation'),
      },
    ],
  },
  server: {
    host: true,
    port: 3000,
  },
})
