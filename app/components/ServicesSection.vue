<script setup lang="ts">
import type { LocalizedText } from '~/composables/useLocale'

const { t, lt } = useLocale()

const services: {
  icon: string
  title: LocalizedText
  description: LocalizedText
  bullets: LocalizedText[]
  color: string
  bg: string
  border: string
}[] = [
  {
    icon: 'i-lucide-workflow',
    title: { en: 'Enterprise CRM & ERP systems', uz: 'Korporativ CRM va ERP tizimlari' },
    description: {
      en: 'Custom workflows, role-based access control, WMS/HRMS integration and real-time dashboards modelled on how your business actually operates.',
      uz: 'Maxsus jarayonlar, rolga asoslangan ruxsatlar, WMS/HRMS integratsiyasi va biznesingiz haqiqatda qanday ishlashiga mos real vaqt panellari.'
    },
    bullets: [
      { en: 'Domain modelling before any screen', uz: 'Har qanday ekrandan oldin domen modeli' },
      { en: 'Granular roles, permissions and audit log', uz: 'Nozik rollar, huquqlar va audit jurnali' },
      { en: 'Migration from spreadsheets and legacy tools', uz: 'Jadval va eski tizimlardan ko‘chirish' }
    ],
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20'
  },
  {
    icon: 'i-lucide-smartphone',
    title: { en: 'Cross-platform mobile development', uz: 'Ko‘p platformali mobil ishlab chiqish' },
    description: {
      en: 'Capacitor and native builds from a single Vue codebase — offline sync, push notifications and delivery to both app stores with one release train.',
      uz: 'Bitta Vue kod bazasidan Capacitor va native buildlar — offline sinxronizatsiya, push bildirishnomalar va bitta reliz oqimi bilan ikkala ilova do‘koniga chiqish.'
    },
    bullets: [
      { en: 'Offline-first data flow for field teams', uz: 'Dala jamoalari uchun offline-first ma’lumot oqimi' },
      { en: 'Native camera, geolocation and secure storage', uz: 'Native kamera, geolokatsiya va xavfsiz saqlash' },
      { en: 'Store review and release automation', uz: 'Do‘kon ko‘rigi va reliz avtomatizatsiyasi' }
    ],
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20'
  },
  {
    icon: 'i-lucide-server-cog',
    title: { en: 'High-load backends & API architecture', uz: 'Yuqori yuklamali backend va API arxitekturasi' },
    description: {
      en: 'NestJS and Fastify services, Redis caching, BullMQ job pipelines and event-driven integrations built to survive peak retail or logistics season.',
      uz: 'NestJS va Fastify servislari, Redis kesh, BullMQ navbatlari va savdo yoki logistika mavsumidagi yuklamaga chidamli hodisaga asoslangan integratsiyalar.'
    },
    bullets: [
      { en: 'Domain-split services behind one gateway', uz: 'Bitta gateway ortida domen bo‘yicha bo‘lingan servislar' },
      { en: 'Idempotent payments and webhook reconciliation', uz: 'Idempotent to‘lovlar va webhook solishtiruvi' },
      { en: 'Load testing and observability from day one', uz: 'Birinchi kundan yuklama testi va kuzatuv' }
    ],
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20'
  },
  {
    icon: 'i-lucide-palette',
    title: { en: 'UI/UX systems & component libraries', uz: 'UI/UX tizimlari va komponent kutubxonalari' },
    description: {
      en: 'Design tokens, Figma-to-code pipelines and accessible component libraries so the fourth screen of a product is as fast to build as the first.',
      uz: 'Dizayn tokenlari, Figma’dan kodga oqim va qulay komponent kutubxonalari — mahsulotning to‘rtinchi ekrani birinchisi kabi tez quriladi.'
    },
    bullets: [
      { en: 'One token layer across web and mobile', uz: 'Web va mobil uchun yagona token qatlami' },
      { en: 'Accessible, keyboard-friendly components', uz: 'Qulay, klaviatura bilan boshqariladigan komponentlar' },
      { en: 'Design reviews inside the sprint loop', uz: 'Sprint ichida dizayn ko‘rikdan o‘tkazish' }
    ],
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20'
  }
]

const tilts = services.map(() => useCardTilt(8))
</script>

<template>
  <section
    id="services"
    class="relative py-24 sm:py-32"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
        >
          {{ t('services.title') }}
        </h2>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          class="mx-auto mt-4 max-w-2xl text-muted"
        >
          {{ t('services.subtitle') }}
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="(service, i) in services"
          :key="service.title.en"
          :ref="(el: any) => { tilts[i]!.cardRef.value = el as HTMLElement }"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: (i % 2) * 120 } }"
          class="service-card glow-hover glass group relative overflow-hidden rounded-2xl p-8"
          :style="tilts[i]!.tiltStyle.value"
        >
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl"
            :style="tilts[i]!.glareStyle.value"
          />
          <div class="relative z-10">
            <div
              class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-110"
              :class="[service.bg, service.border]"
            >
              <AppIcon
                :name="service.icon"
                class="h-7 w-7"
                :class="service.color"
              />
            </div>
            <h3 class="text-lg font-bold text-highlighted">
              {{ lt(service.title) }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-muted">
              {{ lt(service.description) }}
            </p>

            <ul class="mt-5 space-y-2">
              <li
                v-for="bullet in service.bullets"
                :key="bullet.en"
                class="flex gap-2.5 text-sm text-muted"
              >
                <AppIcon
                  name="i-lucide-check"
                  class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                />
                <span>{{ lt(bullet) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
