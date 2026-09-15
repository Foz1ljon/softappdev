<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { LocalizedText } from '~/composables/useLocale'

gsap.registerPlugin(ScrollTrigger)

const { t, lt } = useLocale()

const headlineRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const badgeRef = ref<HTMLElement>()
const ctasRef = ref<HTMLElement>()
const cardsRef = ref<HTMLElement>()

// One tilt tracker per card: the card element itself carries the transform.
const card1 = useCardTilt(15)
const card2 = useCardTilt(15)
const card3 = useCardTilt(15)

interface HeroCard {
  ref: ReturnType<typeof useCardTilt>
  title: string
  subtitle: LocalizedText
  icon: string
  kind: 'api' | 'app' | 'dashboard'
  accent: 'indigo' | 'emerald' | 'cyan'
  tint: string
  glow: string
  chip: string
  float: string
  pos: string
  /** Small status pill in the card header. */
  status: string
  rows?: { method: string, path: string, time: string }[]
  bars?: number[]
}

const cards: HeroCard[] = [
  {
    ref: card1,
    title: 'Backend API',
    subtitle: { en: 'NestJS · 12 services', uz: 'NestJS · 12 servis' },
    icon: 'i-lucide-server-cog',
    kind: 'api',
    accent: 'indigo',
    tint: 'bg-indigo-500/12',
    glow: 'bg-indigo-500/35',
    chip: 'bg-indigo-500/15 accent-indigo',
    float: 'animate-float',
    pos: 'left-0 top-2 w-[17rem]',
    status: 'p95 · 180ms',
    rows: [
      { method: 'POST', path: '/api/orders', time: '42ms' },
      { method: 'GET', path: '/api/catalog', time: '18ms' },
      { method: 'POST', path: '/api/payments', time: '61ms' }
    ]
  },
  {
    ref: card2,
    title: 'Mobile App',
    subtitle: { en: 'Capacitor · iOS + Android', uz: 'Capacitor · iOS + Android' },
    icon: 'i-lucide-smartphone',
    kind: 'app',
    accent: 'emerald',
    tint: 'bg-emerald-500/12',
    glow: 'bg-emerald-500/35',
    chip: 'bg-emerald-500/15 accent-emerald',
    float: 'animate-float-delayed',
    pos: 'right-0 -top-4 w-[15.5rem]',
    status: 'sync: 3',
    bars: [38, 62, 48, 78, 56, 92, 70]
  },
  {
    ref: card3,
    title: 'Dashboard',
    subtitle: { en: 'Orders · fleet · finance', uz: 'Buyurtma · flot · moliya' },
    icon: 'i-lucide-bar-chart-3',
    kind: 'dashboard',
    accent: 'cyan',
    tint: 'bg-cyan-500/12',
    glow: 'bg-cyan-500/35',
    chip: 'bg-cyan-500/15 accent-cyan',
    float: 'animate-float-slow',
    // Centred without a translate utility: the tilt binding owns `transform`.
    pos: 'left-[calc(50%-8.5rem)] top-64 w-[17rem] lg:top-[min(16rem,29vh)]',
    status: 'live',
    bars: [30, 52, 44, 68, 58, 84, 76]
  }
]

const capabilities: { label: LocalizedText, icon: string }[] = [
  { label: { en: 'CRM & ERP', uz: 'CRM va ERP' }, icon: 'i-lucide-workflow' },
  { label: { en: 'E-commerce', uz: 'E-tijorat' }, icon: 'i-lucide-shopping-cart' },
  { label: { en: 'Logistics & delivery', uz: 'Logistika va yetkazish' }, icon: 'i-lucide-truck' },
  { label: { en: 'Mobile apps', uz: 'Mobil ilovalar' }, icon: 'i-lucide-smartphone' },
  { label: { en: 'Payments', uz: 'To‘lovlar' }, icon: 'i-lucide-credit-card' },
  { label: { en: 'Cloud & DevOps', uz: 'Cloud va DevOps' }, icon: 'i-lucide-cloud-cog' },
  { label: { en: 'Data platforms', uz: 'Ma’lumot platformalari' }, icon: 'i-lucide-database' },
  { label: { en: 'Design systems', uz: 'Dizayn tizimlari' }, icon: 'i-lucide-palette' }
]

