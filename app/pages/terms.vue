<script setup lang="ts">
import { AGENCY_NAME, AGENCY_EMAIL } from '~/composables/useSeo'

useSeo({
  title: `${AGENCY_NAME} — Terms of Service`,
  description: 'Terms of service for SoftAppDev IT agency.',
  path: '/terms',
  noindex: true
})
</script>

<template>
  <div class="pt-32 pb-20">
    <article class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl">
        Terms of Service
      </h1>
      <div class="mt-8 space-y-6 text-muted leading-relaxed">
        <section>
          <h2 class="text-xl font-bold text-highlighted">
            1. Services
          </h2>
          <p class="mt-2">
            SoftAppDev provides custom software development services including CRM/ERP systems, mobile applications, web platforms, and cloud solutions.
          </p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-highlighted">
            2. Intellectual Property
          </h2>
          <p class="mt-2">
            Unless otherwise agreed, all intellectual property developed for a client under a signed statement of work belongs to the client upon full payment.
          </p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-highlighted">
            3. Contact
          </h2>
          <p class="mt-2">
            Questions? Contact us at <a
              :href="`mailto:${AGENCY_EMAIL}`"
              class="text-indigo-400 hover:underline"
            >{{ AGENCY_EMAIL }}</a>.
          </p>
        </section>
      </div>
    </article>
  </div>
</template>
