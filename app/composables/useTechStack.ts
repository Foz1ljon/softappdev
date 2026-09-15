export interface TechItem {
  name: string
  icon: string
  note: string
}

export interface TechCategory {
  id: string
  label: string
  labelUz: string
  icon: string
  items: TechItem[]
}

const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    labelUz: 'Frontend',
    icon: 'i-lucide-monitor-smartphone',
    items: [
      { name: 'Vue 3', icon: 'i-simple-icons-vuedotjs', note: 'Composition API everywhere' },
      { name: 'TypeScript', icon: 'i-simple-icons-typescript', note: 'Strict, end-to-end typed' },
      { name: 'Vite', icon: 'i-lucide-zap', note: 'Fast HMR and lean bundles' },
      { name: 'Tailwind CSS v4', icon: 'i-simple-icons-tailwindcss', note: 'Token-driven design systems' },
      { name: 'Design systems', icon: 'i-lucide-palette', note: 'Reusable, accessible components' }
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    labelUz: 'Backend',
    icon: 'i-lucide-server-cog',
    items: [
      { name: 'Node.js', icon: 'i-simple-icons-nodedotjs', note: 'JavaScript on the metal' },
      { name: 'NestJS', icon: 'i-lucide-network', note: 'Modular microservices' },
      { name: 'Fastify', icon: 'i-lucide-gauge', note: 'Low-latency REST & webhooks' },
      { name: 'Redis', icon: 'i-simple-icons-redis', note: 'Caching, queues, pub/sub' },
      { name: 'BullMQ', icon: 'i-lucide-list-start', note: 'Durable job pipelines' }
    ]
  },
  {
    id: 'database',
    label: 'Database',
    labelUz: 'Ma’lumotlar bazasi',
    icon: 'i-lucide-database',
    items: [
      { name: 'PostgreSQL', icon: 'i-simple-icons-postgresql', note: 'Relational core, ACID' },
      { name: 'MongoDB', icon: 'i-simple-icons-mongodb', note: 'Flexible document stores' },
      { name: 'Drizzle ORM', icon: 'i-lucide-table-2', note: 'Type-safe migrations' },
      { name: 'Redis', icon: 'i-simple-icons-redis', note: 'Hot path caching layer' },
      { name: 'S3 Storage', icon: 'i-lucide-hard-drive', note: 'Media & backup objects' }
    ]
  },
  {
    id: 'mobile-cloud',
    label: 'Mobile & Cloud',
    labelUz: 'Mobil va Cloud',
    icon: 'i-lucide-cloud',
    items: [
      { name: 'Capacitor', icon: 'i-lucide-smartphone', note: 'One codebase, two stores' },
      { name: 'Nginx', icon: 'i-simple-icons-nginx', note: 'TLS, proxying, load balancing' },
      { name: 'Hetzner', icon: 'i-lucide-server', note: 'Cost-efficient bare metal & VPS' },
      { name: 'Cloudflare', icon: 'i-simple-icons-cloudflare', note: 'Edge CDN, WAF, DNS' },
      { name: 'GitHub Actions', icon: 'i-simple-icons-githubactions', note: 'CI/CD pipelines' }
    ]
  }
]

export function useTechStack() {
  const activeCategoryId = ref<string>(techCategories[0]!.id)

  const activeCategory = computed<TechCategory>(
    () => techCategories.find(category => category.id === activeCategoryId.value) ?? techCategories[0]!
  )

  function selectCategory(id: string) {
    activeCategoryId.value = id
  }

  return {
    categories: readonly(techCategories),
    activeCategoryId,
    activeCategory,
    selectCategory
  }
}
