// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/fonts',
    '@nuxtjs/seo',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/hints',
    '@nuxt/a11y',
    '@vueuse/motion/nuxt'
  ],

  devtools: {
    enabled: process.env.NODE_ENV !== 'production'
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://softappdev.uz',
    name: 'SoftAppDev',
    description: 'SoftAppDev is an IT agency engineering custom CRM/ERP systems, high-load web platforms, cross-platform mobile applications and cloud solutions.',
    defaultLocale: 'en'
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://softappdev.uz'
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/privacy': { prerender: true },
    '/terms': { prerender: true },
    '/work/connectmobile': { prerender: true },
    '/api/estimate': { prerender: false }
  },

  compatibilityDate: '2026-06-30',

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    families: [
      { name: 'Plus Jakarta Sans', provider: 'google', weights: [400, 500, 600, 700, 800] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600] }
    ]
  },

  image: {
    format: ['avif', 'webp'],
    quality: 82
  }
})
