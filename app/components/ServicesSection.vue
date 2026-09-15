<script setup lang="ts">
const { t } = useLocale()

const services: {
  icon: string
  title: string
  description: string
  bullets: string[]
  color: string
  bg: string
  border: string
}[] = [
  {
    icon: 'i-lucide-smartphone',
    title: 'Mobil ilovalar',
    description: 'iOS va Android uchun bitta Vue + Capacitor kod bazasidan chiqadigan ilovalar — offline sinxronizatsiya, push bildirishnomalar va ikkala do‘konga bitta reliz oqimi.',
    bullets: [
      'Dala jamoalari uchun offline-first ma’lumot oqimi',
      'Native kamera, geolokatsiya va xavfsiz saqlash',
      'Do‘kon ko‘rigi va reliz avtomatizatsiyasi'
    ],
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20'
  },
  {
    icon: 'i-lucide-monitor',
    title: 'Desktop ilovalar',
    description: 'Windows, macOS va Linux uchun Electron yoki Tauri asosidagi ilovalar — web interfeysingiz bilan bir xil dizayn tizimi va bir xil API shartnomalari ustida ishlaydi.',
    bullets: [
      'Offline rejim va lokal ma’lumotlar bazasi',
      'Avtomatik yangilanish va imzolangan buildlar',
      'Printer, skaner va USB qurilmalar bilan integratsiya'
    ],
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20'
  },
  {
    icon: 'i-lucide-globe',
    title: 'Web platformalar va API',
    description: 'NestJS va Fastify servislari, MongoDB ma’lumot qatlami, Redis kesh, BullMQ navbatlari va savdo yoki logistika mavsumidagi yuklamaga chidamli integratsiyalar.',
    bullets: [
      'Bitta gateway ortida domen bo‘yicha bo‘lingan servislar',
      'Idempotent to‘lovlar va webhook solishtiruvi',
      'Birinchi kundan yuklama testi va kuzatuv'
    ],
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20'
  },
  {
    icon: 'i-simple-icons-telegram',
    title: 'Telegram botlar va Mini App',
    description: 'Telegram ichida to‘liq ishlaydigan mahsulotlar: buyurtma qabul qilish, to‘lov, yetkazish kuzatuvi va operator paneli — alohida ilova yuklamasdan.',
    bullets: [
      'Mini App va bot bitta backend ustida',
      'Click/Payme to‘lovlari va tasdiqlash oqimi',
      'CRM va omborga real vaqtda ulanish'
    ],
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20'
  },
  {
    icon: 'i-lucide-brain-circuit',
    title: 'AI integratsiyalari',
    description: 'Mahsulotingizga sun’iy intellektni ulash: hujjatlar bo‘yicha savol-javob, qo‘llab-quvvatlash assistenti, matn va rasm tahlili hamda jarayonlarni avtomatlashtirish.',
    bullets: [
      'O‘z ma’lumotlaringiz ustida RAG qidiruv',
      'Operator o‘rniga emas, yonida ishlaydigan assistent',
      'Xarajat, kechikish va sifat bo‘yicha nazorat'
    ],
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-500/20'
  },
  {
    icon: 'i-lucide-workflow',
    title: 'CRM va ERP tizimlari',
    description: 'Maxsus jarayonlar, rolga asoslangan ruxsatlar, WMS/HRMS integratsiyasi va biznesingiz haqiqatda qanday ishlashiga mos real vaqt panellari.',
    bullets: [
      'Har qanday ekrandan oldin domen modeli',
      'Nozik rollar, huquqlar va audit jurnali',
      'Jadval va eski tizimlardan ko‘chirish'
    ],
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20'
  },
  {
    icon: 'i-lucide-cloud-cog',
    title: 'Cloud va DevOps',
    description: 'Serverni sozlashdan tortib uzilishsiz relizgacha: CI/CD quvurlari, konteynerlar, monitoring va ogohlantirish tizimi — mahsulotingiz ishlashda davom etadi.',
    bullets: [
      'Docker, Nginx, GitHub Actions va kod sifatidagi infratuzilma',
      'Zaxira nusxa, tiklash rejasi va uzilishsiz migratsiya',
      'Metrikalar, loglar va navbatchilik ogohlantirishlari'
    ],
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20'
  },
  {
    icon: 'i-lucide-palette',
    title: 'UI/UX tizimlari',
    description: 'Dizayn tokenlari, Tailwind va Ant Design ustidagi komponent qatlami hamda Figma’dan kodga oqim — mahsulotning to‘rtinchi ekrani birinchisi kabi tez quriladi.',
    bullets: [
      'Web, mobil va desktop uchun yagona token qatlami',
      'Qulay, klaviatura bilan boshqariladigan komponentlar',
      'Sprint ichida dizayn ko‘rikdan o‘tkazish'
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
          :key="service.title"
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
              {{ service.title }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-muted">
              {{ service.description }}
            </p>

            <ul class="mt-5 space-y-2">
              <li
                v-for="bullet in service.bullets"
                :key="bullet"
                class="flex gap-2.5 text-sm text-muted"
              >
                <AppIcon
                  name="i-lucide-check"
                  class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                />
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
