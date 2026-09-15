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
    lang: 'uz'
  }
})

useSeoMeta({
  title: `${AGENCY_NAME} — CRM, ERP va mobil ilovalar ishlab chiqish agentligi`,
  description: 'SoftAppDev korporativ mijozlar uchun yuqori unumdorlikdagi CRM/ERP tizimlari, ko‘p platformali mobil ilovalar va kengayuvchan bulut yechimlarini ishlab chiqadi.',
  ogTitle: `${AGENCY_NAME} — Dasturiy ta’minot ishlab chiqish agentligi`,
  ogDescription: 'Korporativ darajadagi CRM, ERP, mobil ilovalar va bulut arxitekturasi — O‘zbekistonda, global miqyos uchun qurilgan.',
  ogImage: 'https://softappdev.uz/og/__og-image/image.png',
  twitterCard: 'summary_large_image'
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
