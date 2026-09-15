export type ProjectCategory = 'all' | 'ecommerce' | 'crm-erp' | 'mobile' | 'government'

export interface ProjectMetric {
  value: string
  label: string
}

export interface ProjectLink {
  label: string
  url: string
  icon: string
  /** Internal route (rendered with NuxtLink) instead of an external URL. */
  internal?: boolean
}

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  domain: string
  url: string
  categories: Exclude<ProjectCategory, 'all'>[]
  stack: string[]
  metrics: ProjectMetric[]
  links: ProjectLink[]
  featured: boolean
  year: string
  architectureNotes: string[]
}

export interface ProjectFilter {
  value: ProjectCategory
  label: string
  labelUz: string
  icon: string
}

const projectFilters: ProjectFilter[] = [
  { value: 'all', label: 'All', labelUz: 'Barchasi', icon: 'i-lucide-layout-grid' },
  { value: 'ecommerce', label: 'E-Commerce', labelUz: 'E-tijorat', icon: 'i-lucide-shopping-cart' },
  { value: 'crm-erp', label: 'CRM/ERP', labelUz: 'CRM/ERP', icon: 'i-lucide-workflow' },
  { value: 'mobile', label: 'Mobile Apps', labelUz: 'Mobil ilovalar', icon: 'i-lucide-smartphone' },
  { value: 'government', label: 'Government', labelUz: 'Davlat', icon: 'i-lucide-landmark' }
]

const projects: Project[] = [
  {
    id: 'connectmobile',
    name: 'ConnectMobile',
    tagline: 'All-in-One E-Commerce Ecosystem',
    description: 'Cross-platform mobile application, courier terminal, admin dashboard and microservices backend powering a full retail logistics loop — from storefront order to last-mile delivery.',
    domain: 'connectmobile.uz',
    url: 'https://connectmobile.uz',
    categories: ['ecommerce', 'mobile', 'crm-erp'],
    stack: ['Vue 3', 'Capacitor', 'NestJS', 'Click Payment', 'Uzpost API', 'BTS Express', 'PostgreSQL', 'Redis', 'BullMQ', 'Tailwind'],
    metrics: [
      { value: '2', label: 'App Stores Live' },
      { value: '10k+', label: 'Downloads' },
      { value: '3', label: 'Carrier Integrations' }
    ],
    links: [
      { label: 'View Live Project', url: 'https://connectmobile.uz', icon: 'i-lucide-external-link' },
      { label: 'Read the full case study', url: '/work/connectmobile', icon: 'i-lucide-book-open', internal: true }
    ],
    featured: true,
    year: '2024 — Present',
    architectureNotes: [
      'Capacitor shell around Vue 3 delivers one codebase for the Google Play Store and the App Store with native plugin access.',
      'NestJS microservices isolate catalog, checkout and delivery domains behind a Redis-cached gateway.',
      'Click payment gateway handles card transactions with idempotent webhook reconciliation.',
      'Uzpost and BTS Express integrations route each parcel to the optimal carrier with live tracking events.',
      'Courier terminal and admin dashboard share the same REST contracts, keeping fleet and inventory data in sync.'
    ]
  }
]

function filterByCategory(category: ProjectCategory): Project[] {
  if (category === 'all') {
    return projects
  }
  return projects.filter(project => project.categories.includes(category))
}

function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}

export function useProjects() {
  const selectedCategory = ref<ProjectCategory>('all')
  const visibleProjects = computed(() => filterByCategory(selectedCategory.value))
  const featuredProject = computed<Project>(() => {
    const featured = projects.find(project => project.featured)
    if (!featured) {
      throw new Error('Portfolio must contain exactly one featured project')
    }
    return featured
  })

  return {
    projects: readonly(projects),
    filters: readonly(projectFilters),
    selectedCategory,
    visibleProjects,
    featuredProject,
    getProjectById
  }
}
