export type Locale = 'en' | 'uz'

export interface AppLocale {
  code: Locale
  label: string
  shortLabel: string
  htmlLang: string
}

const appLocales: AppLocale[] = [
  { code: 'en', label: 'English', shortLabel: 'EN', htmlLang: 'en' },
  { code: 'uz', label: 'O‘zbekcha', shortLabel: 'UZ', htmlLang: 'uz' }
]

/** Bilingual string used by content composables (portfolio, tech stack, case studies). */
export interface LocalizedText {
  en: string
  uz: string
}

type CopyTree = Record<string, string>

const uiCopy: Record<Locale, CopyTree> = {
  en: {
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.stack': 'Stack',
    'nav.process': 'Process',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cta': 'Estimate Project',
    'hero.badge': 'Available for new enterprise projects in 2026',
    'hero.title.a': 'Engineering High-Performance',
    'hero.title.b': 'CRM, ERP & Cross-Platform',
    'hero.title.c': 'Mobile Solutions',
    'hero.subtitle': 'End-to-end custom software development — from enterprise architecture and microservices backends to polished mobile apps your users love.',
    'hero.cta.cases': 'Explore Case Studies',
    'hero.cta.start': 'Start a Project',
    'portfolio.filter': 'Filter projects',
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'Production systems we designed, built and still operate — from full-stack e-commerce ecosystems to enterprise CRM platforms.',
    'portfolio.featured': 'Featured Case Study',
    'portfolio.viewAll': 'View Live Project',
    'portfolio.architecture': 'Read the full case study',
    'portfolio.flipHint': 'Click to open the architecture view',
    'portfolio.flipBack': 'Click to flip back',
    'portfolio.architectureTitle': 'System architecture',
    'case.back': 'All case studies',
    'case.eyebrow': 'Case study',
    'case.cta': 'Start a similar project',
    'case.ctaTitle': 'Need a system like this?',
    'case.ctaBody': 'We can run the same discovery and architecture process for your business — CRM, e-commerce, logistics or a mobile product of your own.',
    'case.stackLabel': 'Technology stack',
    'case.capabilities': 'Native capabilities',
    'case.ecosystem.title': 'One system, four products',
    'case.ecosystem.subtitle': 'The customer app, the courier terminal, the operations dashboard and the backend platform are separate products on one contract — select a node to see how they connect.',
    'case.ecosystem.hint': 'Live map · order core in the centre, products on the inner orbit, carrier adapters on the outer ring.',
    'case.deepDive.title': 'Product deep dive',
    'case.backend.title': 'Behind the scenes: the service catalog',
    'case.backend.subtitle': 'Twelve services split along domain boundaries. Each one owns its data, exposes a versioned contract through the gateway and keeps its slow work on a queue.',
    'case.integrations.title': 'Integrations that carry the business',
    'case.integrations.subtitle': 'Payments, national carriers and messaging are the parts that most often break a delivery business. Each one is wrapped behind an adapter with retries, logging and reconciliation.',
    'case.lifecycle.title': 'The life of one order',
    'case.lifecycle.subtitle': 'From the first tap in the app to the settlement report — the same order, in the same system, without a single manual re-entry.',
    'case.principles.title': 'Engineering decisions that paid off',
    'case.phases.title': 'How we got there',
    'services.title': 'What we build',
    'services.subtitle': 'Core engineering capabilities for enterprise-scale products.',
    'stack.title': 'Interactive Tech Stack Matrix',
    'stack.subtitle': 'Production-grade tools we deploy, operate and stand behind.',
    'process.title': 'How we deliver',
    'process.subtitle': 'A proven path from first call to production rollout.',
    'contact.title': 'Estimate your project',
    'contact.subtitle': 'Answer a few questions and get a scoped estimate within one business day.',
    'contact.step': 'Step',
    'contact.of': 'of',
    'contact.next': 'Next',
    'contact.back': 'Back',
    'contact.submit': 'Request Estimate',
    'contact.submitAnother': 'Submit another request',
    'contact.step1.title': 'What are you building?',
    'contact.step2.budget': 'Budget range',
    'contact.step2.timeline': 'Timeline',
    'contact.form.name': 'Name',
    'contact.form.namePlaceholder': 'Your full name',
    'contact.form.email': 'Work email',
    'contact.form.emailPlaceholder': 'you@company.com',
    'contact.form.company': 'Company (optional)',
    'contact.form.companyPlaceholder': 'Company name',
    'contact.form.message': 'Project description',
    'contact.form.messagePlaceholder': 'Tell us about your project — goals, users, scale, timeline...',
    'contact.errors.selectType': 'Select a project type',
    'contact.errors.selectOption': 'Select an option',
    'contact.errors.name': 'Name is required',
    'contact.errors.email': 'A valid email is required',
    'contact.errors.message': 'Please describe your project in at least 20 characters',
    'contact.success.title': 'Request received',
    'contact.success.description': 'Thanks! Our team will get back to you within one business day.',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.case': 'Case study',
    'footer.services': 'Services',
    'footer.company': 'Company'
  },
  uz: {
    'nav.services': 'Xizmatlar',
    'nav.portfolio': 'Portfolio',
    'nav.stack': 'Texnologiyalar',
    'nav.process': 'Jarayon',
    'nav.about': 'Kompaniya',
    'nav.contact': 'Aloqa',
    'nav.cta': 'Loyihani baholash',
    'hero.badge': '2026-yilda yangi korporativ loyihalar uchun mavjud',
    'hero.title.a': 'Yuqori unumdorli',
    'hero.title.b': 'CRM, ERP va ko‘p platformali',
    'hero.title.c': 'mobil yechimlarni ishlab chiqamiz',
    'hero.subtitle': 'Uchdan oxirigacha to‘liq dasturiy ta’minot ishlab chiqish — korporativ arxitektura va mikroservis backenddan tortib, foydalanuvchilar yoqtirgan mobil ilovalargacha.',
    'hero.cta.cases': 'Keyslarni ko‘rish',
    'hero.cta.start': 'Loyihani boshlash',
    'portfolio.filter': 'Loyihalarni saralash',
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'Biz loyihalashtirgan, qurgan va hanuz qo‘llab-quvvatlayotgan tizimlar — to‘liq e-tijorat ekotizimidan tortib korporativ CRM platformalarigacha.',
    'portfolio.featured': 'Asosiy keys',
    'portfolio.viewAll': 'Jonli loyihani ko‘rish',
    'portfolio.architecture': 'To‘liq keysni o‘qish',
    'portfolio.flipHint': 'Arxitektura ko‘rinishini ochish uchun bosing',
    'portfolio.flipBack': 'Orqaga qaytish uchun bosing',
    'portfolio.architectureTitle': 'Tizim arxitekturasi',
    'case.back': 'Barcha keyslar',
    'case.eyebrow': 'Keys',
    'case.cta': 'Shunga o‘xshash loyihani boshlash',
    'case.ctaTitle': 'Shunday tizim kerakmi?',
    'case.ctaBody': 'Biznesingiz uchun xuddi shu tahlil va arxitektura jarayonini o‘tkazamiz — CRM, e-tijorat, logistika yoki o‘zingizning mobil mahsulotingiz.',
    'case.stackLabel': 'Texnologiyalar',
    'case.capabilities': 'Native imkoniyatlar',
    'case.ecosystem.title': 'Bitta tizim, to‘rt mahsulot',
    'case.ecosystem.subtitle': 'Mijoz ilovasi, kuryer terminali, boshqaruv paneli va backend platforma — bitta shartnomadagi alohida mahsulotlar. Ular qanday bog‘lanishini ko‘rish uchun tugunni tanlang.',
    'case.ecosystem.hint': 'Jonli xarita · markazda buyurtma yadrosi, ichki orbitada mahsulotlar, tashqi halqada kuryer adapterlari.',
    'case.deepDive.title': 'Mahsulot tahlili',
    'case.backend.title': 'Parda ortida: servislar katalogi',
    'case.backend.subtitle': 'Domen chegaralari bo‘yicha bo‘lingan o‘n ikkita servis. Har biri o‘z ma’lumotiga ega, gateway orqali versiyalangan shartnoma taqdim etadi va sekin ishlarini navbatga chiqaradi.',
    'case.integrations.title': 'Biznesni ko‘tarib turuvchi integratsiyalar',
    'case.integrations.subtitle': 'To‘lov, milliy kuryerlar va xabar yuborish — yetkazish biznesini eng ko‘p buzadigan qismlar. Har biri qayta urinish, jurnal va solishtiruv bilan adapter ortiga o‘ralgan.',
    'case.lifecycle.title': 'Bitta buyurtmaning hayoti',
    'case.lifecycle.subtitle': 'Ilovadagi birinchi bosishdan hisob-kitob hisobotigacha — bitta buyurtma, bitta tizimda, qo‘lda qayta kiritishsiz.',
    'case.principles.title': 'O‘zini oqlagan muhandislik qarorlari',
    'case.phases.title': 'Shu yergacha qanday keldik',
    'services.title': 'Nimalar yaratamiz',
    'services.subtitle': 'Korporativ miqyosdagi mahsulotlar uchun asosiy muhandislik imkoniyatlari.',
    'stack.title': 'Interaktiv texnologiyalar matritsasi',
    'stack.subtitle': 'Ishlab chiqarishda foydalanadigan va qo‘llab-quvvatlaydigan vositalarimiz.',
    'process.title': 'Qanday yetkazib beramiz',
    'process.subtitle': 'Birinchi uchrashuvdan ishga tushirishgacha bo‘lgan isbotlangan yo‘l xaritasi.',
    'contact.title': 'Loyihangizni baholash',
    'contact.subtitle': 'Bir nechta savolga javob bering — bir ish kuni ichida smeta olasiz.',
    'contact.step': 'Qadam',
    'contact.of': '/',
    'contact.next': 'Keyingi',
    'contact.back': 'Orqaga',
    'contact.submit': 'Sema so‘rash',
    'contact.submitAnother': 'Yana so‘rov yuborish',
    'contact.step1.title': 'Nima qurmoqchisiz?',
    'contact.step2.budget': 'Budjet oralig‘i',
    'contact.step2.timeline': 'Muddat',
    'contact.form.name': 'Ism',
    'contact.form.namePlaceholder': 'To‘liq ismingiz',
    'contact.form.email': 'Ish emaili',
    'contact.form.emailPlaceholder': 'siz@kompaniya.uz',
    'contact.form.company': 'Kompaniya (ixtiyoriy)',
    'contact.form.companyPlaceholder': 'Kompaniya nomi',
    'contact.form.message': 'Loyiha tavsifi',
    'contact.form.messagePlaceholder': 'Loyihangiz haqida yozing — maqsad, foydalanuvchilar, miqyos, muddat...',
    'contact.errors.selectType': 'Loyiha turini tanlang',
    'contact.errors.selectOption': 'Variantni tanlang',
    'contact.errors.name': 'Ism kiritilishi shart',
    'contact.errors.email': 'To‘g‘ri email kiriting',
    'contact.errors.message': 'Loyihani kamida 20 belgida tasvirlab bering',
    'contact.success.title': 'So‘rov qabul qilindi',
    'contact.success.description': 'Rahmat! Jamoamiz bir ish kuni ichida siz bilan bog‘lanadi.',
    'footer.rights': 'Barcha huquqlar himoyalangan.',
    'footer.privacy': 'Maxfiylik siyosati',
    'footer.terms': 'Xizmat shartlari',
    'footer.case': 'Keys',
    'footer.services': 'Xizmatlar',
    'footer.company': 'Kompaniya'
  }
}

/**
 * Lightweight UI dictionary for the UZ / EN toggle.
 * Site-level metadata and routing stay with @nuxtjs/seo.
 */
export function useLocale() {
  const localeCookie = useCookie<Locale>('sad-locale', {
    default: () => 'en',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax'
  })

  const locale = computed<Locale>({
    get: () => localeCookie.value,
    set: (value) => {
      localeCookie.value = value
      useHead({ htmlAttrs: { lang: appLocales.find(item => item.code === value)?.htmlLang ?? 'en' } })
    }
  })

  const currentLocale = computed<AppLocale>(
    () => appLocales.find(item => item.code === locale.value) ?? appLocales[0]!
  )

  function t(key: string): string {
    return uiCopy[locale.value][key] ?? uiCopy.en[key] ?? key
  }

  /** Picks the active language out of a bilingual content object. */
  function lt(value: LocalizedText): string {
    return locale.value === 'uz' ? value.uz : value.en
  }

  function toggleLocale() {
    locale.value = locale.value === 'en' ? 'uz' : 'en'
  }

  return {
    locales: readonly(appLocales),
    locale,
    currentLocale,
    t,
    lt,
    toggleLocale
  }
}
