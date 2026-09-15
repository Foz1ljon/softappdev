<script setup lang="ts">
import { AGENCY_NAME, AGENCY_EMAIL } from '~/composables/useSeo'

useSeo({
  title: `${AGENCY_NAME} — Maxfiylik siyosati`,
  description: 'SoftAppDev IT agentligining maxfiylik siyosati.',
  path: '/privacy',
  noindex: true
})
</script>

<template>
  <div class="pt-32 pb-20">
    <article class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl">
        Maxfiylik siyosati
      </h1>
      <div class="mt-8 space-y-6 text-muted leading-relaxed">
        <section>
          <h2 class="text-xl font-bold text-highlighted">
            1. Qanday ma’lumot yig‘amiz
          </h2>
          <p class="mt-2">
            Loyiha baholash formasi yoki aloqa formalaridan foydalanganingizda siz o‘z ixtiyoringiz bilan kiritgan ism, email manzil, kompaniya nomi va loyiha tafsilotlarini yig‘amiz.
          </p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-highlighted">
            2. Ma’lumotdan qanday foydalanamiz
          </h2>
          <p class="mt-2">
            Ma’lumotlaringizdan so‘rovlaringizga javob berish, loyiha smetasini tayyorlash va xizmatlarimizni yaxshilash uchun foydalanamiz. Shaxsiy ma’lumotlaringizni uchinchi tomonlarga sotmaymiz.
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
