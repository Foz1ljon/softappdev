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
  'IT agency Uzbekistan',
  'custom CRM development',
  'ERP systems',
  'cross-platform mobile development',
  'Capacitor app development',
  'NestJS backend',
  'high-load web platforms',
  'cloud solutions',
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
    'description': 'IT agency specializing in custom CRM/ERP systems, high-load web platforms, native and cross-platform mobile development, and cloud solutions.',
    'foundingDate': '2021',
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
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Enterprise CRM & ERP Systems' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Cross-Platform Mobile Development' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'High-Load Backend & API Architecture' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'UI/UX System Design' } }
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
    'inLanguage': 'en'
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
    'applicationSubCategory': 'E-Commerce Ecosystem',
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
    htmlAttrs: { lang: 'en' },
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
