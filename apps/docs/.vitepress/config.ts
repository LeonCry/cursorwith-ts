import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'cursorwith-docs',
  description: 'A tiny, customizable, easy-to-use, framework-agnostic, and high performance cursor following effect.',
  themeConfig: {
    siteTitle: 'CURSORWITH',
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide', activeMatch: '/guide/' },
      { text: 'API', link: '/api', activeMatch: '/api/' },
      { text: 'Issues', link: 'https://github.com/LeonCry/cursor-with/issues' },
      { text: 'ChangeLog', link: 'https://github.com/LeonCry/cursor-with/main/CHANGELOG.md' },
      {
        text: 'Version: 0.1.0',
        items: [
          { text: '0.1.0', link: 'https://www.npmjs.com/package/cursor-with/v/1.0.0' },
          { text: 'BETA', link: 'https://www.npmjs.com/package/cursor-with/v/BETA' },
        ],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          collapsed: true,
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Install', link: '/guide/install' },
          ],
        },
        {
          text: 'Options',
          collapsed: true,
          items: [
            { text: 'Style', link: '/guide/options/style' },
            { text: 'Follow', link: '/guide/options/follow' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API',
          items: [
            { text: 'Create', link: '/api/' },
            { text: 'Instance Public Methods ', link: '/api/instance' },
            { text: 'Listener Functions', link: '/api/listener' },
            { text: 'Functions', link: '/api/function' },
          ],
        },
      ],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Voidis',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/LeonCry/cursor-with' }],
  },
});
