<script setup lang="ts">
const { t } = useLocale()
const { categories, activeCategoryId, activeCategory, selectCategory } = useTechStack()

const sectionRef = ref<HTMLElement>()

const categoryColors: Record<string, number> = {
  'frontend': 0x818cf8,
  'backend': 0x34d399,
  'database': 0x22d3ee,
  'mobile-cloud': 0xfbbf24
}

const activeColor = computed(() => categoryColors[activeCategoryId.value] ?? 0x818cf8)

// shallowRef: a deep ref would unwrap the nested refs returned by useCardTilt.
const tilts = shallowRef<ReturnType<typeof useCardTilt>[]>([])

function refreshTilts() {
  tilts.value = activeCategory.value.items.map(() => useCardTilt(6))
}

watch(activeCategoryId, () => {
  nextTick(() => {
    refreshTilts()
  })
})

onMounted(() => {
  refreshTilts()
})
</script>

<template>
  <section
    id="stack"
    ref="sectionRef"
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
          {{ t('stack.title') }}
        </h2>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          class="mx-auto mt-4 max-w-2xl text-muted"
        >
          {{ t('stack.subtitle') }}
        </p>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 18 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 160 } }"
        class="mb-10 flex flex-wrap justify-center gap-2"
      >
        <button
          v-for="cat in categories"
          :key="cat.id"
          v-motion
          :hovered="{ scale: 1.04, transition: { type: 'spring', stiffness: 260, damping: 18 } }"
          :tapped="{ scale: 0.97 }"
          class="inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors sm:min-h-0"
          :class="activeCategoryId === cat.id
            ? 'border-indigo-500/30 bg-indigo-500/15 text-indigo-300'
            : 'border-transparent bg-accentuated text-muted hover:text-highlighted'"
          @click="selectCategory(cat.id)"
        >
          <AppIcon
            :name="cat.icon"
            class="h-3.5 w-3.5"
          />
          {{ cat.label }}
        </button>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 650, delay: 200 } }"
        class="relative overflow-hidden rounded-3xl border border-default bg-elevated/60 backdrop-blur-xl"
      >
        <TechStackOrb
          :active-id="activeCategoryId"
          :count="activeCategory.items.length"
          :color="activeColor"
          class="opacity-70"
        />
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-app/70 via-app/20 to-app/70" />

        <div class="relative p-6 sm:p-8">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(item, i) in activeCategory.items"
              :key="`${activeCategoryId}-${item.name}`"
              :ref="(el: any) => { if (tilts[i]) tilts[i]!.cardRef.value = el as HTMLElement }"
              v-motion
              :initial="{ opacity: 0, y: 16, scale: 0.96 }"
              :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: 420, delay: i * 70 } }"
              class="tech-item glass glow-hover group relative overflow-hidden rounded-xl p-4"
              :style="tilts[i]?.tiltStyle.value"
            >
              <div
                class="pointer-events-none absolute inset-0 rounded-xl"
                :style="tilts[i]?.glareStyle.value"
              />
              <div class="relative z-10 flex items-start gap-4">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accentuated transition-colors group-hover:bg-indigo-500/10">
                  <AppIcon
                    :name="item.icon"
                    class="h-5 w-5 text-muted transition-colors group-hover:text-indigo-400"
                  />
                </div>
                <div>
                  <div class="font-semibold text-highlighted">
                    {{ item.name }}
                  </div>
                  <div class="mt-0.5 text-sm text-muted">
                    {{ item.note }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
