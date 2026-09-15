<script setup lang="ts">
import { AGENCY_NAME } from '~/composables/useSeo'

const { featuredProject } = useProjects()

useSeo(
  {
    title: `${AGENCY_NAME} — Custom CRM, ERP & Mobile Development Agency`,
    description: 'End-to-end custom software development — from enterprise architecture and microservices backends to polished mobile apps. Featuring ConnectMobile, our flagship e-commerce ecosystem.',
    path: '/',
    keywords: ['ConnectMobile', 'e-commerce mobile app', 'Capacitor development', 'NestJS backend', 'Click payment integration']
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
