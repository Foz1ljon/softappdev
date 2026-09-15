<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { LocalizedText } from '~/composables/useLocale'
import { AGENCY_EMAIL } from '~/composables/useSeo'

gsap.registerPlugin(ScrollTrigger)

const { t, lt } = useLocale()

const facts: { value: string, label: LocalizedText }[] = [
  { value: '2021', label: { en: 'Founded in Tashkent', uz: 'Toshkentda tashkil etilgan' } },
  { value: '4', label: { en: 'Engineering disciplines', uz: 'Muhandislik yo‘nalishi' } },
  { value: 'UZ · RU · EN', label: { en: 'Working languages', uz: 'Ish tillari' } }
]

const engagementModels: { icon: string, title: LocalizedText, body: LocalizedText, bestFor: LocalizedText, accent: string }[] = [
  {
    icon: 'i-lucide-target',
    title: { en: 'Fixed-scope delivery', uz: 'Belgilangan hajmdagi yetkazish' },
    body: {
      en: 'We run discovery, freeze the scope with you, then deliver against a milestone plan with a fixed budget. Every milestone ships something you can click.',
      uz: 'Tahlilni o‘tkazamiz, hajmni siz bilan qatiylashtiramiz, so‘ng belgilangan budjet bilan bosqichlar rejasi bo‘yicha yetkazamiz. Har bir bosqich bosiladigan natija beradi.'
    },
    bestFor: { en: 'Best for a defined product with a deadline', uz: 'Muddati aniq bo‘lgan mahsulot uchun' },
    accent: 'text-indigo-400'
  },
  {
    icon: 'i-lucide-users',
    title: { en: 'Dedicated engineering team', uz: 'Ajratilgan muhandislik jamoasi' },
    body: {
      en: 'A stable team of backend, mobile and frontend engineers plus QA works inside your product on a monthly basis, with your product owner setting priorities.',
      uz: 'Backend, mobil va frontend muhandislari hamda QA’dan iborat barqaror jamoa oylik asosda mahsulotingiz ichida ishlaydi, ustuvorlikni sizning product owner belgilaydi.'
    },
    bestFor: { en: 'Best for long-running platforms', uz: 'Uzoq muddatli platformalar uchun' },
    accent: 'text-cyan-400'
  },
  {
    icon: 'i-lucide-search',
    title: { en: 'Audit & architecture review', uz: 'Audit va arxitektura tekshiruvi' },
    body: {
      en: 'We take an existing system apart: data model, performance bottlenecks, delivery pipeline and payment or carrier integrations, then hand you a prioritised plan.',
      uz: 'Mavjud tizimni tahlil qilamiz: ma’lumot modeli, unumdorlik muammolari, yetkazish zanjiri hamda to‘lov va kuryer integratsiyalari — so‘ng ustuvorliklangan reja taqdim etamiz.'
    },
    bestFor: { en: 'Best for rescuing or scaling a codebase', uz: 'Kod bazasini saqlab qolish yoki kengaytirish uchun' },
    accent: 'text-emerald-400'
  }
]

const principles: LocalizedText[] = [
  {
    en: 'Senior engineers stay on the critical path — architecture is not handed off after kickoff.',
    uz: 'Katta muhandislar asosiy yo‘lda qoladi — arxitektura loyiha boshidan keyin boshqalarga topshirilmaydi.'
  },
  {
    en: 'You own the code, the repository and the infrastructure. No vendor lock-in, ever.',
    uz: 'Kod, repozitoriy va infratuzilma sizga tegishli. Hech qachon vendor lock-in yo‘q.'
  },
  {
    en: 'Small releases and weekly demos: progress you can see, not a status report you have to trust.',
    uz: 'Kichik relizlar va haftalik demolar: ishonish kerak bo‘lgan hisobot emas, ko‘rib bo‘ladigan taraqqiyot.'
  },
  {
    en: 'We stay after launch with monitoring, incident response and agreed SLAs.',
    uz: 'Ishga tushgandan keyin ham kuzatuv, hodisalarga javob va kelishilgan SLA bilan yoningizda qolamiz.'
  }
]

const factsRef = ref<HTMLElement>()

