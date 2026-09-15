<script setup lang="ts">
import { AGENCY_NAME } from '~/composables/useSeo'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'apple-touch-icon', href: '/favicon.svg' }
  ],
  htmlAttrs: {
    lang: 'en',
    class: 'dark'
  }
})

useSeoMeta({
  title: `${AGENCY_NAME} — Custom CRM, ERP & Mobile Development Agency`,
  description: 'SoftAppDev engineers high-performance CRM/ERP systems, cross-platform mobile applications, and scalable cloud solutions for enterprise clients.',
  ogTitle: `${AGENCY_NAME} — Custom Software Development Agency`,
  ogDescription: 'Enterprise-grade CRM, ERP, mobile apps and cloud architecture — built in Uzbekistan for global scale.',
  ogImage: 'https://softappdev.uz/og/__og-image/image.png',
  twitterCard: 'summary_large_image'
})

// ── Dark mode ──
const colorMode = useCookie<'light' | 'dark'>('sad-color-mode', {
  default: () => 'dark',
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax'
})

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (val: boolean) => {
    colorMode.value = val ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', val)
  }
})

provide('isDark', isDark)
provide('toggleDark', () => {
  isDark.value = !isDark.value
})

onMounted(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>

<template>
  <div class="relative min-h-screen bg-app text-app">
    <!-- Ambient three.js backdrop -->
    <GlobalBackdrop />

    <NavBar />

    <main class="relative z-10">
      <NuxtPage />
    </main>

    <FooterSection class="relative z-10" />
  </div>
</template>
