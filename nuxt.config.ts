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
    description: 'SoftAppDev — mobil, desktop va web ilovalar, Telegram ilovalari, CRM/ERP tizimlari, AI integratsiyalari va DevOps xizmatlarini ishlab chiqadigan IT agentlik.',
    defaultLocale: 'uz'
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
