<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AGENCY_NAME } from '~/composables/useSeo'

gsap.registerPlugin(ScrollTrigger)

const { t } = useLocale()
const study = useCaseStudy()

const activeProductId = ref(study.products[0]!.id)
const activeProduct = computed(
  () => study.products.find(product => product.id === activeProductId.value) ?? study.products[0]!
)

const accents = {
  indigo: { text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/25', dot: 'bg-indigo-400' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/25', dot: 'bg-cyan-400' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', dot: 'bg-emerald-400' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/25', dot: 'bg-amber-400' }
} as const

const lifecycleRef = ref<HTMLElement>()
const marqueeItems = computed(() => [...study.stack, ...study.stack])

function openLiveProject() {
  window.open(study.liveUrl, '_blank', 'noopener')
}

function scrollToContact() {
  navigateTo('/#contact')
}

useSeo(
  {
    title: `${study.name} — E-tijorat va yetkazish ekotizimi keysi | ${AGENCY_NAME}`,
    description: 'ConnectMobile ichkarisi: mijoz mobil ilovasi, offline-first kuryer terminali, Ant Design boshqaruv paneli va buyurtma, Click to‘lovlari, kuryer marshrutlash hamda hisob-kitobni qamrab oluvchi o‘n ikkita NestJS backend servisi.',
    path: study.path,
    type: 'article',
    keywords: ['ConnectMobile keys', 'yetkazish ilovasi ishlab chiqish', 'kuryer ilovasi', 'NestJS mikroservislar', 'Fastify', 'MongoDB', 'Capacitor', 'Ant Design', 'Click Payment integratsiyasi', 'Uzpost API', 'BTS Express']
  },
  {
    software: {
      name: study.name,
      tagline: study.tagline,
      description: study.summary,
      url: study.liveUrl,
      stack: study.stack.slice(0, 8)
    }
  }
)

onMounted(() => {
  const line = lifecycleRef.value?.querySelector('[data-lifecycle-line]')
  if (line && lifecycleRef.value) {
    gsap.fromTo(line, { scaleY: 0 }, {
      scaleY: 1,
      transformOrigin: 'top center',
      ease: 'none',
      scrollTrigger: {
        trigger: lifecycleRef.value,
        start: 'top 70%',
        end: 'bottom 80%',
        scrub: 0.6
      }
    })
  }
})
</script>

