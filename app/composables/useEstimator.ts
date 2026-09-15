export type ProjectType = 'crm-erp' | 'mobile' | 'web-platform' | 'cloud'

export type BudgetRange = 'under-10k' | '10k-30k' | '30k-80k' | '80k-plus'

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
  labelUz: string
  description: string
  icon: string
}

export interface ValidationError {
  field: string
  message: string
}

export const estimatorProjectTypes: OptionEntry<ProjectType>[] = [
  {
    value: 'crm-erp',
    label: 'CRM / ERP System',
    labelUz: 'CRM / ERP tizimi',
    description: 'Custom workflows, RBAC, WMS/HRMS integrations',
    icon: 'i-lucide-workflow'
  },
  {
    value: 'mobile',
    label: 'Mobile Application',
    labelUz: 'Mobil ilova',
    description: 'Capacitor or native, offline sync, push notifications',
    icon: 'i-lucide-smartphone'
  },
  {
    value: 'web-platform',
    label: 'High-Load Web Platform',
    labelUz: 'Yuqori yuklamali platforma',
    description: 'Microservices, queues, real-time data at scale',
    icon: 'i-lucide-server-cog'
  },
  {
    value: 'cloud',
    label: 'Cloud & DevOps',
    labelUz: 'Cloud va DevOps',
    description: 'CI/CD, infrastructure-as-code, observability',
    icon: 'i-lucide-cloud-cog'
  }
]

export const estimatorBudgets: OptionEntry<BudgetRange>[] = [
  { value: 'under-10k', label: 'Under $10k', labelUz: '$10k gacha', description: 'Focused MVP or audit', icon: 'i-lucide-circle-dollar-sign' },
  { value: '10k-30k', label: '$10k — $30k', labelUz: '$10k — $30k', description: 'Full product release', icon: 'i-lucide-circle-dollar-sign' },
  { value: '30k-80k', label: '$30k — $80k', labelUz: '$30k — $80k', description: 'Multi-team enterprise build', icon: 'i-lucide-circle-dollar-sign' },
  { value: '80k-plus', label: '$80k+', labelUz: '$80k+', description: 'Long-term platform program', icon: 'i-lucide-circle-dollar-sign' }
]

export const estimatorTimelines: OptionEntry<TimelineOption>[] = [
  { value: 'asap', label: 'ASAP', labelUz: 'Tez orada', description: 'Kick off within 2 weeks', icon: 'i-lucide-zap' },
  { value: '1-3-months', label: '1 — 3 months', labelUz: '1 — 3 oy', description: 'Standard planning window', icon: 'i-lucide-calendar' },
  { value: '3-6-months', label: '3 — 6 months', labelUz: '3 — 6 oy', description: 'Discovery first, then build', icon: 'i-lucide-calendar-range' },
  { value: 'flexible', label: 'Flexible', labelUz: 'Moslashuvchan', description: 'Scope and schedule open', icon: 'i-lucide-calendar-sync' }
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
