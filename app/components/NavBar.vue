<script setup lang="ts">
const { t, toggleLocale, currentLocale } = useLocale()
const isDark = inject<Ref<boolean>>('isDark')!
const toggleDark = inject<() => void>('toggleDark')!

const navLinks = computed(() => [
  { id: 'services', label: t('nav.services'), href: '#services' },
  { id: 'portfolio', label: t('nav.portfolio'), href: '#portfolio' },
  { id: 'stack', label: t('nav.stack'), href: '#stack' },
  { id: 'process', label: t('nav.process'), href: '#process' },
  { id: 'about', label: t('nav.about'), href: '#about' },
  { id: 'contact', label: t('nav.contact'), href: '#contact' }
])

const mobileOpen = ref(false)
const scrolled = ref(false)
const progress = ref(0)
const activeSection = ref('')

let observer: IntersectionObserver | null = null

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0
  scrolled.value = window.scrollY > 24
}

async function scrollTo(href: string) {
  mobileOpen.value = false
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  await navigateTo(`/${href}`)
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
  if (sections.length > 0 && typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target.id) {
        activeSection.value = visible.target.id
      }
    }, { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] })
    sections.forEach(section => observer!.observe(section))
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 transition-all duration-300 sm:px-6 lg:px-8"
      :class="scrolled ? 'glass-strong border-b border-default' : 'glass-strong'"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex shrink-0 items-center gap-2 rounded-md p-1 -ms-1 focus:outline-2 focus:outline-indigo-500/25"
      >
        <AppLogo class="h-7 w-7" />
        <span class="text-lg font-bold tracking-tight text-highlighted">SoftappDev</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <ul class="hidden items-center gap-1 lg:flex">
        <li
          v-for="link in navLinks"
          :key="link.href"
        >
          <button
            class="relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
            :class="activeSection === link.id ? 'text-highlighted' : 'text-muted hover:text-highlighted hover:bg-accentuated'"
            @click="scrollTo(link.href)"
          >
            {{ link.label }}
            <span
              v-if="activeSection === link.id"
              class="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
            />
          </button>
        </li>
      </ul>

      <!-- Right cluster -->
      <div class="flex items-center gap-2">
        <button
          v-motion
          :hovered="{ scale: 1.06 }"
          :tapped="{ scale: 0.94 }"
          class="rounded-full bg-accentuated px-3 py-1 text-xs font-semibold text-muted transition-colors hover:text-highlighted"
          :aria-label="`Switch language, current ${currentLocale.label}`"
          @click="toggleLocale"
        >
          {{ currentLocale.shortLabel }}
        </button>

        <button
          v-motion
          :hovered="{ scale: 1.1, rotate: 12 }"
          :tapped="{ scale: 0.9 }"
          class="flex h-8 w-8 items-center justify-center rounded-full bg-accentuated transition-colors hover:bg-indigo-500/15"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleDark"
        >
          <AppIcon
            :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
            class="h-4 w-4 text-muted"
          />
        </button>

        <button
          v-motion
          :hovered="{ scale: 1.04 }"
          :tapped="{ scale: 0.96 }"
          class="shimmer hidden rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-500 sm:inline-flex"
          @click="scrollTo('#contact')"
        >
          <AppIcon
            name="i-lucide-sparkles"
            class="mr-1.5 h-4 w-4"
          />
          {{ t('nav.cta') }}
        </button>

        <button
          class="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-highlighted lg:hidden"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
          @click="mobileOpen = !mobileOpen"
        >
          <AppIcon
            :name="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            class="h-5 w-5"
          />
        </button>
      </div>
    </nav>

    <!-- Scroll progress -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="h-px w-full bg-transparent">
        <div
          class="h-px origin-left bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 transition-transform duration-150"
          :style="{ transform: `scaleX(${progress})` }"
        />
      </div>
    </div>

    <!-- Mobile drawer -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="glass-strong mx-4 mt-2 rounded-xl p-4 lg:hidden"
      >
        <ul class="flex flex-col gap-1">
          <li
            v-for="link in navLinks"
            :key="link.href"
          >
            <button
              class="w-full rounded-lg px-3 py-2.5 text-left text-base font-medium transition-colors"
              :class="activeSection === link.id ? 'text-highlighted bg-accentuated' : 'text-muted hover:text-highlighted hover:bg-accentuated'"
              @click="scrollTo(link.href)"
            >
              {{ link.label }}
            </button>
          </li>
          <li class="border-t border-default pt-2">
            <button
              class="shimmer w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-base font-semibold text-white"
              @click="scrollTo('#contact')"
            >
              {{ t('nav.cta') }}
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
