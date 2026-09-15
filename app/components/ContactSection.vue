<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  estimatorBudgets,
  estimatorProjectTypes,
  estimatorStepCount,
  estimatorTimelines,
  useEstimator,
  type OptionEntry
} from '~/composables/useEstimator'
import { AGENCY_EMAIL, AGENCY_TELEGRAM } from '~/composables/useSeo'

gsap.registerPlugin(ScrollTrigger)

const { t } = useLocale()

const {
  step,
  state,
  submitting,
  submitted,
  reference,
  errorsByField,
  isFirstStep,
  progressPercent,
  validateStep,
  nextStep,
  prevStep,
  submitEstimate,
  resetEstimator
} = useEstimator(t)

const sectionRef = ref<HTMLElement>()

async function handleNext() {
  nextStep()
}

/**
 * Folds every estimator answer into one plain-text brief. Telegram renders the
 * draft as-is, so the layout has to read well without any markup.
 */
const telegramDraft = computed(() => {
  const pick = <T extends OptionEntry>(list: T[], value: string | null) =>
    list.find(item => item.value === value)?.label ?? '—'

  const lines = [
    'Yangi loyiha so‘rovi — SoftAppDev',
    '',
    `Loyiha turi: ${pick(estimatorProjectTypes, state.projectType)}`,
    `Byudjet: ${pick(estimatorBudgets, state.budget)}`,
    `Muddat: ${pick(estimatorTimelines, state.timeline)}`,
    '',
    `Ism: ${state.name.trim() || '—'}`,
    `Email: ${state.email.trim() || '—'}`
  ]

  if (state.company.trim()) {
    lines.push(`Kompaniya: ${state.company.trim()}`)
  }

  if (state.message.trim()) {
    lines.push('', 'Tafsilotlar:', state.message.trim())
  }

  return lines.join('\n')
})

/** Telegram opens this link with the brief already sitting in the message box. */
const telegramUrl = computed(() =>
  `https://t.me/${AGENCY_TELEGRAM}?text=${encodeURIComponent(telegramDraft.value)}`
)

function openTelegramDraft() {
  window.open(telegramUrl.value, '_blank', 'noopener')
}

async function handleSubmit() {
  if (validateStep(estimatorStepCount).length > 0) {
    return
  }
  // Opened straight from the click so the browser still counts it as a user
  // gesture — awaiting the API call first would get the tab blocked.
  openTelegramDraft()
  await submitEstimate()
}

