import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false, // 使用 tsc -b 生成声明文件
  clean: true,
  sourcemap: false,
});
