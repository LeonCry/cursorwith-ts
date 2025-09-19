import type { ConfigEnv, UserConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import tailwindcss from '@tailwindcss/vite';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';

const dateTime = new Date().toISOString();
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: `/${env.VITE_APP_ROUTER_PREFIX}`,
    define: { __APP_VERSION__: JSON.stringify(dateTime) },
    resolve: { alias: { '@': `${path.resolve(__dirname, 'src')}` } },
    plugins: [
      Vue(),
      tailwindcss(),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
        dts: true,
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dts: true,
        dirs: ['src/components', 'src/views', 'src/layouts'],
        resolvers: [ElementPlusResolver()],
      }),
      {
        name: 'branch-info',
        closeBundle() {
          const branchFileName = `${env.VITE_ENV_SIGN_ZH}-${env.VITE_APP_TITLE_ZH}.sign`;
          const outputPath = path.join(env.VITE_APP_OUTPUT, branchFileName);
          fs.writeFileSync(outputPath, `Branch: ${env.VITE_ENV_SIGN_ZH}\nProject Name: ${env.VITE_APP_TITLE_ZH}\nBuild Time: ${new Date().toLocaleString()}`);
        },
      },
      {
        name: 'update-version',
        writeBundle() {
          const filePath = path.resolve(env.VITE_APP_OUTPUT, 'version.json');
          const fileContents = JSON.stringify({ version: dateTime });
          fs.writeFileSync(filePath, fileContents);
        },
      },
    ],
    build: {
      outDir: env.VITE_APP_OUTPUT,
      sourcemap: Boolean(env.VITE_APP_SOURCEMAP),
    },
    server: {
      host: 'localhost',
      port: 3333,
    },
  } as UserConfig;
});
