import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    dir: 'src/http/controllers',
    environment: 'node',
    globals: true,
    include: ['**/*.spec.ts'],
    setupFiles: ['./src/test.setup.ts'],
  },
});
