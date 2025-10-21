import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/core/index.ts', 'src/use/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
});
