const path = require('path');
const mdContainerDemo = require('./plugins/demo');
const SITE_BASE = process.env.NODE_ENV === 'production' ? '/ld-v2-kit/' : '/';
module.exports = {
  base: SITE_BASE,
  title: 'LDV2 Kit',
  description: '基于 Vue 2.6.14 + ElementUI 打造的轻量级业务组件库与工具库，为前端开发提供开箱即用的一站式解决方案',
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'LDV2 Kit' }],
    [
      'meta',
      {
        property: 'og:description',
        content: '基于 Vue 2.6.14 + ElementUI 打造的轻量级业务组件库与工具库，为前端开发提供开箱即用的一站式解决方案',
      },
    ],
    [
      'meta',
      {
        property: 'og:url',
        content: 'https://chengbotao.github.io/ld-v2-kit',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        href: `/favicon/favicon-96x96.png`,
        sizes: '96x96',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `/favicon/favicon.svg`,
      },
    ],
    ['link', { rel: 'shortcut icon', href: `/favicon/favicon.ico` }],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: `/favicon/apple-touch-icon.png`,
        sizes: '180x180',
      },
    ],
    ['link', { rel: 'manifest', href: `/favicon/site.webmanifest` }],

    [
      'link',
      {
        rel: 'stylesheet',
        href: `/fontawesome/css/fontawesome.css`,
      },
    ],
    ['link', { rel: 'stylesheet', href: `/fontawesome/css/brands.css` }],
    ['link', { rel: 'stylesheet', href: `/fontawesome/css/solid.css` }],
    // ['link', { rel: 'stylesheet', href: `/fontawesome/css/sharp-thin.css` }],
    // [
    //   'link',
    //   {
    //     rel: 'stylesheet',
    //     href: `/fontawesome/css/duotone-thin.css`,
    //   },
    // ],
    // [
    //   'link',
    //   {
    //     rel: 'stylesheet',
    //     href: `/fontawesome/css/sharp-duotone-thin.css`,
    //   },
    // ],
  ],
  additionalPages() {
    const fs = require('fs');
    const path = require('path');

    const componentsDir = path.resolve(__dirname, '../../packages/components');
    const additionalPages = [];

    try {
      const componentDirs = fs.readdirSync(componentsDir);

      componentDirs.forEach(dir => {
        const componentPath = path.join(componentsDir, dir);
        const stat = fs.statSync(componentPath);

        if (stat.isDirectory()) {
          const readmePath = path.join(componentPath, 'README.md');

          if (fs.existsSync(readmePath)) {
            additionalPages.push({
              path: `/${dir}/`,
              filePath: readmePath
            });
          }
        }
      });
    } catch (error) {
      console.warn('Failed to scan components directory:', error);
    }
    return additionalPages;
  },

  themeConfig: {
    logo: `/logo.png`,
    sidebar: [
      {
        title: '组件',
        collapsable: false,
        children: [
          {
            title: 'LdTable 表格',
            path: '/LdTable/',
          },
          {
            title: 'useDialog 弹窗',
            path: '/LdDynamicDialog/',
          },
        ]
      }
    ],
  },
  markdown: {
    extendMarkdown: md => {
      md.use(mdContainerDemo, {
        docRoot: path.resolve(__dirname, '../../packages/components'),
      });
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'core-js/library/fn': 'core-js/es',
        'core-js/library': 'core-js/es',
      }
    }
  }
}
