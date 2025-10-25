import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';

const r = (p: string) => path.resolve(fileURLToPath(new URL('.', import.meta.url)), p);

export default defineConfig({
  base: '/cursorwith-ts/',
  // 多语言配置，将中文主题配置放入 locales.zh.themeConfig
  locales: {
    root: { label: 'English', lang: 'en-US' },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '指南', link: '/zh/guide', activeMatch: '/zh/guide/' },
          { text: 'API', link: '/zh/api', activeMatch: '/zh/api/' },
          { text: '问题', link: 'https://github.com/LeonCry/cursorwith-ts/issues' },
          { text: '更新日志', link: 'https://github.com/LeonCry/cursorwith-ts/blob/main/CHANGELOG.md' },
          {
            text: '版本: 1.1.0',
            items: [{ text: '1.1.0', link: 'https://www.npmjs.com/package/cursorwith-ts/v/1.1.0' }],
          },
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '指南',
              collapsed: false,
              items: [
                { text: '简介', link: '/zh/guide/' },
                { text: '安装', link: '/zh/guide/install' },
              ],
            },
            {
              text: '实例',
              collapsed: false,
              items: [
                { text: '创建', link: '/zh/guide/instance/create' },
                { text: '实例方法', link: '/zh/guide/instance/fns' },
              ],
            },
            {
              text: '插件',
              collapsed: false,
              items: [
                { text: 'follow', link: '/zh/guide/plugins/follow' },
                { text: 'hoverEffect', link: '/zh/guide/plugins/hoverEffect' },
                { text: 'clickEffect', link: '/zh/guide/plugins/clickEffect' },
                { text: 'tail', link: '/zh/guide/plugins/tail' },
                { text: 'inverse', link: '/zh/guide/plugins/inverse' },
                { text: 'nativeCursor', link: '/zh/guide/plugins/nativeCursor' },
              ],
            },
          ],
          '/zh/api/': [
            {
              text: 'API',
              collapsed: false,
              items: [
                { text: '类型', link: '/zh/api/types' },
                { text: '实例', link: '/zh/api/instance' },
                { text: '插件', link: '/zh/api/plugins' },
              ],
            },
          ],
        },
        footer: {
          message: '基于 MIT 许可发布。',
          copyright: '版权所有 © 2025-present Voidis',
        },
      },
    },
  },
  title: 'cursorwith-docs',
  head: [['link', { rel: 'icon', href: '/cursorwith-ts/favicon.ico' }]],
  description: 'A tiny, customizable, easy-to-use, framework-agnostic, and high performance cursor following effect.',
  themeConfig: {
    siteTitle: 'CURSORWITH-TS',
    search: { provider: 'local' },
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide', activeMatch: '/guide/' },
      { text: 'API', link: '/api', activeMatch: '/api/' },
      { text: 'Issues', link: 'https://github.com/LeonCry/cursorwith-ts/issues' },
      { text: 'ChangeLog', link: 'https://github.com/LeonCry/cursorwith-ts/blob/main/CHANGELOG.md' },
      {
        text: 'Version: 1.1.0',
        items: [{ text: '1.1.0', link: 'https://www.npmjs.com/package/cursorwith-ts/v/1.1.0' }],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Install', link: '/guide/install' },
          ],
        },
        {
          text: 'Instance',
          collapsed: false,
          items: [
            { text: 'Create', link: '/guide/instance/create' },
            { text: 'Instance Methods', link: '/guide/instance/fns' },
          ],
        },
        {
          text: 'Plugins',
          collapsed: false,
          items: [
            { text: 'follow', link: '/guide/plugins/follow' },
            { text: 'hoverEffect', link: '/guide/plugins/hoverEffect' },
            { text: 'clickEffect', link: '/guide/plugins/clickEffect' },
            { text: 'tail', link: '/guide/plugins/tail' },
            { text: 'inverse', link: '/guide/plugins/inverse' },
            { text: 'nativeCursor', link: '/guide/plugins/nativeCursor' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API',
          items: [
            { text: 'Types', link: '/api/types' },
            { text: 'Instance', link: '/api/instance' },
            { text: 'Plugins', link: '/api/plugins' },
          ],
        },
      ],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Voidis',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LeonCry/cursorwith-ts' },
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 48 48" width="48" height="48"><path d="M0 0h2v8l1.757813.078125c6.84028.496654 10.801959 2.28379 15.554687 7.421875C22.292467 19.914766 22.359233 23.701307 22 29c-2.037173 6.564224-5.052325 9.670627-10.886719 13.113281C7.183895 43.762025 3.173322 43.516697-1 43c-5.341167-2.465154-9.429404-6.70915-12-12-.983114-5.250724-.999562-10.123418 2-14.6875L-9 14l-7-5c1-4 1-4 2.5625-5.75C-9.804221 1.38678-7.071952 1.741463-3 2l3 1V0Z" transform="translate(20 3)" style="fill:#fd7c1c"/><path d="M0 0h2v10l3 1v3h-6v-4l-3 2c-7.06542.560748-7.06542.560748-10.5-1.5L-16 9c.350212-2.53904.840119-3.820933 2.5625-5.75C-9.804221 1.38678-7.071952 1.741463-3 2l3 1V0Z" transform="translate(20 3)" style="fill:#65af1a"/><path d="M0 0h4C2.14876 4.76033 2.14876 4.76033.875 6.8125c-1.9767 4.941748-1.36958 9.707711.625 14.5 2.09368 3.765665 4.32499 5.11964 8.417969 6.289063 4.50804.862701 7.909348.789331 12.269531-.664063C25.748212 24.484565 27.65575 22.053865 29 18c.59454-3.996906.867426-7.963129 1-12 2.120763 3.878207 2.37769 6.543247 2 11-2.037173 6.564224-5.052325 9.670627-10.886719 13.113281C17.183895 31.762025 13.173322 31.516697 9 31 3.658833 28.534846-.429404 24.29085-3 19c-.983114-5.250724-.999562-10.123418 2-14.6875L1 2 0 0Z" transform="translate(10 15)" style="fill:#ff5817"/><path d="M0 0h2v10l3 1v3h-6L0 4l-2-1h2V0Z" transform="translate(20 3)" style="fill:#3b6a05"/><path d="M0 0c6.077745.270122 10.156062.983075 15 5l2 3c-3 0-3 0-5.125-1.8125C8.179506 3.37571 4.420688 2.271309 0 1V0Z" transform="translate(22 11)" style="fill:#fd5717"/><path d="M0 0h4C3.014611 2.65297 2.057622 4.917024.4375 7.25-1.554923 11.061592-1.731735 14.75401-2 19h-1c-.445344-6.95231-.6729-11.59696 4-17L0 0Z" transform="translate(10 15)" style="fill:#f94c13"/><path d="M0 0h2c3.910581 4.512209 3.294695 9.37896 3 15H3l-.402344-2.519531L2.0625 9.1875l-.527344-3.269531C1.061281 2.950666 1.061281 2.950666 0 0Z" transform="translate(33 19)" style="fill:#ffe7d6"/><path d="m0 0 6 2 1 5C4.5 5.625 4.5 5.625 2 4V2H0V0Z" transform="translate(33 17)" style="fill:#ff7120"/></svg>' }, link: 'https://www.voidis.me' },
    ],
  },
  vite: {
    resolve: {
      alias: {
        'cursorwith-ts/core': r('../../../packages/cursor-with/src/core/index.ts'),
        'cursorwith-ts/use': r('../../../packages/cursor-with/src/use/index.ts'),
        'cursorwith-ts/types': r('../../../packages/cursor-with/src/types/index.ts'),
        'cursorwith-ts': r('../../../packages/cursor-with/src/index.ts'),
      },
    },
  },
});