<template>
  <div class="relative">
    <!-- ── Hero ── -->
    <section class="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      <div class="orb absolute -top-32 left-1/4 h-[480px] w-[480px] bg-indigo-600/20" />
      <div class="orb absolute top-24 right-1/5 h-[380px] w-[380px] bg-cyan-500/15" />
      <div class="bg-grid absolute inset-0" />

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <NuxtLink
          v-motion
          to="/#portfolio"
          :initial="{ opacity: 0, y: -8 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
          class="mb-4 -ms-2 inline-flex min-h-10 items-center gap-2 rounded-full px-2 text-sm font-medium text-muted transition-colors hover:text-highlighted sm:mb-6"
        >
          <AppIcon
            name="i-lucide-arrow-left"
            class="h-4 w-4"
          />
          {{ t('case.back') }}
        </NuxtLink>

        <div class="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div
              v-motion
              :initial="{ opacity: 0, y: 18 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
              class="mb-5 flex flex-wrap items-center gap-3"
            >
              <span class="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300">
                {{ t('case.eyebrow') }}
              </span>
              <span class="text-sm text-muted">{{ study.period }}</span>
            </div>

            <h1
              v-motion
              :initial="{ opacity: 0, y: 26 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 650, delay: 80 } }"
              class="text-4xl font-extrabold tracking-tight text-highlighted sm:text-5xl lg:text-6xl"
            >
              {{ study.name }}
            </h1>

            <p
              v-motion
              :initial="{ opacity: 0, y: 22 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 650, delay: 160 } }"
              class="mt-4 text-xl font-semibold text-gradient sm:text-2xl"
            >
              {{ study.tagline }}
            </p>

            <p
              v-motion
              :initial="{ opacity: 0, y: 22 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 650, delay: 240 } }"
              class="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
            >
              {{ study.summary }}
            </p>

            <div
              v-motion
              :initial="{ opacity: 0, y: 22 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 650, delay: 320 } }"
              class="mt-8 flex flex-wrap gap-4"
            >
              <button
                class="shimmer inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40"
                @click="openLiveProject"
              >
                <AppIcon
                  name="i-lucide-external-link"
                  class="h-5 w-5"
                />
                {{ study.domain }}
              </button>
              <button
                class="inline-flex items-center gap-2 rounded-full border border-default px-6 py-3 text-base font-semibold text-highlighted transition-all hover:bg-accentuated"
                @click="scrollToContact"
              >
                <AppIcon
                  name="i-lucide-rocket"
                  class="h-5 w-5"
                />
                {{ t('case.cta') }}
              </button>
            </div>
          </div>

          <!-- Metrics -->
          <div
            v-motion
            :initial="{ opacity: 0, scale: 0.96 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 200 } }"
            class="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl sm:grid-cols-3 lg:grid-cols-2"
          >
            <div
              v-for="(metric, i) in study.metrics"
              :key="metric.label"
              v-motion
              :initial="{ opacity: 0, y: 14 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 260 + i * 70 } }"
              class="p-5"
            >
              <div class="text-3xl font-extrabold text-highlighted">
                {{ metric.value }}
              </div>
              <div class="mt-1 text-xs text-muted">
                {{ metric.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Stack marquee ── -->
    <section class="relative border-y border-default py-5">
      <div class="marquee-mask overflow-hidden">
        <div class="animate-marquee flex w-max items-center gap-3">
          <span
            v-for="(item, i) in marqueeItems"
            :key="`${item}-${i}`"
            class="whitespace-nowrap rounded-full border border-default bg-accentuated/60 px-4 py-1.5 text-xs font-medium text-muted"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </section>

    <!-- ── Ecosystem ── -->
    <section
      id="ecosystem"
      class="relative overflow-x-clip py-24 sm:py-28"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-14 max-w-3xl">
          <h2
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
          >
            {{ t('case.ecosystem.title') }}
          </h2>
          <p
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
            class="mt-4 text-muted"
          >
            {{ t('case.ecosystem.subtitle') }}
          </p>
        </div>

        <div class="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div class="glass relative aspect-square overflow-hidden rounded-3xl sm:aspect-4/3 lg:aspect-square">
            <CaseStudyScene :active-id="activeProductId" />
            <div class="pointer-events-none absolute inset-0 flex flex-col justify-between p-5">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="product in study.products"
                  :key="product.id"
                  class="rounded-full border px-3 py-1 text-[11px] font-semibold transition-all duration-300"
                  :class="activeProductId === product.id
                    ? `${accents[product.accent].border} ${accents[product.accent].bg} ${accents[product.accent].text}`
                    : 'border-default bg-accentuated/60 text-muted'"
                >
                  {{ product.name }}
                </span>
              </div>
              <p class="text-xs text-muted/70">
                {{ t('case.ecosystem.hint') }}
              </p>
            </div>
          </div>

          <div class="space-y-3">
            <button
              v-for="(product, i) in study.products"
              :key="product.id"
              v-motion
              :initial="{ opacity: 0, x: 24 }"
              :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: i * 90 } }"
              class="glow-hover glass flex w-full items-start gap-4 rounded-2xl p-5 text-left transition-all"
              :class="activeProductId === product.id ? 'border-indigo-500/40 ring-1 ring-indigo-500/20' : ''"
              @click="activeProductId = product.id"
            >
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300"
                :class="[accents[product.accent].bg, activeProductId === product.id ? 'scale-110' : '']"
              >
                <AppIcon
                  :name="product.icon"
                  class="h-5 w-5"
                  :class="accents[product.accent].text"
                />
              </div>
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <span class="font-semibold text-highlighted">{{ product.name }}</span>
                  <span class="rounded-full bg-accentuated px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">{{ product.platform.split(' · ')[0] }}</span>
                </div>
                <p class="mt-1 text-xs font-medium text-muted">
                  {{ product.kind }}
                </p>
                <p class="mt-2 text-sm leading-relaxed text-muted">
                  {{ product.tagline }}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Product deep dive ── -->
    <section
      id="deep-dive"
      class="relative overflow-x-clip py-24 sm:py-28"
    >
      <div class="orb absolute top-1/3 -left-24 h-[420px] w-[420px] bg-indigo-600/10" />

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-10 flex flex-wrap items-center gap-3">
          <h2
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
            class="mr-auto text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
          >
            {{ t('case.deepDive.title') }}
          </h2>
        </div>

        <div class="mb-10 flex flex-wrap gap-2">
          <button
            v-for="product in study.products"
            :key="product.id"
            class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all"
            :class="activeProductId === product.id
              ? 'border-indigo-500/40 bg-indigo-500/15 text-indigo-300'
              : 'border-transparent bg-accentuated text-muted hover:text-highlighted'"
            @click="activeProductId = product.id"
          >
            <AppIcon
              :name="product.icon"
              class="h-4 w-4"
            />
            {{ product.name }}
          </button>
        </div>

        <div :key="activeProduct.id">
          <div
            v-motion
            :initial="{ opacity: 0, y: 26 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 550 } }"
            class="glass rounded-3xl p-6 sm:p-10"
          >
            <div class="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
              <div>
                <span
                  class="text-xs font-semibold uppercase tracking-wider"
                  :class="accents[activeProduct.accent].text"
                >
                  {{ activeProduct.kind }}
                </span>
                <h3 class="mt-2 text-2xl font-extrabold text-highlighted sm:text-3xl">
                  {{ activeProduct.name }}
                </h3>
                <p class="mt-4 leading-relaxed text-muted">
                  {{ activeProduct.summary }}
                </p>
              </div>

              <div class="space-y-4">
                <div class="rounded-2xl border border-default bg-accentuated/40 p-4">
                  <div class="text-xs font-semibold uppercase tracking-wider text-muted">
                    {{ t('case.stackLabel') }}
                  </div>
                  <p class="mt-2 text-sm font-medium text-highlighted">
                    {{ activeProduct.platform }}
                  </p>
                </div>
                <div
                  class="rounded-2xl border p-4"
                  :class="[accents[activeProduct.accent].border, accents[activeProduct.accent].bg]"
                >
                  <div
                    class="text-xs font-semibold uppercase tracking-wider"
                    :class="accents[activeProduct.accent].text"
                  >
                    {{ t('case.capabilities') }}
                  </div>
                  <div class="mt-3 flex flex-wrap gap-1.5">
                    <span
                      v-for="capability in activeProduct.capabilities"
                      :key="capability"
                      class="rounded-full bg-app/40 px-2.5 py-1 text-xs font-medium text-highlighted"
                    >
                      {{ capability }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="(module, i) in activeProduct.modules"
                :key="module.title"
                v-motion
                :initial="{ opacity: 0, y: 22 }"
                :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 120 + i * 80 } }"
                class="glow-hover rounded-2xl border border-default bg-app/40 p-5"
              >
                <div class="flex items-center gap-2">
                  <span
                    class="h-1.5 w-1.5 rounded-full"
                    :class="accents[activeProduct.accent].dot"
                  />
                  <h4 class="font-semibold text-highlighted">
                    {{ module.title }}
                  </h4>
                </div>
                <p class="mt-2 text-sm leading-relaxed text-muted">
                  {{ module.body }}
                </p>
              </article>
            </div>

            <div class="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5">
              <AppIcon
                name="i-lucide-check-circle-2"
                class="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
              />
              <p class="text-sm leading-relaxed text-highlighted">
                {{ activeProduct.outcome }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Backend services ── -->
    <section
      id="backend"
      class="relative overflow-x-clip py-24 sm:py-28"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-12 max-w-3xl">
          <h2
            v-motion
            :initial="{ opacity: 0, y: 22 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 550 } }"
            class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
          >
            {{ t('case.backend.title') }}
          </h2>
          <p
            v-motion
            :initial="{ opacity: 0, y: 18 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 550, delay: 90 } }"
            class="mt-4 text-muted"
          >
            {{ t('case.backend.subtitle') }}
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(service, i) in study.services"
            :key="service.name"
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 480, delay: (i % 3) * 90 } }"
            class="glow-hover glass rounded-2xl p-5"
          >
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                <AppIcon
                  :name="service.icon"
                  class="h-5 w-5 text-amber-400"
                />
              </div>
              <div>
                <h3 class="font-semibold text-highlighted">
                  {{ service.name }}
                </h3>
                <p class="text-xs text-muted">
                  {{ service.role }}
                </p>
              </div>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-muted">
              {{ service.detail }}
            </p>
            <div class="mt-4 flex flex-wrap gap-1.5">
              <span
                v-for="store in service.stores"
                :key="store"
                class="rounded-full border border-default px-2.5 py-0.5 text-[11px] font-medium text-muted"
              >
                {{ store }}
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Integrations ── -->
    <section
      id="integrations"
      class="relative overflow-x-clip py-24 sm:py-28"
    >
      <div class="orb absolute top-1/4 right-0 h-[380px] w-[380px] bg-cyan-500/10" />

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-12 max-w-3xl">
          <h2
            v-motion
            :initial="{ opacity: 0, y: 22 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 550 } }"
            class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
          >
            {{ t('case.integrations.title') }}
          </h2>
          <p
            v-motion
            :initial="{ opacity: 0, y: 18 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 550, delay: 90 } }"
            class="mt-4 text-muted"
          >
            {{ t('case.integrations.subtitle') }}
          </p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <article
            v-for="(integration, i) in study.integrations"
            :key="integration.name"
            v-motion
            :initial="{ opacity: 0, y: 26 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 520, delay: i * 100 } }"
            class="glow-hover glass rounded-2xl p-6"
          >
            <div class="flex items-center gap-3">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">
                <AppIcon
                  :name="integration.icon"
                  class="h-5 w-5 text-cyan-400"
                />
              </div>
              <div>
                <h3 class="font-semibold text-highlighted">
                  {{ integration.name }}
                </h3>
                <p class="text-xs text-muted">
                  {{ integration.purpose }}
                </p>
              </div>
            </div>
            <ul class="mt-4 space-y-2.5">
              <li
                v-for="note in integration.notes"
                :key="note"
                class="flex gap-2.5 text-sm leading-relaxed text-muted"
              >
                <AppIcon
                  name="i-lucide-check"
                  class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                />
                <span>{{ note }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Order lifecycle ── -->
    <section
      id="lifecycle"
      ref="lifecycleRef"
      class="relative overflow-x-clip py-24 sm:py-28"
    >
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div class="mb-14 max-w-3xl">
          <h2
            v-motion
            :initial="{ opacity: 0, y: 22 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 550 } }"
            class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
          >
            {{ t('case.lifecycle.title') }}
          </h2>
          <p
            v-motion
            :initial="{ opacity: 0, y: 18 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 550, delay: 90 } }"
            class="mt-4 text-muted"
          >
            {{ t('case.lifecycle.subtitle') }}
          </p>
        </div>

        <div class="relative pl-12 sm:pl-16">
          <div class="absolute left-4 top-2 bottom-2 w-px bg-accentuated sm:left-6" />
          <div
            data-lifecycle-line
            class="absolute left-4 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-indigo-500 via-cyan-500 to-emerald-500 sm:left-6"
          />

          <ol class="space-y-8">
            <li
              v-for="(step, i) in study.lifecycle"
              :key="step.title"
              v-motion
              :initial="{ opacity: 0, x: 26 }"
              :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: (i % 4) * 80 } }"
              class="relative"
            >
              <span class="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-default bg-app text-xs font-bold text-highlighted sm:-left-16 sm:h-9 sm:w-9">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <div class="glass glow-hover rounded-2xl p-5">
                <div class="flex items-center gap-2">
                  <AppIcon
                    :name="step.icon"
                    class="h-4 w-4 text-indigo-400"
                  />
                  <h3 class="font-semibold text-highlighted">
                    {{ step.title }}
                  </h3>
                </div>
                <p class="mt-2 text-sm leading-relaxed text-muted">
                  {{ step.body }}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ── Principles & phases ── -->
    <section class="relative overflow-x-clip py-24 sm:py-28">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-14 lg:grid-cols-2">
          <div>
            <h2
              v-motion
              :initial="{ opacity: 0, y: 22 }"
              :visible-once="{ opacity: 1, y: 0, transition: { duration: 550 } }"
              class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
            >
              {{ t('case.principles.title') }}
            </h2>
            <ul class="mt-8 space-y-4">
              <li
                v-for="(principle, i) in study.principles"
                :key="principle"
                v-motion
                :initial="{ opacity: 0, y: 18 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 460, delay: i * 70 } }"
                class="flex gap-3 text-sm leading-relaxed text-muted"
              >
                <AppIcon
                  name="i-lucide-check-circle-2"
                  class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                />
                <span>{{ principle }}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2
              v-motion
              :initial="{ opacity: 0, y: 22 }"
              :visible-once="{ opacity: 1, y: 0, transition: { duration: 550 } }"
              class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
            >
              {{ t('case.phases.title') }}
            </h2>
            <ol class="mt-8 space-y-4">
              <li
                v-for="(phase, i) in study.phases"
                :key="phase.title"
                v-motion
                :initial="{ opacity: 0, y: 18 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 460, delay: i * 70 } }"
                class="glass glow-hover rounded-2xl p-5"
              >
                <div class="flex items-baseline justify-between gap-4">
                  <h3 class="font-semibold text-highlighted">
                    {{ phase.title }}
                  </h3>
                  <span class="shrink-0 text-xs font-medium text-indigo-300">{{ phase.period }}</span>
                </div>
                <p class="mt-2 text-sm leading-relaxed text-muted">
                  {{ phase.body }}
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Stack + CTA ── -->
    <section class="relative pb-28 pt-8">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="glass overflow-hidden rounded-3xl p-6 sm:p-10">
          <h2 class="text-sm font-bold uppercase tracking-wider text-muted">
            {{ t('case.stackLabel') }}
          </h2>
          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="(item, i) in study.stack"
              :key="item"
              v-motion
              :initial="{ opacity: 0, scale: 0.92 }"
              :visible-once="{ opacity: 1, scale: 1, transition: { duration: 380, delay: i * 35 } }"
              class="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 text-sm font-medium text-indigo-200"
            >
              {{ item }}
            </span>
          </div>

          <div class="mt-10 flex flex-col gap-6 border-t border-default pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 class="text-2xl font-extrabold text-highlighted">
                {{ t('case.ctaTitle') }}
              </h3>
              <p class="mt-2 max-w-xl text-muted">
                {{ t('case.ctaBody') }}
              </p>
            </div>
            <NuxtLink
              to="/#contact"
              class="shimmer inline-flex shrink-0 items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500"
            >
              <AppIcon
                name="i-lucide-sparkles"
                class="h-5 w-5"
              />
              {{ t('case.cta') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
