import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './site/src/data/sidebar.mjs';
import { courseStats } from './site/src/data/course.mjs';

const site = 'https://baileyseye.github.io';
const base = '/learn-java-core';
const description = `Пошаговый курс по Java Core из ${courseStats.lessons} уроков в ${courseStats.modules} модулях: реальные исходники из репозитория, упражнения и самопроверка.`;

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  srcDir: './site/src',
  publicDir: './site/public',
  outDir: './dist',
  integrations: [
    starlight({
      title: 'Learn Java Core',
      description,
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Русский', lang: 'ru' }
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/baileyseye/learn-java-core'
        }
      ],
      sidebar,
      pagination: false,
      customCss: ['./site/src/styles/custom.css'],
      components: {
        Footer: './site/src/components/Footer.astro',
        PageTitle: './site/src/components/PageTitle.astro'
      },
      head: [
        { tag: 'meta', attrs: { property: 'og:locale', content: 'ru_RU' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#0f766e' } }
      ]
    })
  ]
});
