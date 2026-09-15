export interface TechItem {
  name: string
  icon: string
  note: string
}

export interface TechCategory {
  id: string
  label: string
  icon: string
  items: TechItem[]
}

const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'i-lucide-monitor-smartphone',
    items: [
      { name: 'Vue 3', icon: 'i-simple-icons-vuedotjs', note: 'Hamma joyda Composition API' },
      { name: 'TypeScript', icon: 'i-simple-icons-typescript', note: 'Qat’iy, uchdan-uchiga tiplangan' },
      { name: 'Vite', icon: 'i-lucide-zap', note: 'Tez HMR va yengil bundle' },
      { name: 'Tailwind CSS v4', icon: 'i-simple-icons-tailwindcss', note: 'Tokenga asoslangan dizayn tizimi' },
      { name: 'Ant Design', icon: 'i-simple-icons-antdesign', note: 'Admin panellar uchun tayyor komponentlar' },
      { name: 'Dizayn tizimlari', icon: 'i-lucide-palette', note: 'Qayta ishlatiladigan, qulay komponentlar' }
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: 'i-lucide-server-cog',
    items: [
      { name: 'Node.js', icon: 'i-simple-icons-nodedotjs', note: 'Server tomonda JavaScript' },
      { name: 'NestJS', icon: 'i-lucide-network', note: 'Modulli mikroservislar' },
      { name: 'Fastify', icon: 'i-lucide-gauge', note: 'Past kechikishli REST va webhook' },
      { name: 'Redis', icon: 'i-simple-icons-redis', note: 'Kesh, navbat, pub/sub' },
      { name: 'BullMQ', icon: 'i-lucide-list-start', note: 'Ishonchli vazifa oqimlari' }
    ]
  },
  {
    id: 'database',
    label: 'Ma’lumotlar bazasi',
    icon: 'i-lucide-database',
    items: [
      { name: 'MongoDB', icon: 'i-simple-icons-mongodb', note: 'Moslashuvchan hujjatli baza' },
      { name: 'Mongoose', icon: 'i-lucide-table-2', note: 'Sxema va tiplangan modellar' },
      { name: 'PostgreSQL', icon: 'i-simple-icons-postgresql', note: 'Relyatsion yadro, ACID' },
      { name: 'Redis', icon: 'i-simple-icons-redis', note: 'Issiq yo‘llar uchun kesh qatlami' },
      { name: 'S3 saqlash', icon: 'i-lucide-hard-drive', note: 'Media va zaxira nusxalari' }
    ]
  },
  {
    id: 'mobile-cloud',
    label: 'Mobil va Cloud',
    icon: 'i-lucide-cloud',
    items: [
      { name: 'Capacitor', icon: 'i-lucide-smartphone', note: 'Bitta kod bazasi, ikkita do‘kon' },
      { name: 'Nginx', icon: 'i-simple-icons-nginx', note: 'TLS, proksi, yuk taqsimlash' },
      { name: 'Hetzner', icon: 'i-lucide-server', note: 'Tejamkor bare metal va VPS' },
      { name: 'Cloudflare', icon: 'i-simple-icons-cloudflare', note: 'Edge CDN, WAF, DNS' },
      { name: 'GitHub Actions', icon: 'i-simple-icons-githubactions', note: 'CI/CD quvurlari' }
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
