<script setup lang="ts">
import { AGENCY_EMAIL, AGENCY_LEGAL_NAME, AGENCY_NAME } from '~/composables/useSeo'

const { t } = useLocale()
const currentYear = new Date().getFullYear()

const serviceLinks = [
  { label: 'Mobil va desktop ilovalar', href: '#services' },
  { label: 'Web platformalar va API', href: '#services' },
  { label: 'Telegram ilovalar', href: '#services' },
  { label: 'AI integratsiyalar', href: '#services' },
  { label: 'Cloud va DevOps', href: '#services' }
]

const companyLinks = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Texnologiyalar', href: '#stack' },
  { label: 'Qanday ishlaymiz', href: '#process' },
  { label: 'Kompaniya', href: '#about' }
]

const socialLinks = [
  { icon: 'i-simple-icons-github', url: 'https://github.com/softappdev', label: 'GitHub' },
  { icon: 'i-simple-icons-telegram', url: 'https://t.me/softappdev', label: 'Telegram' },
  { icon: 'i-simple-icons-linkedin', url: 'https://www.linkedin.com/company/softappdev', label: 'LinkedIn' }
]

async function go(href: string) {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  await navigateTo(`/${href}`)
}
</script>

<template>
  <footer class="relative border-t border-default pt-14 pb-10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <NuxtLink
            to="/"
            class="flex items-center gap-2"
          >
            <AppLogo class="h-8 w-8" />
            <span class="text-lg font-bold tracking-tight text-highlighted">{{ AGENCY_NAME }}</span>
          </NuxtLink>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {{ t('footer.tagline') }}
          </p>
          <div class="mt-5 flex items-center gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.url"
              target="_blank"
              rel="noopener"
              :aria-label="social.label"
              class="flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-accentuated hover:text-highlighted sm:h-9 sm:w-9"
            >
              <AppIcon
                :name="social.icon"
                class="h-4 w-4"
              />
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-bold uppercase tracking-wider text-highlighted">
            {{ t('footer.services') }}
          </h3>
          <ul class="mt-3 space-y-1 sm:mt-4 sm:space-y-2.5">
            <li
              v-for="link in serviceLinks"
              :key="link.label"
            >
              <button
                class="inline-flex min-h-9 items-center text-left text-sm text-muted transition-colors hover:text-highlighted sm:min-h-0"
                @click="go(link.href)"
              >
                {{ link.label }}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-bold uppercase tracking-wider text-highlighted">
            {{ t('footer.company') }}
          </h3>
          <ul class="mt-3 space-y-1 sm:mt-4 sm:space-y-2.5">
            <li
              v-for="link in companyLinks"
              :key="link.label"
            >
              <button
                class="inline-flex min-h-9 items-center text-left text-sm text-muted transition-colors hover:text-highlighted sm:min-h-0"
                @click="go(link.href)"
              >
                {{ link.label }}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-bold uppercase tracking-wider text-highlighted">
            {{ t('footer.case') }}
          </h3>
          <ul class="mt-3 space-y-1 sm:mt-4 sm:space-y-2.5">
            <li>
              <NuxtLink
                to="/work/connectmobile"
                class="inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-highlighted sm:min-h-0"
              >
                ConnectMobile
              </NuxtLink>
            </li>
            <li>
              <a
                :href="`mailto:${AGENCY_EMAIL}`"
                class="inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-highlighted sm:min-h-0"
              >
                {{ AGENCY_EMAIL }}
              </a>
            </li>
            <li>
              <button
                class="inline-flex min-h-9 items-center text-left text-sm text-muted transition-colors hover:text-highlighted sm:min-h-0"
                @click="go('#contact')"
              >
                {{ t('nav.cta') }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-start justify-between gap-4 border-t border-default pt-6 sm:flex-row sm:items-center">
        <p class="text-xs text-muted">
          &copy; {{ currentYear }} {{ AGENCY_LEGAL_NAME }}. {{ t('footer.rights') }}
        </p>
        <div class="flex flex-wrap items-center gap-5">
          <NuxtLink
            to="/privacy"
            class="text-xs text-muted transition-colors hover:text-highlighted"
          >
            {{ t('footer.privacy') }}
          </NuxtLink>
          <NuxtLink
            to="/terms"
            class="text-xs text-muted transition-colors hover:text-highlighted"
          >
            {{ t('footer.terms') }}
          </NuxtLink>
          <span class="text-xs text-muted">
            {{ t('footer.builtWith') }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