onMounted(() => {
  const items = factsRef.value?.querySelectorAll('[data-fact]')
  if (items?.length) {
    gsap.from(items, {
      scrollTrigger: { trigger: factsRef.value, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0,
      y: 18,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    })
  }
})
</script>

<template>
  <section
    id="about"
    class="relative py-24 sm:py-32"
  >
    <div class="orb absolute -left-20 top-1/4 h-[420px] w-[420px] bg-indigo-600/10" />

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <span
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
            class="mb-3 inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400"
          >
            {{ lt({ en: 'The company', uz: 'Kompaniya' }) }}
          </span>
          <h2
            v-motion
            :initial="{ opacity: 0, y: 22 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 80 } }"
            class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
          >
            {{ lt({ en: 'The team behind the systems', uz: 'Tizimlar ortidagi jamoa' }) }}
          </h2>
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 160 } }"
            class="mt-5 space-y-4 leading-relaxed text-muted"
          >
            <p>
              {{ lt({
                en: 'SoftappDev is a product engineering studio based in Tashkent, working with businesses that run on software rather than on slide decks. Since 2021 we have designed and operated systems where an order, a payment or a delivery has to be correct every single time.',
                uz: 'SoftappDev — Toshkentda joylashgan mahsulot muhandisligi studiyasi. Biz taqdimotlar emas, dasturiy ta’minot asosida ishlaydigan bizneslar bilan ishlaymiz. 2021-yildan buyon buyurtma, to‘lov yoki yetkazish har safar to‘g‘ri bo‘lishi shart bo‘lgan tizimlarni loyihalashtiramiz va boshqaramiz.'
              }) }}
            </p>
            <p>
              {{ lt({
                en: 'We are the team that built ConnectMobile — the customer app, the courier terminal, the operations dashboard and the backend platform behind it. That kind of end-to-end ownership is what we sell: one team accountable from the first schema to production traffic.',
                uz: 'Biz ConnectMobile’ni qurgan jamoamiz — mijoz ilovasi, kuryer terminali, boshqaruv paneli va ularning ortidagi backend platforma. Biz aynan shunday uchdan-oxirigacha mas’uliyatni taklif qilamiz: birinchi sxemadan ishlab chiqarish trafigigacha bitta jamoa javobgar.'
              }) }}
            </p>
          </div>

          <div
            ref="factsRef"
            class="mt-8 grid gap-4 sm:grid-cols-3"
          >
            <div
              v-for="fact in facts"
              :key="fact.label.en"
              data-fact
              class="glass rounded-2xl p-4"
            >
              <div class="text-xl font-extrabold text-highlighted">
                {{ fact.value }}
              </div>
              <div class="mt-1 text-xs text-muted">
                {{ lt(fact.label) }}
              </div>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/work/connectmobile"
              class="shimmer inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500"
            >
              <AppIcon
                name="i-lucide-book-open"
                class="h-4 w-4"
              />
              {{ t('portfolio.architecture') }}
            </NuxtLink>
            <a
              :href="`mailto:${AGENCY_EMAIL}`"
              class="inline-flex items-center gap-2 rounded-full border border-default px-5 py-2.5 text-sm font-semibold text-highlighted transition-all hover:bg-accentuated"
            >
              <AppIcon
                name="i-lucide-send"
                class="h-4 w-4"
              />
              {{ AGENCY_EMAIL }}
            </a>
          </div>
        </div>

        <div class="space-y-4">
          <article
            v-for="(model, i) in engagementModels"
            :key="model.title.en"
            v-motion
            :initial="{ opacity: 0, x: 28 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 550, delay: i * 110 } }"
            class="glow-hover glass rounded-2xl p-6"
          >
            <div class="flex items-center gap-3">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-accentuated">
                <AppIcon
                  :name="model.icon"
                  class="h-5 w-5"
                  :class="model.accent"
                />
              </div>
              <h3 class="font-bold text-highlighted">
                {{ lt(model.title) }}
              </h3>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-muted">
              {{ lt(model.body) }}
            </p>
            <p
              class="mt-3 text-xs font-medium"
              :class="model.accent"
            >
              {{ lt(model.bestFor) }}
            </p>
          </article>

          <ul class="glass rounded-2xl p-6">
            <li
              v-for="(principle, i) in principles"
              :key="principle.en"
              v-motion
              :initial="{ opacity: 0, y: 14 }"
              :visible-once="{ opacity: 1, y: 0, transition: { duration: 450, delay: 120 + i * 80 } }"
              class="flex gap-3 py-2 text-sm leading-relaxed text-muted"
            >
              <AppIcon
                name="i-lucide-check-circle-2"
                class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
              />
              <span>{{ lt(principle) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
