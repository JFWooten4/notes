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
      title: 'Notes',
      logo: {
        alt: 'Notes',
        src: 'img/icon.png',
      },
      items: [
        {to: '/notes', label: 'Notes', position: 'left'},
        {href: 'https://github.com/jfwooten4/notes', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Explore',
          items: [
            {label: 'Notes', to: '/notes'},
            {label: 'About', to: '/about'},
          ],
        },
        {
          title: 'Source',
          items: [
            {label: 'Repository', href: 'https://github.com/jfwooten4/notes'},
          ],
        },
      ],
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
