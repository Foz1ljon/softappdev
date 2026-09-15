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
  icon: string
}

const projectFilters: ProjectFilter[] = [
  { value: 'all', label: 'Barchasi', icon: 'i-lucide-layout-grid' },
  { value: 'ecommerce', label: 'E-tijorat', icon: 'i-lucide-shopping-cart' },
  { value: 'crm-erp', label: 'CRM/ERP', icon: 'i-lucide-workflow' },
  { value: 'mobile', label: 'Mobil ilovalar', icon: 'i-lucide-smartphone' },
  { value: 'government', label: 'Davlat', icon: 'i-lucide-landmark' }
]

const projects: Project[] = [
  {
    id: 'connectmobile',
    name: 'ConnectMobile',
    tagline: 'Yagona e-tijorat ekotizimi',
    description: 'Ko‘p platformali mobil ilova, kuryer terminali, admin paneli va mikroservis backend — vitrinadagi buyurtmadan oxirgi milyagacha bo‘lgan to‘liq savdo-logistika zanjirini boshqaradi.',
    domain: 'connectmobile.uz',
    url: 'https://connectmobile.uz',
    categories: ['ecommerce', 'mobile', 'crm-erp'],
    stack: ['Vue 3', 'Capacitor', 'Tailwind', 'Ant Design', 'NestJS', 'Fastify', 'MongoDB', 'Redis', 'BullMQ', 'Click Payment', 'Uzpost API', 'BTS Express'],
    metrics: [
      { value: '2', label: 'Ilova do‘koni' },
      { value: '10k+', label: 'Yuklab olishlar' },
      { value: '3', label: 'Kuryer integratsiyasi' }
    ],
    links: [
      { label: 'Jonli loyihani ko‘rish', url: 'https://connectmobile.uz', icon: 'i-lucide-external-link' },
      { label: 'To‘liq keysni o‘qish', url: '/work/connectmobile', icon: 'i-lucide-book-open', internal: true }
    ],
    featured: true,
    year: '2026-yil maydan — hozirgacha',
    architectureNotes: [
      'Vue 3 ustidagi Capacitor qobig‘i bitta kod bazasidan Google Play va App Store’ga chiqadi hamda native plaginlarga to‘liq kirish beradi.',
      'NestJS mikroservislari katalog, to‘lov va yetkazish domenlarini Redis keshli gateway ortida ajratadi.',
      'Fastify adapteri REST va webhook yo‘llarini past kechikish bilan xizmat qiladi.',
      'MongoDB hujjatli modeli katalog, buyurtma va telemetriya ma’lumotlarini sxema evolyutsiyasiga xalal bermay saqlaydi.',
      'Click to‘lov shlyuzi karta tranzaksiyalarini idempotent webhook solishtiruvi bilan boshqaradi.',
      'Uzpost va BTS Express integratsiyalari har bir posilkani optimal kuryerga yo‘naltiradi va jonli kuzatuv hodisalarini beradi.',
      'Kuryer terminali va Ant Design asosidagi admin panel bir xil REST shartnomalaridan foydalanadi — flot va ombor ma’lumotlari sinxron qoladi.'
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
