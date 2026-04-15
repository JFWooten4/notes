import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Notes',
  tagline: 'Public working notes, organized by year and date',
  favicon: 'img/icon.png',

  url: 'https://example.com',
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
          routeBasePath: 'docs',
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
        {to: '/docs', label: 'Docs', position: 'left'},
        {href: 'https://github.com/jfwooten4/notes', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Explore',
          items: [
            {label: 'Docs', to: '/docs'},
            {label: 'Latest Notes', to: '/docs/notes'},
          ],
        },
        {
          title: 'Source',
          items: [
            {label: 'Repository', href: 'https://github.com/jfwooten4/notes'},
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} Notes`,
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