const marqueeItems = computed(() => [...capabilities, ...capabilities])

function scrollToSection(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
  timeline
    .from(badgeRef.value!, { opacity: 0, y: 20, duration: 0.6, delay: 0.15 })
    .from(headlineRef.value!, { opacity: 0, y: 30, duration: 0.8 }, '-=0.3')
    .from(subtitleRef.value!, { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    .from(ctasRef.value!, { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
    .from('.hero-card-shell', { opacity: 0, scale: 0.85, y: 40, duration: 0.8, stagger: 0.14 }, '-=0.5')
    .from('.hero-marquee', { opacity: 0, y: 16, duration: 0.5 }, '-=0.3')

  // Gentle scroll parallax on the floating cards and the orbs.
  if (cardsRef.value) {
    gsap.to(cardsRef.value, {
      y: -60,
      ease: 'none',
      scrollTrigger: { trigger: '.hero-root', start: 'top top', end: 'bottom top', scrub: 0.6 }
    })
  }
  gsap.to('.hero-orb', {
    y: 90,
    ease: 'none',
    scrollTrigger: { trigger: '.hero-root', start: 'top top', end: 'bottom top', scrub: 0.8 }
  })
})
</script>

<template>
  <section class="hero-root relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:pt-[max(5rem,11vh)] lg:pb-[max(1.5rem,3vh)]">
    <!-- Three.js scene -->
    <HeroBackground />

    <!-- Decorative orbs -->
    <div class="hero-orb orb absolute -top-32 left-1/4 h-[500px] w-[500px] bg-indigo-600/20" />
    <div class="hero-orb orb absolute top-20 right-1/5 h-[400px] w-[400px] bg-cyan-500/15" />
    <div class="hero-orb orb absolute -bottom-20 left-1/2 h-[350px] w-[350px] bg-emerald-500/10" />
    <div class="bg-grid absolute inset-0" />

    <div class="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- Left copy -->
        <div>
          <div
            ref="badgeRef"
            class="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium accent-emerald lg:mb-[clamp(0.5rem,1.8vh,1.5rem)]"
          >
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {{ t('hero.badge') }}
          </div>

          <h1
            ref="headlineRef"
            class="text-4xl font-extrabold leading-tight tracking-tight text-highlighted sm:text-5xl lg:text-[clamp(2.125rem,4.8vh,3.75rem)]"
          >
            {{ t('hero.title.a') }}
            <br>
            <span class="text-gradient">{{ t('hero.title.b') }}</span>
            <br>
            {{ t('hero.title.c') }}
          </h1>

          <p
            ref="subtitleRef"
            class="mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mt-[clamp(0.5rem,2vh,1.5rem)] lg:text-[clamp(0.9375rem,1.8vh,1.125rem)]"
          >
            {{ t('hero.subtitle') }}
          </p>

          <div
            ref="ctasRef"
            class="mt-8 flex flex-wrap gap-4 lg:mt-[clamp(0.75rem,2.6vh,2rem)]"
          >
            <button
              v-motion
              :hovered="{ scale: 1.04, transition: { type: 'spring', stiffness: 300, damping: 20 } }"
              :tapped="{ scale: 0.97 }"
              class="shimmer inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-500 hover:shadow-indigo-500/40"
              @click="scrollToSection('#portfolio')"
            >
              <AppIcon
                name="i-lucide-arrow-down"
                class="h-5 w-5"
              />
              {{ t('hero.cta.cases') }}
            </button>
            <button
              v-motion
              :hovered="{ scale: 1.04, transition: { type: 'spring', stiffness: 300, damping: 20 } }"
              :tapped="{ scale: 0.97 }"
              class="inline-flex items-center gap-2 rounded-full border border-default px-6 py-3 text-base font-semibold text-highlighted transition-colors hover:bg-accentuated"
              @click="scrollToSection('#contact')"
            >
              <AppIcon
                name="i-lucide-rocket"
                class="h-5 w-5"
              />
              {{ t('hero.cta.start') }}
            </button>
          </div>

          <!-- Featured project shortcut -->
          <NuxtLink
            to="/work/connectmobile"
            class="group mt-8 inline-flex items-center gap-3 rounded-2xl border border-default bg-elevated/50 p-3 pr-4 text-left backdrop-blur-sm transition-colors hover:border-indigo-500/40 hover:bg-accentuated/60 lg:mt-[clamp(0.5rem,2.4vh,2rem)]"
          >
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
              <AppIcon
                name="i-lucide-book-open"
                class="h-5 w-5 accent-indigo"
              />
            </span>
            <span>
              <span class="block text-sm font-semibold text-highlighted">
                {{ lt({ en: 'New case study:', uz: 'Yangi keys:' }) }} ConnectMobile
              </span>
              <span class="block text-xs text-muted">
                {{ lt({ en: '4 products, 12 backend services, offline courier app', uz: '4 mahsulot, 12 backend servis, offline kuryer ilovasi' }) }}
              </span>
            </span>
            <AppIcon
              name="i-lucide-arrow-right"
              class="h-4 w-4 text-muted transition-transform duration-300 group-hover:translate-x-1"
            />
          </NuxtLink>
        </div>

        <!-- Right: 3D product cards -->
        <div
          ref="cardsRef"
          class="relative hidden h-[510px] lg:block lg:h-[min(510px,56vh)]"
        >
          <div
            v-for="card in cards"
            :key="card.title"
            class="hero-card-shell absolute"
            :class="card.pos"
          >
            <!-- Float animation gets its own layer so it cannot fight the tilt transform -->
            <div :class="card.float">
              <div
                :ref="(el: any) => { card.ref.cardRef.value = el as HTMLElement }"
                class="hero-card glass card-3d glow-hover relative rounded-2xl p-4"
                :style="card.ref.tiltStyle.value"
              >
                <!-- Coloured contact shadow, pushed behind the card plane -->
                <div
                  class="card-cast-shadow pointer-events-none absolute inset-x-4 bottom-1 top-6 rounded-3xl"
                  :class="card.glow"
                />
                <!-- Specular sheen -->
                <div class="card-sheen pointer-events-none absolute inset-0 rounded-2xl" />
                <!-- Pointer glare -->
                <div
                  class="pointer-events-none absolute inset-0 rounded-2xl"
                  :style="card.ref.glareStyle.value"
                />

                <!-- Header sits on the closest parallax layer -->
                <div class="depth-3 relative flex items-center gap-2.5">
                  <div
                    class="flex h-9 w-9 items-center justify-center rounded-xl"
                    :class="card.tint"
                  >
                    <AppIcon
                      :name="card.icon"
                      class="h-5 w-5"
                      :class="`accent-${card.accent}`"
                    />
                  </div>
                  <div class="min-w-0">
                    <div class="truncate text-sm font-semibold text-highlighted">
                      {{ card.title }}
                    </div>
                    <div class="truncate text-[10px] text-muted">
                      {{ lt(card.subtitle) }}
                    </div>
                  </div>
                  <span
                    class="ml-auto flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold"
                    :class="card.chip"
                  >
                    <span
                      class="h-1.5 w-1.5 animate-pulse rounded-full"
                      :class="`dot-${card.accent}`"
                    />
                    {{ card.status }}
                  </span>
                </div>

                <!-- Backend API: request log -->
                <div
                  v-if="card.kind === 'api'"
                  class="depth-1 relative mt-3 space-y-1.5"
                >
                  <div
                    v-for="row in card.rows"
                    :key="row.path"
                    class="hero-card-ui flex items-center gap-2 rounded-lg px-2.5 py-1.5"
                  >
                    <span
                      class="rounded px-1.5 py-0.5 text-[9px] font-bold"
                      :class="row.method === 'POST' ? 'bg-indigo-500/15 accent-indigo' : 'bg-emerald-500/15 accent-emerald'"
                    >
                      {{ row.method }}
                    </span>
                    <span class="truncate font-mono text-[10px] text-highlighted">{{ row.path }}</span>
                    <span class="ml-auto flex shrink-0 items-center gap-1 text-[9px] text-muted">
                      <span class="dot-emerald h-1.5 w-1.5 rounded-full" />
                      {{ row.time }}
                    </span>
                  </div>
                </div>

                <!-- Mobile app: live order + weekly deliveries -->
                <div
                  v-else-if="card.kind === 'app'"
                  class="depth-1 hero-card-ui relative mt-3 rounded-xl p-2.5"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-semibold text-highlighted">Order #1842</span>
                    <span class="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-semibold accent-emerald">
                      {{ lt({ en: 'in transit', uz: 'yo‘lda' }) }}
                    </span>
                  </div>
                  <div class="mt-2 flex h-12 items-end gap-1">
                    <div
                      v-for="(bar, i) in card.bars"
                      :key="i"
                      class="flex-1 rounded-t-[3px] bg-gradient-to-t from-emerald-500/25 to-emerald-500"
                      :style="{ height: `${bar}%` }"
                    />
                  </div>
                  <div class="mt-2 flex items-center justify-between text-[9px] text-muted">
                    <span>{{ lt({ en: 'Mon', uz: 'Du' }) }}</span>
                    <span class="flex items-center gap-1">
                      <span class="dot-emerald h-1.5 w-1.5 rounded-full" />
                      {{ lt({ en: 'queued: 3', uz: 'navbatda: 3' }) }}
                    </span>
                    <span>{{ lt({ en: 'Sun', uz: 'Ya' }) }}</span>
                  </div>
                </div>

                <!-- Dashboard: revenue + dispatch -->
                <div
                  v-else
                  class="depth-1 relative mt-3 space-y-1.5"
                >
                  <div class="hero-card-ui rounded-xl p-2.5">
                    <div class="flex items-baseline justify-between">
                      <span class="text-[10px] text-muted">GMV · 30d</span>
                      <span class="text-[10px] font-semibold accent-cyan">+18.4%</span>
                    </div>
                    <div class="mt-0.5 text-lg font-extrabold text-highlighted">
                      $412k
                    </div>
                    <div class="mt-1.5 flex h-8 items-end gap-[3px]">
                      <div
                        v-for="(bar, i) in card.bars"
                        :key="i"
                        class="flex-1 rounded-t-[2px] bg-gradient-to-t from-cyan-500/25 to-cyan-400"
                        :style="{ height: `${bar}%` }"
                      />
                    </div>
                  </div>
                  <div class="hero-card-ui flex items-center gap-2 rounded-lg px-2.5 py-1.5">
                    <span class="dot-cyan h-1.5 w-1.5 rounded-full" />
                    <span class="text-[10px] text-highlighted">{{ lt({ en: '18 couriers on shift', uz: '18 kuryer smenada' }) }}</span>
                    <span class="ml-auto text-[9px] text-muted">98.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative rings -->
          <div class="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-indigo-500/15" />
          <div class="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/5" />
        </div>
      </div>

      <!-- Capability marquee -->
      <div class="hero-marquee marquee-mask mt-16 overflow-hidden border-t border-default pt-6 lg:mt-[clamp(0.75rem,3.6vh,4rem)] lg:pt-[clamp(0.5rem,2vh,1.5rem)]">
        <div class="animate-marquee flex w-max items-center gap-8">
          <span
            v-for="(item, i) in marqueeItems"
            :key="`${item.label.en}-${i}`"
            class="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-muted"
          >
            <AppIcon
              :name="item.icon"
              class="h-4 w-4 accent-indigo opacity-80"
            />
            {{ lt(item.label) }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