watch(step, () => {
  nextTick(() => {
    gsap.fromTo(sectionRef.value!.querySelector('[data-step-panel]'), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' })
  })
})

onMounted(() => {
  gsap.fromTo(sectionRef.value!.querySelectorAll('.contact-reveal'), { opacity: 0, y: 40 }, {
    scrollTrigger: { trigger: sectionRef.value, start: 'top 78%', toggleActions: 'play none none none' },
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out'
  })
})
</script>

<template>
  <section
    id="contact"
    ref="sectionRef"
    class="relative overflow-x-clip py-24 sm:py-32"
  >
    <div class="orb absolute bottom-0 left-1/3 h-[400px] w-[400px] bg-emerald-600/10" />

    <div class="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <div class="contact-reveal mb-12 text-center">
        <h2 class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl">
          {{ t('contact.title') }}
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-muted">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <div class="contact-reveal glass rounded-3xl p-6 sm:p-10">
        <!-- Success -->
        <div
          v-if="submitted"
          class="py-12 text-center"
        >
          <div
            v-motion
            :initial="{ opacity: 0, scale: 0.7 }"
            :enter="{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 16 } }"
            class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15"
          >
            <AppIcon
              name="i-lucide-check-circle"
              class="h-10 w-10 text-emerald-400"
            />
          </div>
          <h3 class="text-2xl font-bold text-highlighted">
            {{ t('contact.success.title') }}
          </h3>
          <p class="mt-3 text-muted">
            {{ t('contact.success.description') }}
          </p>
          <p
            v-if="reference"
            class="mt-4 inline-block rounded-full bg-accentuated px-4 py-1.5 text-xs font-medium text-muted"
          >
            {{ t('contact.reference') }}: <span class="font-bold text-highlighted">{{ reference }}</span>
          </p>
          <p class="mt-3 text-sm text-muted">
            <a
              :href="`mailto:${AGENCY_EMAIL}`"
              class="text-indigo-400 hover:underline"
            >{{ AGENCY_EMAIL }}</a>
          </p>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              :href="telegramUrl"
              target="_blank"
              rel="noopener"
              class="shimmer inline-flex min-h-10 items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-500"
            >
              <AppIcon
                name="i-simple-icons-telegram"
                class="h-4 w-4"
              />
              {{ t('contact.telegram.open') }}
            </a>
            <button
              v-motion
              :hovered="{ scale: 1.04 }"
              :tapped="{ scale: 0.97 }"
              class="inline-flex min-h-10 items-center rounded-full border border-default px-5 py-2 text-sm font-medium text-highlighted transition-colors hover:bg-accentuated"
              @click="resetEstimator"
            >
              {{ t('contact.submitAnother') }}
            </button>
          </div>
        </div>

        <!-- Estimator -->
        <div v-else>
          <div class="mb-8">
            <div class="mb-2 flex items-center justify-between text-xs font-medium text-muted">
              <span>{{ t('contact.step') }} {{ step }} {{ t('contact.of') }} {{ estimatorStepCount }}</span>
              <span>{{ progressPercent }}%</span>
            </div>
            <div class="h-1.5 w-full overflow-hidden rounded-full bg-accentuated/50">
              <div
                class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-500 ease-out"
                :style="{ width: `${progressPercent}%` }"
              />
            </div>
          </div>

          <!-- Honeypot -->
          <input
            v-model="state.website"
            type="text"
            name="website"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
            class="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
          >

          <div data-step-panel>
            <!-- Step 1 -->
            <div v-if="step === 1">
              <h3 class="mb-6 text-lg font-bold text-highlighted">
                {{ t('contact.step1.title') }}
              </h3>
              <div class="grid gap-3 sm:grid-cols-2">
                <button
                  v-for="item in estimatorProjectTypes"
                  :key="item.value"
                  v-motion
                  :hovered="{ scale: 1.02 }"
                  :tapped="{ scale: 0.98 }"
                  class="glow-hover glass flex items-start gap-3 rounded-xl p-4 text-left transition-colors"
                  :class="state.projectType === item.value ? 'border-indigo-500/50 bg-indigo-500/10' : ''"
                  @click="state.projectType = item.value"
                >
                  <AppIcon
                    :name="item.icon"
                    class="mt-0.5 h-5 w-5 shrink-0"
                    :class="state.projectType === item.value ? 'text-indigo-400' : 'text-muted'"
                  />
                  <div>
                    <div class="font-semibold text-highlighted">
                      {{ item.label }}
                    </div>
                    <div class="mt-0.5 text-xs text-muted">
                      {{ item.description }}
                    </div>
                  </div>
                </button>
              </div>
              <p
                v-if="errorsByField.projectType"
                class="mt-2 text-xs text-red-400"
              >
                {{ errorsByField.projectType }}
              </p>
            </div>

            <!-- Step 2 -->
            <div v-if="step === 2">
              <h3 class="mb-4 text-lg font-bold text-highlighted">
                {{ t('contact.step2.budget') }}
              </h3>
              <div class="mb-8 grid gap-3 sm:grid-cols-2">
                <button
                  v-for="item in estimatorBudgets"
                  :key="item.value"
                  v-motion
                  :hovered="{ scale: 1.02 }"
                  :tapped="{ scale: 0.98 }"
                  class="glow-hover glass flex items-center gap-3 rounded-xl p-3 text-left transition-colors"
                  :class="state.budget === item.value ? 'border-indigo-500/50 bg-indigo-500/10' : ''"
                  @click="state.budget = item.value"
                >
                  <AppIcon
                    :name="item.icon"
                    class="h-4 w-4 shrink-0"
                    :class="state.budget === item.value ? 'text-indigo-400' : 'text-muted'"
                  />
                  <div class="text-sm font-semibold text-highlighted">
                    {{ item.label }}
                  </div>
                </button>
              </div>
              <p
                v-if="errorsByField.budget"
                class="mb-4 text-xs text-red-400"
              >
                {{ errorsByField.budget }}
              </p>

              <h3 class="mb-4 text-lg font-bold text-highlighted">
                {{ t('contact.step2.timeline') }}
              </h3>
              <div class="grid gap-3 sm:grid-cols-2">
                <button
                  v-for="item in estimatorTimelines"
                  :key="item.value"
                  v-motion
                  :hovered="{ scale: 1.02 }"
                  :tapped="{ scale: 0.98 }"
                  class="glow-hover glass flex items-center gap-3 rounded-xl p-3 text-left transition-colors"
                  :class="state.timeline === item.value ? 'border-indigo-500/50 bg-indigo-500/10' : ''"
                  @click="state.timeline = item.value"
                >
                  <AppIcon
                    :name="item.icon"
                    class="h-4 w-4 shrink-0"
                    :class="state.timeline === item.value ? 'text-indigo-400' : 'text-muted'"
                  />
                  <div>
                    <div class="text-sm font-semibold text-highlighted">
                      {{ item.label }}
                    </div>
                    <div class="text-xs text-muted">
                      {{ item.description }}
                    </div>
                  </div>
                </button>
              </div>
              <p
                v-if="errorsByField.timeline"
                class="mt-2 text-xs text-red-400"
              >
                {{ errorsByField.timeline }}
              </p>
            </div>

            <!-- Step 3 -->
            <div
              v-if="step === 3"
              class="space-y-5"
            >
              <div>
                <label
                  for="lead-name"
                  class="mb-1.5 block text-sm font-medium text-highlighted"
                >{{ t('contact.form.name') }}</label>
                <input
                  id="lead-name"
                  v-model="state.name"
                  type="text"
                  :placeholder="t('contact.form.namePlaceholder')"
                  class="w-full rounded-xl border border-default bg-elevated px-4 py-2.5 text-sm text-highlighted placeholder:text-muted/60 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                <p
                  v-if="errorsByField.name"
                  class="mt-1 text-xs text-red-400"
                >
                  {{ errorsByField.name }}
                </p>
              </div>

              <div>
                <label
                  for="lead-email"
                  class="mb-1.5 block text-sm font-medium text-highlighted"
                >{{ t('contact.form.email') }}</label>
                <input
                  id="lead-email"
                  v-model="state.email"
                  type="email"
                  :placeholder="t('contact.form.emailPlaceholder')"
                  class="w-full rounded-xl border border-default bg-elevated px-4 py-2.5 text-sm text-highlighted placeholder:text-muted/60 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                <p
                  v-if="errorsByField.email"
                  class="mt-1 text-xs text-red-400"
                >
                  {{ errorsByField.email }}
                </p>
              </div>

              <div>
                <label
                  for="lead-company"
                  class="mb-1.5 block text-sm font-medium text-highlighted"
                >{{ t('contact.form.company') }}</label>
                <input
                  id="lead-company"
                  v-model="state.company"
                  type="text"
                  :placeholder="t('contact.form.companyPlaceholder')"
                  class="w-full rounded-xl border border-default bg-elevated px-4 py-2.5 text-sm text-highlighted placeholder:text-muted/60 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
              </div>
            </div>

            <!-- Step 4 -->
            <div
              v-if="step === 4"
              class="space-y-5"
            >
              <div>
                <label
                  for="lead-message"
                  class="mb-1.5 block text-sm font-medium text-highlighted"
                >{{ t('contact.form.message') }}</label>
                <textarea
                  id="lead-message"
                  v-model="state.message"
                  rows="5"
                  :placeholder="t('contact.form.messagePlaceholder')"
                  class="w-full rounded-xl border border-default bg-elevated px-4 py-2.5 text-sm text-highlighted placeholder:text-muted/60 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <p
                  v-if="errorsByField.message"
                  class="mt-1 text-xs text-red-400"
                >
                  {{ errorsByField.message }}
                </p>
              </div>

              <div class="rounded-2xl border border-default bg-accentuated/40 p-4">
                <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  <AppIcon
                    name="i-simple-icons-telegram"
                    class="h-3.5 w-3.5"
                  />
                  {{ t('contact.telegram.preview') }}
                </div>
                <pre class="mt-3 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-highlighted">{{ telegramDraft }}</pre>
                <p class="mt-3 text-xs text-muted">
                  {{ t('contact.telegram.hint') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="mt-8 flex items-center justify-between gap-3">
            <button
              v-if="!isFirstStep"
              v-motion
              :hovered="{ scale: 1.03 }"
              :tapped="{ scale: 0.97 }"
              class="inline-flex items-center gap-2 rounded-full border border-default px-4 py-2 text-sm font-medium text-highlighted transition-colors hover:bg-accentuated"
              @click="prevStep"
            >
              <AppIcon
                name="i-lucide-arrow-left"
                class="h-4 w-4"
              />
              {{ t('contact.back') }}
            </button>
            <div v-else />

            <button
              v-if="step < estimatorStepCount"
              v-motion
              :hovered="{ scale: 1.03 }"
              :tapped="{ scale: 0.97 }"
              class="shimmer inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-500"
              @click="handleNext"
            >
              {{ t('contact.next') }}
              <AppIcon
                name="i-lucide-arrow-right"
                class="h-4 w-4"
              />
            </button>
            <button
              v-else
              v-motion
              :hovered="{ scale: 1.03 }"
              :tapped="{ scale: 0.97 }"
              class="shimmer inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-500 disabled:opacity-50"
              :disabled="submitting"
              @click="handleSubmit"
            >
              <AppIcon
                :name="submitting ? 'i-lucide-loader-2' : 'i-simple-icons-telegram'"
                class="h-4 w-4"
                :class="submitting ? 'animate-spin' : ''"
              />
              {{ submitting ? '...' : t('contact.submit') }}
            </button>
          </div>

          <p class="mt-5 text-center text-xs text-muted">
            {{ t('contact.emailHint') }}
            <a
              :href="`mailto:${AGENCY_EMAIL}`"
              class="text-indigo-400 hover:underline"
            >{{ AGENCY_EMAIL }}</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
