import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/core/index.ts', 'src/use/index.ts', 'src/types/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: false,
  minify: true,
});
