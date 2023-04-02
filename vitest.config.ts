import path from 'path'

import EnvironmentPlugin from 'vite-plugin-environment'
import { defineConfig } from 'vitest/config'
export default defineConfig({
  plugins: [EnvironmentPlugin(['REACT_APP_TEXT'])],

  test: {
    alias: {
      '@data': path.resolve(__dirname, './src/data'),
      '@domain': path.resolve(__dirname, './src/domain'),
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
})
