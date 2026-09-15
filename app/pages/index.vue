<script setup lang="ts">
import { AGENCY_NAME } from '~/composables/useSeo'

const { featuredProject } = useProjects()

useSeo(
  {
    title: `${AGENCY_NAME} — Mobil, desktop, web va AI yechimlari ishlab chiqish agentligi`,
    description: 'Boshidan oxirigacha dasturiy ta’minot ishlab chiqish — korporativ arxitektura va mikroservis backenddan tortib mobil, desktop va Telegram ilovalari hamda AI integratsiyalarigacha. Asosiy keysimiz — ConnectMobile e-tijorat ekotizimi.',
    path: '/',
    keywords: ['ConnectMobile', 'e-tijorat mobil ilova', 'Capacitor ishlab chiqish', 'NestJS backend', 'Telegram Mini App', 'AI integratsiya', 'Click to‘lov integratsiyasi']
  },
  {
    software: {
      name: featuredProject.value.name,
      tagline: featuredProject.value.tagline,
      description: featuredProject.value.description,
      url: featuredProject.value.url,
      stack: featuredProject.value.stack
    }
  }
)
</script>

<template>
  <div>
    <HeroSection />
    <hr class="border-default mx-auto max-w-7xl">
    <PortfolioSection />
    <hr class="border-default mx-auto max-w-7xl">
    <ServicesSection />
    <hr class="border-default mx-auto max-w-7xl">
    <TechStackSection />
    <hr class="border-default mx-auto max-w-7xl">
    <ProcessSection />
    <hr class="border-default mx-auto max-w-7xl">
    <AboutSection />
    <hr class="border-default mx-auto max-w-7xl">
    <ContactSection />
  </div>
</template>
