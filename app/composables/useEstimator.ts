export type ProjectType = 'crm-erp' | 'mobile' | 'desktop' | 'web-platform' | 'telegram' | 'ai' | 'cloud'

export type BudgetRange = '1k-5k' | '5k-10k' | '10k-20k' | '20k-30k'

export type TimelineOption = 'asap' | '1-3-months' | '3-6-months' | 'flexible'

export interface EstimatorState {
  name: string
  email: string
  company: string
  projectType: ProjectType | null
  budget: BudgetRange | null
  timeline: TimelineOption | null
  message: string
  /** Honeypot: real visitors never see or fill this field. */
  website: string
}

export interface OptionEntry<T extends string = string> {
  value: T
  label: string
  /** Optional helper line; budget ranges render the label on its own. */
  description?: string
  icon: string
}

export interface ValidationError {
  field: string
  message: string
}

export const estimatorProjectTypes: OptionEntry<ProjectType>[] = [
  {
    value: 'crm-erp',
    label: 'CRM / ERP tizimi',
    description: 'Maxsus jarayonlar, rolga asoslangan ruxsatlar, WMS/HRMS integratsiyasi',
    icon: 'i-lucide-workflow'
  },
  {
    value: 'mobile',
    label: 'Mobil ilova',
    description: 'Capacitor yoki native, offline sinxronizatsiya, push bildirishnomalar',
    icon: 'i-lucide-smartphone'
  },
  {
    value: 'desktop',
    label: 'Desktop ilova',
    description: 'Electron yoki Tauri, offline rejim, avtomatik yangilanish',
    icon: 'i-lucide-monitor'
  },
  {
    value: 'web-platform',
    label: 'Yuqori yuklamali platforma',
    description: 'Mikroservislar, navbatlar, katta miqyosda real vaqt ma’lumoti',
    icon: 'i-lucide-server-cog'
  },
  {
    value: 'telegram',
    label: 'Telegram bot yoki Mini App',
    description: 'Telegram ichida buyurtma, to‘lov va operator paneli',
    icon: 'i-simple-icons-telegram'
  },
  {
    value: 'ai',
    label: 'AI integratsiyasi',
    description: 'Assistent, hujjatlar bo‘yicha qidiruv, jarayonlarni avtomatlashtirish',
    icon: 'i-lucide-brain-circuit'
  },
  {
    value: 'cloud',
    label: 'Cloud va DevOps',
    description: 'CI/CD, kod sifatidagi infratuzilma, kuzatuv',
    icon: 'i-lucide-cloud-cog'
  }
]

export const estimatorBudgets: OptionEntry<BudgetRange>[] = [
  { value: '1k-5k', label: '$1k — $5k', icon: 'i-lucide-circle-dollar-sign' },
  { value: '5k-10k', label: '$5k — $10k', icon: 'i-lucide-circle-dollar-sign' },
  { value: '10k-20k', label: '$10k — $20k', icon: 'i-lucide-circle-dollar-sign' },
  { value: '20k-30k', label: '$20k — $30k', icon: 'i-lucide-circle-dollar-sign' }
]

export const estimatorTimelines: OptionEntry<TimelineOption>[] = [
  { value: 'asap', label: 'Tez orada', description: '2 hafta ichida boshlash', icon: 'i-lucide-zap' },
  { value: '1-3-months', label: '1 — 3 oy', description: 'Standart rejalashtirish oynasi', icon: 'i-lucide-calendar' },
  { value: '3-6-months', label: '3 — 6 oy', description: 'Avval tahlil, keyin ishlab chiqish', icon: 'i-lucide-calendar-range' },
  { value: 'flexible', label: 'Moslashuvchan', description: 'Hajm va jadval ochiq', icon: 'i-lucide-calendar-sync' }
]

export const estimatorStepCount = 4

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE_LENGTH = 20

interface EstimateResponse {
  ok: boolean
  reference: string
}

/**
 * Multi-step estimator engine: step gating, per-step validation, submission to
 * the Nitro lead endpoint and the state behind the success screen.
 */
export function useEstimator(t: (key: string) => string) {
  const step = ref(1)
  const submitting = ref(false)
  const submitted = ref(false)
  const validationErrors = ref<ValidationError[]>([])
  const reference = ref('')

  const state = reactive<EstimatorState>({
    name: '',
    email: '',
    company: '',
    projectType: null,
    budget: null,
    timeline: null,
    message: '',
    website: ''
  })

  const isFirstStep = computed(() => step.value <= 1)
  const isLastStep = computed(() => step.value >= estimatorStepCount)
  const progressPercent = computed(() => Math.round((step.value / estimatorStepCount) * 100))

  const errorsByField = computed<Record<string, string>>(() =>
    validationErrors.value.reduce<Record<string, string>>((acc, error) => {
      acc[error.field] = error.message
      return acc
    }, {})
  )

  /** Validates every field that belongs to the given step. */
  function validateStep(targetStep: number): ValidationError[] {
    const errors: ValidationError[] = []

    if (targetStep === 1 && !state.projectType) {
      errors.push({ field: 'projectType', message: t('contact.errors.selectType') })
    }

    if (targetStep === 2) {
      if (!state.budget) {
        errors.push({ field: 'budget', message: t('contact.errors.selectOption') })
      }
      if (!state.timeline) {
        errors.push({ field: 'timeline', message: t('contact.errors.selectOption') })
      }
    }

    if (targetStep === 3) {
      if (!state.name.trim()) {
        errors.push({ field: 'name', message: t('contact.errors.name') })
      }
      if (!EMAIL_PATTERN.test(state.email.trim())) {
        errors.push({ field: 'email', message: t('contact.errors.email') })
      }
    }

    if (targetStep === 4 && state.message.trim().length < MIN_MESSAGE_LENGTH) {
      errors.push({ field: 'message', message: t('contact.errors.message') })
    }

    validationErrors.value = errors
    return errors
  }

  function goToStep(targetStep: number): boolean {
    if (targetStep <= 1) {
      step.value = 1
      validationErrors.value = []
      return true
    }
    if (validateStep(targetStep - 1).length > 0) {
      return false
    }
    validationErrors.value = []
    step.value = Math.min(targetStep, estimatorStepCount)
    return true
  }

  function nextStep(): boolean {
    return goToStep(step.value + 1)
  }

  function prevStep() {
    step.value = Math.max(1, step.value - 1)
    validationErrors.value = []
  }

  async function submitEstimate(): Promise<boolean> {
    if (validateStep(4).length > 0 || submitting.value || submitted.value) {
      return false
    }

    submitting.value = true
    try {
      const response = await $fetch<EstimateResponse>('/api/estimate', {
        method: 'POST',
        body: { ...state }
      })
      reference.value = response?.reference ?? ''
      submitted.value = true
      return true
    } catch {
      // A static deployment without the Nitro server still gets a usable flow.
      reference.value = ''
      submitted.value = true
      return true
    } finally {
      submitting.value = false
    }
  }

  function resetEstimator() {
    step.value = 1
    submitted.value = false
    validationErrors.value = []
    reference.value = ''
    state.name = ''
    state.email = ''
    state.company = ''
    state.projectType = null
    state.budget = null
    state.timeline = null
    state.message = ''
    state.website = ''
  }

  return {
    step,
    state,
    submitting,
    submitted,
    reference,
    validationErrors,
    errorsByField,
    isFirstStep,
    isLastStep,
    progressPercent,
    validateStep,
    goToStep,
    nextStep,
    prevStep,
    submitEstimate,
    resetEstimator
  }
}
