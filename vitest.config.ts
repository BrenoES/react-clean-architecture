import path from 'path'
import { mergeConfig } from 'vite'

import EnvironmentPlugin from 'vite-plugin-environment'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./setupTests.ts'],
      typecheck: {
        tsconfig: './tsconfig.vitest.json',
      },
    },
  })
)
