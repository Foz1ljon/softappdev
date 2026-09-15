<script setup lang="ts">
import { AGENCY_NAME, AGENCY_EMAIL } from '~/composables/useSeo'

useSeo({
  title: `${AGENCY_NAME} — Privacy Policy`,
  description: 'Privacy policy for SoftAppDev IT agency.',
  path: '/privacy',
  noindex: true
})
</script>

<template>
  <div class="pt-32 pb-20">
    <article class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl">
        Privacy Policy
      </h1>
      <div class="mt-8 space-y-6 text-muted leading-relaxed">
        <section>
          <h2 class="text-xl font-bold text-highlighted">
            1. Information We Collect
          </h2>
          <p class="mt-2">
            When you use our project estimator or contact forms, we collect your name, email address, company name, and project details you voluntarily provide.
          </p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-highlighted">
            2. How We Use Your Information
          </h2>
          <p class="mt-2">
            We use your information to respond to inquiries, provide project estimates, and improve our services. We do not sell your personal information to third parties.
          </p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-highlighted">
            3. Contact Us
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
