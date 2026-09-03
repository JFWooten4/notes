import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Notes',
  tagline: 'Public working notes, organized by year and date',
  favicon: 'img/icon.png',

  url: 'https://notes.wooten.link',
  baseUrl: '/',

  future: {
    experimental_faster: true,
  },

  organizationName: 'jfwooten4',
  projectName: 'notes',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        pages: {},
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      logo: {
        alt: 'Notes',
        src: 'img/icon.png',
      },
      items: [{to: '/2026/3/6', label: 'Notes', position: 'left'}],
    },
    footer: {
      style: 'dark',
      copyright: `John Wooten<br><small>${new Date().getFullYear()} <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4</a></small>`,
    },
    prism: {
      theme: {
        plain: {
          color: '#f4efe5',
          backgroundColor: '#15120d',
        },
        styles: [],
      },
      darkTheme: {
        plain: {
          color: '#f4efe5',
          backgroundColor: '#15120d',
        },
        styles: [],
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
