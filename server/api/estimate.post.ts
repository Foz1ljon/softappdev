interface EstimatePayload {
  name?: string
  email?: string
  company?: string
  projectType?: string | null
  budget?: string | null
  timeline?: string | null
  message?: string
  /** Hidden field that only a naive bot fills in. */
  website?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PROJECT_TYPES = ['crm-erp', 'mobile', 'desktop', 'web-platform', 'telegram', 'ai', 'cloud']
const BUDGETS = ['1k-5k', '5k-10k', '10k-20k', '20k-30k']
const TIMELINES = ['asap', '1-3-months', '3-6-months', 'flexible']
const MIN_MESSAGE_LENGTH = 20
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

const hits = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 500) {
    hits.clear()
  }
  return recent.length > RATE_LIMIT_MAX
}

function reference() {
  const stamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `SAD-${stamp}-${random}`
}

/**
 * Lead intake for the project estimator. Validates the payload, keeps a copy on
 * the server so a lead is never lost when an email provider is not configured,
 * and returns a reference the visitor can quote.
 */
export default defineEventHandler(async (event) => {
  const ip = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'So‘rovlar juda ko‘p' })
  }

  const body = await readBody<EstimatePayload>(event)

  if (body?.website) {
    // Silently accept and drop obvious bot submissions.
    return { ok: true, reference: reference() }
  }

  const name = body?.name?.trim() ?? ''
  const email = body?.email?.trim() ?? ''
  const message = body?.message?.trim() ?? ''
  const company = body?.company?.trim() ?? ''

  if (name.length < 2) {
    throw createError({ statusCode: 400, statusMessage: 'Ism kiritilishi shart' })
  }
  if (!EMAIL_PATTERN.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'To‘g‘ri email kiriting' })
  }
  if (message.length < MIN_MESSAGE_LENGTH) {
    throw createError({ statusCode: 400, statusMessage: `Loyihani kamida ${MIN_MESSAGE_LENGTH} ta belgida tasvirlab bering` })
  }
  if (body.projectType && !PROJECT_TYPES.includes(body.projectType)) {
    throw createError({ statusCode: 400, statusMessage: 'Noma’lum loyiha turi' })
  }
  if (body.budget && !BUDGETS.includes(body.budget)) {
    throw createError({ statusCode: 400, statusMessage: 'Noma’lum byudjet oralig‘i' })
  }
  if (body.timeline && !TIMELINES.includes(body.timeline)) {
    throw createError({ statusCode: 400, statusMessage: 'Noma’lum muddat' })
  }

  const lead = {
    name,
    email,
    company,
    projectType: body.projectType ?? null,
    budget: body.budget ?? null,
    timeline: body.timeline ?? null,
    message,
    ip,
    userAgent: getRequestHeader(event, 'user-agent') ?? '',
    receivedAt: new Date().toISOString()
  }

  const id = reference()

  // Persist every lead; failures must never block the visitor's submission.
  try {
    await useStorage('data').setItem(`leads/${id}.json`, lead)
  } catch (error) {
    console.error('[estimate] failed to persist lead', id, error)
  }

  console.info('[estimate] new lead', id, { email, projectType: lead.projectType, budget: lead.budget, timeline: lead.timeline })

  return { ok: true, reference: id }
})
