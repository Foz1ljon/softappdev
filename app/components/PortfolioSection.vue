<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const { t, lt } = useLocale()
const { filters, selectedCategory, featuredProject } = useProjects()

const sectionRef = ref<HTMLElement>()
const isFlipped = ref(false)

const activeTab = computed({
  get: () => selectedCategory.value,
  set: (val: string) => {
    selectedCategory.value = val as typeof selectedCategory.value
  }
})

function flipCard() {
  isFlipped.value = !isFlipped.value
}

onMounted(() => {
  gsap.fromTo(sectionRef.value!.querySelectorAll('.portfolio-reveal'), {
    opacity: 0,
    y: 50
  }, {
    scrollTrigger: { trigger: sectionRef.value, start: 'top 78%', toggleActions: 'play none none none' },
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  })
})
</script>

<template>
  <section
    id="portfolio"
    ref="sectionRef"
    class="relative py-24 sm:py-32"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="portfolio-reveal mb-12 text-center">
        <span class="mb-3 inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400">{{ t('portfolio.featured') }}</span>
        <h2 class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl">
          {{ t('portfolio.title') }}
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-muted">
          {{ t('portfolio.subtitle') }}
        </p>
      </div>

      <!-- Filter tabs -->
      <div
        role="group"
        :aria-label="t('portfolio.filter')"
        class="portfolio-reveal mb-10 flex flex-wrap justify-center gap-2"
      >
        <button
          v-for="filter in filters"
          :key="filter.value"
          v-motion
          :hovered="{ scale: 1.04, transition: { type: 'spring', stiffness: 260, damping: 18 } }"
          :tapped="{ scale: 0.97 }"
          class="inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors sm:min-h-0"
          :class="activeTab === filter.value
            ? 'border-indigo-500/30 bg-indigo-500/15 text-indigo-300'
            : 'border-transparent bg-accentuated text-muted hover:text-highlighted'"
          @click="activeTab = filter.value"
        >
          <AppIcon
            :name="filter.icon"
            class="h-3.5 w-3.5"
          />
          {{ lt({ en: filter.label, uz: filter.labelUz }) }}
        </button>
      </div>

      <!-- Featured case study, flip card -->
      <div
        class="portfolio-reveal perspective-[1400px] cursor-pointer"
        @click="flipCard"
      >
        <div
          class="relative grid transition-transform duration-700 ease-out"
          :style="{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
        >
          <!-- FRONT -->
          <div
            class="glow-hover glass col-start-1 row-start-1 rounded-3xl p-6 sm:p-10"
            :style="{ backfaceVisibility: 'hidden' }"
          >
            <div class="grid gap-8 lg:grid-cols-5 lg:gap-12">
              <div class="lg:col-span-3">
                <div class="mb-4 flex flex-wrap items-center gap-3">
                  <span class="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">Featured</span>
                  <span class="text-sm text-muted">{{ featuredProject.year }}</span>
                  <span class="ml-auto hidden text-xs text-muted/60 sm:inline">{{ t('portfolio.flipHint') }}</span>
                </div>

                <h3 class="text-2xl font-extrabold text-highlighted sm:text-3xl">
                  {{ featuredProject.name }} — {{ featuredProject.tagline }}
                </h3>

                <p class="mt-4 leading-relaxed text-muted">
                  {{ featuredProject.description }}
                </p>

                <div class="mt-6 flex flex-wrap gap-3">
                  <div
                    v-for="metric in featuredProject.metrics"
                    :key="metric.label"
                    class="rounded-xl bg-accentuated/50 px-4 py-2.5 text-center"
                  >
                    <div class="text-lg font-bold text-highlighted">
                      {{ metric.value }}
                    </div>
                    <div class="text-xs text-muted">
                      {{ metric.label }}
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex flex-wrap gap-2">
                  <span
                    v-for="tag in featuredProject.stack"
                    :key="tag"
                    class="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div class="mt-8 flex flex-wrap gap-3">
                  <NuxtLink
                    v-for="link in featuredProject.links.filter(item => item.internal)"
                    :key="link.label"
                    :to="link.url"
                    class="shimmer inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500"
                    @click.stop
                  >                    <AppIcon
                                         :name="link.icon"
                                         class="h-4 w-4"
                                       />
                    {{ t('portfolio.architecture') }}
                  </NuxtLink>
                  <a
                    v-for="link in featuredProject.links.filter(item => !item.internal)"
                    :key="link.label"
                    :href="link.url"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center gap-2 rounded-full border border-default px-5 py-2.5 text-sm font-semibold text-highlighted transition-all hover:bg-accentuated"
                    @click.stop
                  >
                    <AppIcon
                      :name="link.icon"
                      class="h-4 w-4"
                    />
                    {{ t('portfolio.viewAll') }}
                  </a>
                </div>
              </div>

              <div class="lg:col-span-2">
                <h4 class="mb-4 text-sm font-bold uppercase tracking-wider text-muted">
                  {{ t('portfolio.architectureTitle') }}
                </h4>
                <ul class="space-y-3">
                  <li
                    v-for="(note, i) in featuredProject.architectureNotes"
                    :key="i"
                    class="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <AppIcon
                      name="i-lucide-check-circle-2"
                      class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                    />
                    <span>{{ note }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- BACK -->
          <div
            class="glow-hover glass col-start-1 row-start-1 rounded-3xl p-6 sm:p-10"
            :style="{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }"
          >
            <div class="flex h-full flex-col justify-center">
              <span class="mb-4 inline-block w-fit rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-bold text-indigo-400">Architecture deep dive</span>
              <h3 class="text-2xl font-extrabold text-highlighted sm:text-3xl">
                ConnectMobile system architecture
              </h3>

              <div class="mt-8 grid gap-6 sm:grid-cols-2">
                <div class="space-y-4">
                  <h4 class="text-sm font-bold uppercase tracking-wider text-indigo-400">
                    Client layer
                  </h4>
                  <ul class="space-y-2 text-sm text-muted">
                    <li
                      v-for="item in ['Vue 3 + Capacitor apps', 'Courier terminal with offline queue', 'Operations dashboard (web)', 'Shared design tokens']"
                      :key="item"
                      class="flex items-center gap-2"
                    >
                      <AppIcon
                        name="i-lucide-check"
                        class="h-4 w-4 shrink-0 text-emerald-400"
                      />
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div class="space-y-4">
                  <h4 class="text-sm font-bold uppercase tracking-wider text-cyan-400">
                    Backend layer
                  </h4>
                  <ul class="space-y-2 text-sm text-muted">
                    <li
                      v-for="item in ['NestJS services behind a gateway', 'PostgreSQL transactional core', 'Redis cache + BullMQ queues', 'Idempotent payment webhooks']"
                      :key="item"
                      class="flex items-center gap-2"
                    >
                      <AppIcon
                        name="i-lucide-check"
                        class="h-4 w-4 shrink-0 text-emerald-400"
                      />
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div class="space-y-4">
                  <h4 class="text-sm font-bold uppercase tracking-wider text-emerald-400">
                    Integrations
                  </h4>
                  <ul class="space-y-2 text-sm text-muted">
                    <li
                      v-for="item in ['Click Payment checkout + refunds', 'Uzpost parcel + tracking', 'BTS Express pickups', 'Push (FCM / APNs) + SMS OTP']"
                      :key="item"
                      class="flex items-center gap-2"
                    >
                      <AppIcon
                        name="i-lucide-check"
                        class="h-4 w-4 shrink-0 text-emerald-400"
                      />
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div class="space-y-4">
                  <h4 class="text-sm font-bold uppercase tracking-wider text-amber-400">
                    Delivery
                  </h4>
                  <ul class="space-y-2 text-sm text-muted">
                    <li
                      v-for="item in ['Hetzner + Nginx + Docker', 'Cloudflare CDN / WAF', 'GitHub Actions pipelines', 'Zero-downtime releases']"
                      :key="item"
                      class="flex items-center gap-2"
                    >
                      <AppIcon
                        name="i-lucide-check"
                        class="h-4 w-4 shrink-0 text-emerald-400"
                      />
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mt-8 flex items-center justify-between gap-4">
                <p class="text-sm text-muted/60">
                  {{ t('portfolio.flipBack') }}
                </p>
                <NuxtLink
                  to="/work/connectmobile"
                  class="shimmer inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500"
                  @click.stop
                >
                  <AppIcon
                    name="i-lucide-book-open"
                    class="h-4 w-4"
                  />
                  {{ t('portfolio.architecture') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
