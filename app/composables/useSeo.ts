export interface SeoInput {
  title: string
  description: string
  path?: string
  ogImage?: string
  type?: 'website' | 'article' | 'profile'
  noindex?: boolean
  keywords?: string[]
}

export interface JsonLdNode {
  '@context'?: string
  '@type': string
  [key: string]: unknown
}

export const AGENCY_NAME = 'SoftAppDev'
export const AGENCY_LEGAL_NAME = 'SoftAppDev LLC'
export const AGENCY_URL = 'https://softappdev.uz'
export const AGENCY_LOGO = 'https://softappdev.uz/favicon.svg'
export const AGENCY_EMAIL = 'hello@softappdev.uz'
export const AGENCY_TELEGRAM = 'coderf'
export const CONNECTMOBILE_URL = 'https://connectmobile.uz'

const DEFAULT_KEYWORDS = [
  'SoftAppDev',
  'IT agentlik O‘zbekiston',
  'dasturiy ta’minot ishlab chiqish',
  'CRM tizimi',
  'ERP tizimi',
  'mobil ilova ishlab chiqish',
  'desktop ilova ishlab chiqish',
  'web platforma',
  'Telegram bot va Mini App',
  'AI integratsiya',
  'DevOps xizmatlari',
  'Capacitor',
  'NestJS',
  'MongoDB',
  'ConnectMobile'
]

function buildOrganizationSchema(): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': `${AGENCY_URL}/#organization`,
    'name': AGENCY_NAME,
    'legalName': AGENCY_LEGAL_NAME,
    'url': AGENCY_URL,
    'logo': AGENCY_LOGO,
    'email': AGENCY_EMAIL,
    'description': 'Mobil, desktop va web ilovalar, Telegram ilovalari, CRM/ERP tizimlari, AI integratsiyalari hamda DevOps xizmatlariga ixtisoslashgan IT agentlik.',
    'foundingDate': '2026-04',
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'UZ',
      'addressLocality': 'Tashkent'
    },
    'sameAs': [
      'https://github.com/softappdev',
      'https://www.linkedin.com/company/softappdev',
      'https://t.me/softappdev'
    ],
    'makesOffer': [
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Korporativ CRM va ERP tizimlari' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Mobil ilovalar ishlab chiqish' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Desktop ilovalar ishlab chiqish' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Web platformalar va API arxitekturasi' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Telegram botlar va Mini App' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'AI integratsiyalari' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Cloud va DevOps' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'UI/UX dizayn tizimlari' } }
    ]
  }
}

function buildWebSiteSchema(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': `${AGENCY_URL}/#website`,
    'url': AGENCY_URL,
    'name': AGENCY_NAME,
    'publisher': { '@id': `${AGENCY_URL}/#organization` },
    'inLanguage': 'uz'
  }
}

function buildSoftwareApplicationSchema(project: {
  name: string
  tagline: string
  description: string
  url: string
  stack: string[]
}): JsonLdNode {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${project.url}/#software`,
    'name': project.name,
    'applicationCategory': 'BusinessApplication',
    'applicationSubCategory': 'E-tijorat ekotizimi',
    'operatingSystem': 'iOS, Android',
    'description': `${project.tagline}. ${project.description}`,
    'url': project.url,
    'softwareVersion': '1.0',
    'author': { '@id': `${AGENCY_URL}/#organization` },
    'publisher': { '@id': `${AGENCY_URL}/#organization` },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'UZS',
      'availability': 'https://schema.org/InStock'
    },
    'featureList': project.stack
  }
}

function toJsonLdScript(nodes: JsonLdNode[]) {
  return [{ '@context': 'https://schema.org', '@graph': nodes }]
}

/**
 * Central SEO engine: per-route meta, canonical URL, generated OpenGraph image
 * and JSON-LD structured data (Organization, WebSite, optional SoftwareApplication).
 */
export function useSeo(input: SeoInput, options: { software?: { name: string, tagline: string, description: string, url: string, stack: string[] } } = {}) {
  const siteUrl = (useRuntimeConfig().public.siteUrl as string | undefined) ?? AGENCY_URL
  const path = input.path ?? '/'
  const canonical = new URL(path, siteUrl).toString()
  const ogImage = input.ogImage ?? '/og/__og-image/image.png'
  const ogImageUrl = new URL(ogImage, siteUrl).toString()
  const keywords = [...new Set([...DEFAULT_KEYWORDS, ...(input.keywords ?? [])])]

  const graph: JsonLdNode[] = [buildOrganizationSchema(), buildWebSiteSchema()]
  if (options.software) {
    graph.push(buildSoftwareApplicationSchema(options.software))
  }

  useHead({
    htmlAttrs: { lang: 'uz' },
    link: [{ rel: 'canonical', href: canonical }],
    meta: [{ name: 'keywords', content: keywords.join(', ') }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(toJsonLdScript(graph)) }]
  })

  useSeoMeta({
    title: input.title,
    description: input.description,
    ogTitle: input.title,
    ogDescription: input.description,
    ogUrl: canonical,
    ogType: input.type ?? 'website',
    ogImage: ogImageUrl,
    ogImageAlt: `${AGENCY_NAME} — ${input.title}`,
    ogSiteName: AGENCY_NAME,
    twitterTitle: input.title,
    twitterDescription: input.description,
    twitterImage: ogImageUrl,
    twitterCard: 'summary_large_image',
    robots: input.noindex ? 'noindex, nofollow' : 'index, follow'
  })
}
