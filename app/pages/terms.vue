<script setup lang="ts">
import { AGENCY_NAME, AGENCY_EMAIL } from '~/composables/useSeo'

useSeo({
  title: `${AGENCY_NAME} — Xizmat shartlari`,
  description: 'SoftAppDev IT agentligining xizmat ko‘rsatish shartlari.',
  path: '/terms',
  noindex: true
})
</script>

<template>
  <div class="pt-32 pb-20">
    <article class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl">
        Xizmat shartlari
      </h1>
      <div class="mt-8 space-y-6 text-muted leading-relaxed">
        <section>
          <h2 class="text-xl font-bold text-highlighted">
            1. Xizmatlar
          </h2>
          <p class="mt-2">
            SoftAppDev buyurtmaga asosan dasturiy ta’minot ishlab chiqadi: CRM/ERP tizimlari, mobil va desktop ilovalar, web platformalar, Telegram ilovalari, AI integratsiyalari hamda bulut yechimlari.
          </p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-highlighted">
            2. Intellektual mulk
          </h2>
          <p class="mt-2">
            Agar boshqacha kelishilmagan bo‘lsa, imzolangan shartnoma doirasida mijoz uchun yaratilgan barcha intellektual mulk to‘liq to‘lov amalga oshirilgach mijozga o‘tadi.
          </p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-highlighted">
            3. Bog‘lanish
          </h2>
          <p class="mt-2">
            Savollaringiz bormi? <a
              :href="`mailto:${AGENCY_EMAIL}`"
              class="text-indigo-400 hover:underline"
            >{{ AGENCY_EMAIL }}</a> manziliga yozing.
          </p>
        </section>
      </div>
    </article>
  </div>
</template>
