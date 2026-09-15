<script setup lang="ts">
const { t } = useLocale()

const steps: {
  step: string
  title: string
  description: string
  deliverables: string
  icon: string
  color: string
  bg: string
}[] = [
  {
    step: '01',
    title: 'Tahlil va audit',
    description: 'Biznes bugun qanday ishlayotganini xaritalaymiz: odamlar, hujjatlar, jadvallar va vaqtinchalik yechimlar. Muammolar talabga, talablar texnik rejaga aylanadi.',
    deliverables: 'Hajm, ma’lumot modeli, bosqichlar rejasi',
    icon: 'i-lucide-search',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10'
  },
  {
    step: '02',
    title: 'Arxitektura va dizayn',
    description: 'Servis chegaralari, ma’lumotlar bazasi sxemasi, API shartnomalari, integratsiya imkoniyatlari va UI oqimlari — bitta ham ishlab chiqarish kodi yozilishidan oldin siz bilan ko‘rib chiqiladi.',
    deliverables: 'Arxitektura hujjati, API shartnoma, prototiplar',
    icon: 'i-lucide-layout-template',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10'
  },
  {
    step: '03',
    title: 'Bosqichma-bosqich qurish',
    description: 'Har biri oxirida demo bilan ikki haftalik sprintlar. Xususiyatlar flag ortida chiqadi, avtomatik testlar pul bilan bog‘liq yo‘llarni qo‘riqlaydi, CI/CD har bir relizni nazorat qiladi.',
    deliverables: 'Haftalik demolar, staging muhiti, test qamrovi',
    icon: 'i-lucide-hammer',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10'
  },
  {
    step: '04',
    title: 'Ishga tushirish va kengaytirish',
    description: 'Uzilishsiz joylashtirish, real trafik bo‘yicha yuklama testi, kuzatuv va ogohlantirish, so‘ng kelishilgan javob vaqtlari bilan qo‘llab-quvvatlash davri.',
    deliverables: 'Runbook, kuzatuv panellari, SLA qo‘llab-quvvatlash',
    icon: 'i-lucide-rocket',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10'
  }
]

const tilts = steps.map(() => useCardTilt(10))
</script>

<template>
  <section
    id="process"
    class="relative overflow-x-clip py-24 sm:py-32"
  >
    <div class="orb absolute top-0 right-1/4 h-[400px] w-[400px] bg-indigo-600/10" />

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl"
        >
          {{ t('process.title') }}
        </h2>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          class="mx-auto mt-4 max-w-2xl text-muted"
        >
          {{ t('process.subtitle') }}
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(item, i) in steps"
          :key="item.step"
          :ref="(el: any) => { tilts[i]!.cardRef.value = el as HTMLElement }"
          v-motion
          :initial="{ opacity: 0, y: 44 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: i * 110 } }"
          class="process-card glow-hover glass group relative overflow-hidden rounded-2xl p-6"
          :style="tilts[i]!.tiltStyle.value"
        >
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl"
            :style="tilts[i]!.glareStyle.value"
          />
          <div class="relative z-10">
            <div class="mb-4 text-4xl font-extrabold text-muted/15">
              {{ item.step }}
            </div>
            <div
              class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-transparent transition-transform duration-300 group-hover:scale-110"
              :class="item.bg"
            >
              <AppIcon
                :name="item.icon"
                class="h-6 w-6"
                :class="item.color"
              />
            </div>
            <h3 class="text-lg font-bold text-highlighted">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ item.description }}
            </p>
            <p class="mt-4 border-t border-default pt-3 text-xs font-medium text-muted">
              {{ item.deliverables }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
