import type { LocalizedText } from './useLocale'

/** Compact helper that keeps the bilingual content below readable. */
const t = (en: string, uz: string): LocalizedText => ({ en, uz })

export interface CaseMetric {
  value: string
  label: LocalizedText
}

export interface CaseProduct {
  id: string
  name: string
  kind: LocalizedText
  tagline: LocalizedText
  summary: LocalizedText
  platform: string
  icon: string
  accent: 'indigo' | 'cyan' | 'emerald' | 'amber'
  modules: { title: LocalizedText, body: LocalizedText }[]
  capabilities: string[]
  outcome: LocalizedText
}

export interface BackendService {
  name: string
  icon: string
  role: LocalizedText
  detail: LocalizedText
  stores: string[]
}

export interface CaseIntegration {
  name: string
  icon: string
  purpose: LocalizedText
  notes: LocalizedText[]
}

export interface CasePhase {
  period: LocalizedText
  title: LocalizedText
  body: LocalizedText
}

export interface LifecycleStep {
  title: LocalizedText
  body: LocalizedText
  icon: string
}

const caseMetrics: CaseMetric[] = [
  { value: '4', label: t('Products shipped', 'Ishga tushirilgan mahsulot') },
  { value: '2', label: t('App stores live', 'Ilova do‘koni') },
  { value: '10k+', label: t('App downloads', 'Yuklab olishlar') },
  { value: '12', label: t('Backend services', 'Backend servis') },
  { value: '3+', label: t('Carrier integrations', 'Kuryer integratsiyasi') },
  { value: '1', label: t('Shared codebase', 'Umumiy kod bazasi') }
]

const caseProducts: CaseProduct[] = [
  {
    id: 'mobile-app',
    name: 'ConnectMobile App',
    kind: t('Customer app · iOS & Android', 'Mijoz ilovasi · iOS va Android'),
    tagline: t(
      'Storefront, checkout and live order tracking in one native-feeling app.',
      'Vitrina, to‘lov va buyurtmani real vaqtda kuzatish — bitta native tuyg‘uli ilovada.'
    ),
    summary: t(
      'The customer-facing product of the ecosystem. A single Vue 3 + Capacitor codebase ships to the App Store and Google Play, sharing its design tokens with the courier terminal and the operations dashboard so the whole ecosystem feels like one product.',
      'Ekotizimning mijozga qaragan mahsuloti. Bitta Vue 3 + Capacitor kod bazasi App Store va Google Play’ga chiqadi va dizayn tokenlarini kuryer terminali hamda boshqaruv paneli bilan bo‘lishadi — shu sabab butun ekotizim bitta mahsulotdek tuyuladi.'
    ),
    platform: 'Vue 3 · Capacitor · TypeScript · Tailwind',
    icon: 'i-lucide-smartphone',
    accent: 'indigo',
    modules: [
      {
        title: t('Catalog & discovery', 'Katalog va qidiruv'),
        body: t(
          'Category tree, faceted filters, stock-aware search and lazy-loaded product galleries. Images are served as responsive WebP/AVIF from S3 through the CDN, so a category with hundreds of SKUs still opens instantly on a mid-range Android device. Recently viewed and re-order shortcuts cut repeat purchase down to two taps.',
          'Kategoriya daraxti, fasetli filtrlar, omborga bog‘langan qidiruv va lazy-load galereyalar. Rasmlar S3’dan CDN orqali moslashuvchan WebP/AVIF ko‘rinishida beriladi — yuzlab SKU bor kategoriya ham o‘rtacha Android qurilmada bir zumda ochiladi. “Yaqinda ko‘rilgan” va qayta buyurtma yorliqlari takroriy xaridni ikki bosishga tushiradi.'
        )
      },
      {
        title: t('Cart, checkout & delivery slots', 'Savat, to‘lov va yetkazish oynalari'),
        body: t(
          'Server-side cart that survives app restarts and guest-to-account migration, promo code validation against live rules, and a checkout that lets the customer choose between door delivery with a map pin and pickup at the nearest partner point. Address book keeps geolocation-picked pins per apartment.',
          'Ilova qayta ishga tushganda ham yo‘qolmaydigan server-side savat, mehmon hisobini akkauntga ko‘chirish, jonli qoidalar bo‘yicha promokod tekshiruvi. To‘lov bosqichida mijoz xaritada belgilangan manzilga yetkazish yoki eng yaqin hamkor punktidan olib ketishni tanlaydi. Manzillar kitobi xaritada belgilangan nuqtalarni saqlaydi.'
        )
      },
      {
        title: t('Payments & COD', 'To‘lovlar va naqd pul'),
        body: t(
          'Click Payment checkout runs through the hosted card flow with a prepare/complete handshake, so a dropped connection never leaves a paid-but-unconfirmed order. Every confirmation arrives as a webhook that is reconciled idempotently; refunds and retries are handled by the payments service. Cash-on-delivery orders are flagged for the courier ledger.',
          'Click Payment to‘lovi hosted karta oqimi orqali prepare/complete bosqichlari bilan ishlaydi — aloqa uzilsa ham “to‘langan, lekin tasdiqlanmagan” buyurtma qolmaydi. Har bir tasdiq idempotent tarzda solishtiriladigan webhook sifatida keladi; qaytarish va qayta urinishlar to‘lov servisi tomonidan bajariladi. Naqd to‘lov buyurtmalari kuryer daftari uchun belgilanadi.'
        )
      },
      {
        title: t('Order tracking & notifications', 'Buyurtma kuzatuvi va bildirishnomalar'),
        body: t(
          'Carrier events from Uzpost and BTS Express plus the in-house fleet are normalised into one status stream, so the customer sees a single timeline: accepted, packed, in transit, courier assigned, delivered. Push notifications fire on every transition, and the active order stays readable on a weak connection thanks to local caching.',
          'Uzpost va BTS Express hodisalari hamda ichki flot ma’lumotlari bitta status oqimiga keltiriladi — mijoz yagona vaqt chizig‘ini ko‘radi: qabul qilindi, qadoqlandi, yo‘lda, kuryerga berildi, yetkazildi. Har bir o‘zgarishda push yuboriladi, faol buyurtma esa lokal kesh tufayli zaif tarmoqda ham ochiladi.'
        )
      },
      {
        title: t('Account, reviews & support', 'Kabinet, sharhlar va qo‘llab-quvvatlash'),
        body: t(
          'Profile and saved addresses, order history with one-tap re-order, favourites, photo reviews uploaded straight from the camera, and an entry point into support with the order context already attached. Interface ships in Uzbek and Russian with light and dark themes.',
          'Profil va saqlangan manzillar, buyurtmalar tarixi va bir tugma bilan qayta buyurtma, sevimlilar, kameradan yuklangan fotoli sharhlar, shuningdek buyurtma konteksti biriktirilgan holda qo‘llab-quvvatlashga chiqish. Interfeys o‘zbek va rus tillarida, yorug‘ va qorong‘i mavzular bilan.'
        )
      }
    ],
    capabilities: ['Camera', 'Geolocation', 'Secure token storage', 'Push (FCM / APNs)', 'Deep links', 'Offline cache'],
    outcome: t(
      'One codebase, two store listings, and a checkout funnel that keeps working when the network does not.',
      'Bitta kod bazasi, ikkita do‘kon sahifasi va tarmoq ishlamaganda ham ishlashda davom etadigan to‘lov oqimi.'
    )
  },
  {
    id: 'courier-terminal',
    name: 'Courier Terminal',
    kind: t('Last-mile workspace · offline-first', 'Oxirgi milya ish stoli · offline-first'),
    tagline: t(
      'A full delivery shift — scanning, proof of handover, cash and telemetry — even without a stable network.',
      'To‘liq ish smenasi — skanerlash, topshirish isboti, naqd pul va telemetriya — barqaror tarmoqsiz ham.'
    ),
    summary: t(
      'The courier product was designed around a hard constraint: connectivity in the field is unreliable. Every action is written to an on-device operation queue first and replayed to the API when the network returns, so a courier can complete an entire shift in near-offline conditions and still end the day with a consistent server state.',
      'Kuryer mahsuloti qat’iy cheklov asosida loyihalandi: dalada aloqa ishonchsiz. Har bir amal avval qurilmadagi amallar navbatiga yoziladi va tarmoq qaytganda API’ga yuboriladi — kuryer deyarli offline sharoitda butun smenani yakunlab, kun oxirida serverda izchil holat qoldiradi.'
    ),
    platform: 'Vue 3 · Capacitor · Background sync',
    icon: 'i-lucide-truck',
    accent: 'emerald',
    modules: [
      {
        title: t('Route of the day', 'Kunning marshruti'),
        body: t(
          'An ordered stop list with delivery windows, parcel counts per stop, address details and a one-tap handoff to the navigation app. The terminal suggests the next stop by window and distance, and highlights stops at risk of breaching their SLA.',
          'Yetkazish oynalari, har bir manzildagi posilka soni, manzil tafsilotlari va navigatsiyaga bir tugma bilan o‘tish imkoniyati. Terminal keyingi manzilni oyna va masofa bo‘yicha taklif qiladi hamda SLA buzilish xavfi bor manzillarni ajratib ko‘rsatadi.'
        )
      },
      {
        title: t('Handover verification', 'Topshirishni tasdiqlash'),
        body: t(
          'Parcel labels are scanned as QR or barcode from the camera, an OTP is sent to the customer and confirmed on screen, and unattended deliveries capture a photo plus a signature. Nothing is marked as delivered unless the proof chain is complete — which removed the disputes that used to be settled by phone calls.',
          'Posilka yorlig‘i kameradan QR yoki shtrix-kod sifatida skanerlanadi, mijozga OTP yuboriladi va ekranda tasdiqlanadi, uyda topilmagan yetkazishlarda esa foto va imzo olinadi. Isbot zanjiri to‘liq bo‘lmasa, buyurtma yetkazilgan deb belgilanmaydi — shu bilan ilgari telefon orqali hal qilinadigan nizolar yo‘qoldi.'
        )
      },
      {
        title: t('Offline operation queue', 'Offline amallar navbati'),
        body: t(
          'Status changes, scans, signatures, photos and cash notes are appended to a local queue with client-generated ids. When connectivity returns the terminal replays the queue in order; the server treats those ids idempotently, ignores duplicates and rejects conflicting transitions instead of silently overwriting them.',
          'Status o‘zgarishlari, skanlar, imzolar, fotolar va naqd qaydlar mijoz tomonidan yaratilgan id bilan lokal navbatga yoziladi. Aloqa qaytganda terminal navbatni tartib bilan yuboradi; server bu id’larni idempotent qabul qiladi, takrorlarni tashlab yuboradi va ziddiyatli o‘tishlarni jimgina ustidan yozish o‘rniga rad etadi.'
        )
      },
      {
        title: t('Cash & settlement', 'Naqd pul va hisob-kitob'),
        body: t(
          'A per-stop ledger records how much cash was collected, split by delivery type — prepaid online, prepaid at pickup point, or cash on delivery. The end-of-shift summary compares expected against collected cash, and any difference is flagged for the dispatcher before the courier is signed off.',
          'Har bir manzil bo‘yicha daftar qancha naqd yig‘ilganini yetkazish turiga qarab ajratadi — onlayn oldindan to‘langan, punktida to‘langan yoki yetkazishda naqd. Smena yakunidagi xulosa kutilgan va yig‘ilgan summani solishtiradi, farq bo‘lsa kuryer smenasi yopilishidan oldin dispetcherga ko‘rsatiladi.'
        )
      },
      {
        title: t('Telemetry & shift control', 'Telemetriya va smena nazorati'),
        body: t(
          'GPS breadcrumbs, per-stop duration, failed-delivery reasons and SLA timers stream back with the next successful sync. Dispatchers watch progress on the live fleet map and re-route an unresponsive stop within seconds instead of waiting for a phone call.',
          'GPS nuqtalari, har manzildagi davomiylik, muvaffaqiyatsiz yetkazish sabablari va SLA taymerlari keyingi muvaffaqiyatli sinxronizatsiya bilan yuboriladi. Dispetcherlar jonli flot xaritasida jarayonni kuzatadi va javob bermayotgan manzilni telefon kutmasdan bir necha soniyada qayta yo‘naltiradi.'
        )
      }
    ],
    capabilities: ['Camera scanning', 'Background geolocation', 'Operation queue', 'Signature capture', 'Haptic alerts', 'Shift reports'],
    outcome: t(
      'Couriers finish shifts in low-coverage areas, and dispatch stops chasing updates by phone.',
      'Kuryerlar qamrov past hududlarda smenani yakunlaydi, dispetcher esa yangilanishlarni telefon orqali so‘rashni to‘xtatadi.'
    )
  },
  {
    id: 'admin-dashboard',
    name: 'Operations Dashboard',
    kind: t('Admin & dispatch panel · web', 'Admin va dispetcher paneli · web'),
    tagline: t(
      'One control room for orders, inventory, fleet and finance.',
      'Buyurtmalar, ombor, flot va moliya uchun yagona boshqaruv markazi.'
    ),
    summary: t(
      'The admin panel is the operational brain of the ecosystem: the place where an order that arrives from the customer app becomes a pick list, a carrier booking, a courier route and finally a finance line. It talks to the same REST contracts as the mobile products, so a new operational screen never requires a backend fork.',
      'Admin panel — ekotizimning operatsion miyasi: mijoz ilovasidan kelgan buyurtma yig‘ish varaqasi, kuryer bron qilish, kuryer marshruti va oxir-oqibat moliya qatoriga aylanadigan joy. U mobil mahsulotlar bilan bir xil REST shartnomalari orqali ishlaydi, shuning uchun yangi operatsion ekran backend’ni tarmoqlashni talab qilmaydi.'
    ),
    platform: 'Vue 3 · REST BFF · Tailwind',
    icon: 'i-lucide-layout-dashboard',
    accent: 'cyan',
    modules: [
      {
        title: t('Order pipeline', 'Buyurtmalar oqimi'),
        body: t(
          'A kanban-style pipeline with SLA timers on every card, bulk actions, manual re-routing, cancellations and refunds with reason codes. Status changes are written to the audit trail together with the operator who made them, which turned “who changed this order?” into a single query.',
          'Har bir kartada SLA taymeri bo‘lgan kanban oqimi, ommaviy amallar, qo‘lda qayta yo‘naltirish, sabab kodlari bilan bekor qilish va qaytarish. Status o‘zgarishlari uni kim o‘zgartirgani bilan birga audit jurnaliga yoziladi — “bu buyurtmani kim o‘zgartirdi?” savoli bitta so‘rovga aylandi.'
        )
      },
      {
        title: t('Catalog & inventory', 'Katalog va ombor'),
        body: t(
          'Category tree, variants, price lists, promotions and promo codes, stock per warehouse, low-stock alerts and a media library backed by S3. Warehouse staff generate and print barcode labels straight from the pick list.',
          'Kategoriya daraxti, variantlar, narx ro‘yxatlari, aksiya va promokodlar, omborlar bo‘yicha qoldiq, kam qoldiq ogohlantirishlari va S3’ga asoslangan media kutubxonasi. Ombor xodimlari shtrix-kod yorliqlarini yig‘ish varaqasidan chiqarib chop etadi.'
        )
      },
      {
        title: t('Fleet & dispatch board', 'Flot va dispetcher paneli'),
        body: t(
          'Courier roster, shifts and territories, a live map of active couriers with their current stop, and assignment either manually in one click or automatically by zone, load and SLA pressure. Unassigned parcels are surfaced before they breach their window.',
          'Kuryerlar ro‘yxati, smenalari va hududlari, faol kuryerlarning joriy manzili bilan jonli xaritasi, tayinlash bir tugma bilan qo‘lda yoki hudud, yuklama va SLA bosimi bo‘yicha avtomatik. Tayinlanmagan posilkalar oyna buzilishidan oldin ko‘rsatiladi.'
        )
      },
      {
        title: t('Finance & reconciliation', 'Moliya va solishtirish'),
        body: t(
          'Commission and payout reports per courier, carrier invoice comparison by SLA and volume, cash reconciliation for cash-on-delivery orders, and scheduled CSV/XLSX exports for accounting. Numbers in the dashboard and the courier ledger come from the same events, so month-end no longer requires a manual match.',
          'Har bir kuryer bo‘yicha komissiya va to‘lov hisobotlari, SLA va hajm bo‘yicha kuryer hisob-fakturalarini solishtirish, naqd to‘lov buyurtmalari uchun kassa solishtiruvi hamda buxgalteriya uchun rejali CSV/XLSX eksport. Paneldagi va kuryer daftaridagi raqamlar bir xil hodisalardan olinadi — oy oxirida qo‘lda solishtirish kerak bo‘lmaydi.'
        )
      },
      {
        title: t('Roles, permissions & audit', 'Rollar, huquqlar va audit'),
        body: t(
          'Five roles — owner, operator, warehouse, dispatcher and finance — each with granular permission scopes, so warehouse staff never see payout figures and dispatchers cannot edit prices. Every privileged action lands in the audit log with actor, target and timestamp.',
          'Beshta rol — egasi, operator, ombor, dispetcher va moliya — har biri alohida huquq doirasiga ega: ombor xodimi to‘lov raqamlarini ko‘rmaydi, dispetcher narxni o‘zgartira olmaydi. Har bir muhim amal kim, nimani va qachon bajargani bilan audit jurnaliga tushadi.'
        )
      },
      {
        title: t('Analytics', 'Analitika'),
        body: t(
          'Order funnel, average delivery time by zone, cancellation and return rates, carrier SLA comparison, top categories and repeat-purchase cohorts. Reports are built by a background worker, not on the request path, so heavy aggregations never slow the panel down.',
          'Buyurtma yo‘li, hudud bo‘yicha o‘rtacha yetkazish vaqti, bekor qilish va qaytarish darajasi, kuryerlar SLA solishtiruvi, eng yaxshi kategoriyalar va takroriy xarid kohortlari. Hisobotlar so‘rov yo‘lida emas, fon ishchi jarayonida quriladi — og‘ir agregatsiyalar panelni sekinlashtirmaydi.'
        )
      }
    ],
    capabilities: ['Server-side pagination', 'Virtualized tables', 'Live fleet map', 'Bulk operations', 'Scheduled exports', 'Audit log'],
    outcome: t(
      'Orders, inventory, fleet and finance stopped living in separate spreadsheets.',
      'Buyurtmalar, ombor, flot va moliya endi alohida jadvallarda yashamaydi.'
    )
  },
  {
    id: 'backend',
    name: 'Backend Platform',
    kind: t('NestJS services · single source of truth', 'NestJS servislari · yagona haqiqat manbai'),
    tagline: t(
      'Modular services behind one gateway — the source of truth for orders, money and delivery.',
      'Bitta gateway ortidagi modul servislar — buyurtma, pul va yetkazish uchun yagona haqiqat manbai.'
    ),
    summary: t(
      'Everything the three clients do lands here. The platform is split along domain boundaries rather than technical layers: identity, catalog, pricing, cart, orders, payments, delivery, notifications, warehouse and analytics each own their data and expose a versioned contract through a single gateway.',
      'Uch klient qilgan barcha ish shu yerda yakunlanadi. Platforma texnik qatlamlar emas, domen chegaralari bo‘yicha bo‘lingan: identity, katalog, narx, savat, buyurtma, to‘lov, yetkazish, bildirishnoma, ombor va analitika — har biri o‘z ma’lumotiga ega va bitta gateway orqali versiyalangan shartnoma taqdim etadi.'
    ),
    platform: 'NestJS · Fastify · PostgreSQL · Redis',
    icon: 'i-lucide-server-cog',
    accent: 'amber',
    modules: [
      {
        title: t('State machine, not status fields', 'Status maydoni emas — holat mashinasi'),
        body: t(
          'An order is a state machine with explicit transitions, guards and reason codes. That single decision is why cancellations, refunds, split shipments and re-deliveries behave predictably instead of depending on which service wrote last.',
          'Buyurtma — aniq o‘tishlar, shartlar va sabab kodlariga ega holat mashinasi. Shu bitta qaror tufayli bekor qilish, qaytarish, bo‘lib yuborish va qayta yetkazish qaysi servis oxirgi yozganiga bog‘liq bo‘lmaydi.'
        )
      },
      {
        title: t('Idempotency wherever money moves', 'Pul harakatlanadigan joyda idempotentlik'),
        body: t(
          'Order creation, payment webhooks and refunds all accept a client idempotency key. Retries from a flaky mobile network replay safely, and a duplicated Click webhook can never credit an order twice.',
          'Buyurtma yaratish, to‘lov webhooklari va qaytarishlar mijoz idempotentlik kalitini qabul qiladi. Beqaror mobil tarmoqdan kelgan qayta urinishlar xavfsiz takrorlanadi, takroriy Click webhook bir buyurtmani ikki marta hisoblay olmaydi.'
        )
      },
      {
        title: t('Queue-driven side effects', 'Navbatga asoslangan yon ta’sirlar'),
        body: t(
          'Notification dispatch, carrier status polling, payment reconciliation and report building run as BullMQ jobs with retries and backoff. Slow third-party APIs therefore cannot slow down a checkout request.',
          'Bildirishnoma yuborish, kuryer statusini so‘rash, to‘lovni solishtirish va hisobot qurish BullMQ vazifalari sifatida qayta urinish va backoff bilan ishlaydi. Shu sabab sekin uchinchi tomon API’lari to‘lov so‘rovini sekinlashtira olmaydi.'
        )
      },
      {
        title: t('Cache, consistency and observability', 'Kesh, izchillik va kuzatuv'),
        body: t(
          'Redis serves the hot paths — catalog reads, session lookups, rate-limit counters — and is invalidated on write rather than on a timer. Every request is logged with a correlation id, per-endpoint latency is tracked, and payment or webhook failure rates raise alerts before a customer notices.',
          'Redis issiq yo‘llarni — katalog o‘qishlari, sessiya, limit hisoblagichlari — xizmat qiladi va taymer bilan emas, yozishda yangilanadi. Har bir so‘rov korrelyatsiya id bilan jurnalga tushadi, endpoint bo‘yicha kechikish kuzatiladi, to‘lov yoki webhook xatolari esa mijoz sezmasidan oldin ogohlantirish beradi.'
        )
      }
    ],
    capabilities: ['Versioned contracts', 'Correlation ids', 'Rate limiting', 'Feature flags', 'Blue-green deploys', 'Zero-downtime migrations'],
    outcome: t(
      'A fourth carrier, a new payment method or a new client app is an adapter and a contract — not a rewrite.',
      'To‘rtinchi kuryer, yangi to‘lov usuli yoki yangi klient ilovasi — qayta yozish emas, adapter va shartnoma.'
    )
  }
]

const backendServices: BackendService[] = [
  {
    name: 'API Gateway',
    icon: 'i-lucide-layers',
    role: t('Single entry point', 'Yagona kirish nuqtasi'),
    detail: t('Authentication, permission scopes, rate limiting, request signing for mobile clients and contract versioning. Aggregates read models for the admin panel so a dashboard screen is one request instead of five.', 'Autentifikatsiya, huquq doiralari, so‘rov limiti, mobil klientlar uchun imzolash va shartnoma versiyalash. Admin panel uchun o‘qish modellarini jamlaydi — panel ekrani beshta emas, bitta so‘rov bilan ochiladi.'),
    stores: ['Redis']
  },
  {
    name: 'Identity & Sessions',
    icon: 'i-lucide-key-round',
    role: t('People and access', 'Odamlar va ruxsatlar'),
    detail: t('Phone and email OTP, short-lived access tokens with rotating refresh tokens, a device registry per user, and role scopes shared by all three clients.', 'Telefon va email OTP, qisqa muddatli access token va aylanuvchi refresh token, foydalanuvchi bo‘yicha qurilmalar reyestri hamda uch klient uchun umumiy rol doiralari.'),
    stores: ['PostgreSQL', 'Redis']
  },
  {
    name: 'Catalog',
    icon: 'i-lucide-package',
    role: t('What is for sale', 'Nima sotiladi'),
    detail: t('Categories, products, variants, attributes and media, with SEO metadata per product and a faceted search index that filters by live stock.', 'Kategoriya, mahsulot, variant, xususiyat va media; har bir mahsulot uchun SEO metama’lumot hamda jonli qoldiq bo‘yicha filtrlaydigan fasetli qidiruv indeksi.'),
    stores: ['PostgreSQL', 'Redis']
  },
  {
    name: 'Pricing & Promotions',
    icon: 'i-lucide-circle-dollar-sign',
    role: t('How much it costs', 'Qancha turadi'),
    detail: t('Price lists per warehouse, scheduled campaigns, promo code rules with limits and stacking rules, and a validation endpoint the cart calls before every checkout.', 'Ombor bo‘yicha narx ro‘yxatlari, rejalashtirilgan aksiyalar, limitlar va birlashtirish qoidalari bilan promokodlar hamda savat har to‘lovdan oldin chaqiradigan tekshiruv endpointi.'),
    stores: ['PostgreSQL', 'Redis']
  },
  {
    name: 'Cart',
    icon: 'i-lucide-shopping-cart',
    role: t('Intent before order', 'Buyurtmadan oldingi niyat'),
    detail: t('Server-side cart for guests and accounts, item revalidation against live price and stock, reservation TTL while the customer is checking out, and merge on login.', 'Mehmon va akkauntlar uchun server-side savat, narx va qoldiq bo‘yicha qayta tekshiruv, to‘lov jarayonida band qilish muddati va kirishda savatlarni birlashtirish.'),
    stores: ['PostgreSQL', 'Redis']
  },
  {
    name: 'Orders',
    icon: 'i-lucide-clipboard-list',
    role: t('The transactional core', 'Tranzaksion yadro'),
    detail: t('Order state machine, split shipments, cancellation and refund flows, delivery-window promises and a full audit trail of who changed what and why.', 'Buyurtma holat mashinasi, bo‘lib yuborish, bekor qilish va qaytarish oqimlari, yetkazish oynasi va’dalari hamda kim nimani va nima uchun o‘zgartirgani bo‘yicha to‘liq audit jurnali.'),
    stores: ['PostgreSQL']
  },
  {
    name: 'Payments',
    icon: 'i-lucide-credit-card',
    role: t('Money in and back', 'Pulning kirishi va qaytishi'),
    detail: t('Click Payment integration with prepare/complete handshake, idempotent webhook reconciliation, refunds, retry policy and a cash-on-delivery ledger for the courier terminal.', 'Click Payment integratsiyasi prepare/complete bosqichi bilan, idempotent webhook solishtiruvi, qaytarishlar, qayta urinish siyosati va kuryer terminali uchun naqd to‘lov daftari.'),
    stores: ['PostgreSQL', 'BullMQ']
  },
  {
    name: 'Delivery & Routing',
    icon: 'i-lucide-route',
    role: t('How it gets there', 'U yetib borish yo‘li'),
    detail: t('A carrier abstraction layer with one adapter per provider, zone and territory rules, courier assignment, and status normalisation that turns every provider vocabulary into one internal status set.', 'Har bir provayder uchun bitta adapterdan iborat kuryer abstraksiya qatlami, hudud va zona qoidalari, kuryer tayinlash hamda har bir provayder so‘z boyligini yagona ichki statuslar to‘plamiga aylantiruvchi normalizatsiya.'),
    stores: ['PostgreSQL', 'Redis']
  },
  {
    name: 'Notifications',
    icon: 'i-lucide-bell',
    role: t('Keeping everyone informed', 'Hammani xabardor qilish'),
    detail: t('Push through FCM and APNs, SMS OTP for handover confirmation, templated transactional email, and per-transition message rules with retry and backoff on the queue.', 'FCM va APNs orqali push, topshirishni tasdiqlash uchun SMS OTP, shablonli tranzaksion email va navbatda qayta urinish bilan har bir o‘tish uchun xabar qoidalari.'),
    stores: ['BullMQ']
  },
  {
    name: 'Warehouse',
    icon: 'i-lucide-boxes',
    role: t('Pick, pack, label', 'Yig‘ish, qadoqlash, yorliq'),
    detail: t('Pick lists generated from paid orders, barcode label printing, stock movements between statuses, and low-stock alerts that reach the panel before a SKU runs out.', 'To‘langan buyurtmalardan hosil bo‘lgan yig‘ish varaqalari, shtrix-kod yorliq chop etish, statuslar orasidagi qoldiq harakati va SKU tugashidan oldin panelga yetib boradigan kam qoldiq ogohlantirishlari.'),
    stores: ['PostgreSQL']
  },
  {
    name: 'Courier API',
    icon: 'i-lucide-navigation',
    role: t('Field connectivity', 'Daladagi aloqa'),
    detail: t('Shift payloads, the offline batch-sync endpoint that replays a courier’s queued operations idempotently, telemetry ingestion and end-of-shift reconciliation.', 'Smena ma’lumotlari, kuryerning navbatdagi amallarini idempotent qayta yuboradigan offline batch-sync endpointi, telemetriya qabul qilish va smena yakunidagi solishtiruv.'),
    stores: ['PostgreSQL', 'Redis']
  },
  {
    name: 'Analytics & Reporting',
    icon: 'i-lucide-bar-chart-3',
    role: t('Numbers you can act on', 'Amal qilsa bo‘ladigan raqamlar'),
    detail: t('Funnel and SLA metrics materialised by background workers, carrier comparison reports, and scheduled exports that land in the finance mailbox every week.', 'Fon ishchilari tomonidan tayyorlanadigan yo‘nalish va SLA ko‘rsatkichlari, kuryerlar solishtiruv hisobotlari va har hafta moliya pochta qutisiga tushadigan rejali eksportlar.'),
    stores: ['PostgreSQL', 'BullMQ']
  }
]

const integrations: CaseIntegration[] = [
  {
    name: 'Click Payment',
    icon: 'i-lucide-credit-card',
    purpose: t('Card payments for every order, online and on delivery.', 'Har bir buyurtma uchun karta to‘lovi — onlayn va yetkazishda.'),
    notes: [
      t('Prepare/complete handshake so a paid order can never be lost between the app and the bank.', 'Prepare/complete bosqichi — to‘langan buyurtma ilova va bank o‘rtasida yo‘qolmaydi.'),
      t('Idempotent webhook reconciliation with a full payment event log.', 'To‘liq to‘lov hodisalari jurnali bilan idempotent webhook solishtiruvi.'),
      t('Refunds and retries handled by the payments service, not by the mobile client.', 'Qaytarish va qayta urinishlarni mobil klient emas, to‘lov servisi bajaradi.')
    ]
  },
  {
    name: 'Uzpost API',
    icon: 'i-lucide-package',
    purpose: t('National carrier coverage beyond the in-house fleet.', 'Ichki flotdan tashqarida milliy kuryer qamrovi.'),
    notes: [
      t('Parcel registration and label data pushed at allocation time.', 'Posilka ro‘yxatga olish va yorliq ma’lumotlari taqsimotda yuboriladi.'),
      t('Tracking events pulled and normalised into the shared status stream.', 'Kuzatuv hodisalari olib kelinadi va umumiy status oqimiga keltiriladi.'),
      t('Failures retried on the queue with backoff, never blocking the order.', 'Xatolar navbatda backoff bilan qayta uriniladi, buyurtmani bloklamaydi.')
    ]
  },
  {
    name: 'BTS Express',
    icon: 'i-lucide-truck',
    purpose: t('Second carrier for overflow volume and remote regions.', 'Ortiqcha hajm va uzoq hududlar uchun ikkinchi kuryer.'),
    notes: [
      t('Pickup requests and status polling through the same adapter interface.', 'Xuddi shu adapter interfeysi orqali olib ketish so‘rovi va status so‘rovi.'),
      t('Proof-of-delivery documents synced back to the order timeline.', 'Yetkazish isboti hujjatlari buyurtma vaqt chizig‘iga qaytariladi.'),
      t('SLA and cost compared per carrier in the dashboard.', 'Panelda kuryerlar bo‘yicha SLA va xarajat solishtiriladi.')
    ]
  },
  {
    name: 'Push & SMS',
    icon: 'i-lucide-bell',
    purpose: t('Order updates and delivery confirmation.', 'Buyurtma yangiliklari va yetkazishni tasdiqlash.'),
    notes: [
      t('FCM and APNs for status changes, promotions and re-engagement.', 'Status o‘zgarishi, aksiya va qaytarish uchun FCM va APNs.'),
      t('SMS OTP as the handover proof between courier and customer.', 'Kuryer va mijoz o‘rtasidagi topshirish isboti sifatida SMS OTP.'),
      t('Delivery results tracked per channel for support diagnostics.', 'Qo‘llab-quvvatlash diagnostikasi uchun kanal bo‘yicha yetkazish natijalari.')
    ]
  }
]

const lifecycle: LifecycleStep[] = [
  {
    title: t('Order placed', 'Buyurtma berildi'),
    body: t('The app posts a signed request with an idempotency key; the cart is revalidated against live price and stock before anything is reserved.', 'Ilova idempotentlik kaliti bilan imzolangan so‘rov yuboradi; biror narsa band qilinishidan oldin savat jonli narx va qoldiq bo‘yicha qayta tekshiriladi.'),
    icon: 'i-lucide-smartphone'
  },
  {
    title: t('Payment confirmed', 'To‘lov tasdiqlandi'),
    body: t('Click checkout completes and the webhook is reconciled idempotently. Cash-on-delivery orders skip the gateway but enter the courier ledger instead.', 'Click to‘lovi yakunlanadi va webhook idempotent solishtiriladi. Naqd to‘lov buyurtmalari gateway’ni chetlab o‘tadi, lekin kuryer daftariga tushadi.'),
    icon: 'i-lucide-credit-card'
  },
  {
    title: t('Warehouse pick & pack', 'Omborda yig‘ish va qadoqlash'),
    body: t('A pick list appears in the warehouse queue, items are barcode-scanned, packed and labelled for the allocated carrier.', 'Ombor navbatida yig‘ish varaqasi paydo bo‘ladi, mahsulotlar shtrix-kod bilan skanerlanadi, qadoqlanadi va tayinlangan kuryer uchun yorliqlanadi.'),
    icon: 'i-lucide-boxes'
  },
  {
    title: t('Carrier allocation', 'Kuryerga taqsimlash'),
    body: t('The routing service scores carriers by zone, weight, cost and SLA pressure, then books the shipment through the chosen adapter.', 'Marshrut servisi kuryerlarni hudud, vazn, xarajat va SLA bosimi bo‘yicha baholaydi, so‘ng tanlangan adapter orqali yuborishni bron qiladi.'),
    icon: 'i-lucide-route'
  },
  {
    title: t('Last-mile assignment', 'Oxirgi milya tayinlovi'),
    body: t('Dispatch assigns the parcel to a courier route, manually or automatically, and it appears on the terminal as the next stop in order.', 'Dispetcher posilkani kuryer marshrutiga qo‘lda yoki avtomatik tayinlaydi va u terminalda navbatdagi manzil sifatida ko‘rinadi.'),
    icon: 'i-lucide-truck'
  },
  {
    title: t('Live tracking', 'Jonli kuzatuv'),
    body: t('Carrier events and courier telemetry are normalised into one status stream that feeds the customer timeline and the operations board at the same time.', 'Kuryer hodisalari va kuryer telemetriyasi yagona status oqimiga keltiriladi — u bir vaqtda mijoz vaqt chizig‘ini ham, operatsion panelni ham oziqlantiradi.'),
    icon: 'i-lucide-activity'
  },
  {
    title: t('Delivery proof', 'Yetkazish isboti'),
    body: t('Scan, OTP and signature or photo are captured in the terminal and synced — in order, idempotently, even if the sync happens hours later.', 'Skan, OTP va imzo yoki foto terminalda olinadi va sinxronlanadi — tartib bilan, idempotent, sinxronizatsiya soatlar keyin bo‘lsa ham.'),
    icon: 'i-lucide-shield-check'
  },
  {
    title: t('Settlement', 'Hisob-kitob'),
    body: t('Collected cash is reconciled against the shift summary and commissions, payouts and carrier invoices are computed for the finance reports.', 'Yig‘ilgan naqd pul smena xulosasi bilan solishtiriladi, komissiya, to‘lovlar va kuryer hisob-fakturalari moliya hisobotlari uchun hisoblanadi.'),
    icon: 'i-lucide-receipt'
  }
]

const phases: CasePhase[] = [
  {
    period: t('June 2024', '2024-yil iyun'),
    title: t('Discovery & blueprint', 'Tahlil va arxitektura'),
    body: t('Domain mapping of the retail and delivery process, entity and status model, integration feasibility with payment and carrier providers, and clickable flows for the four products.', 'Savdo va yetkazish jarayonining domen xaritasi, entity va status modeli, to‘lov va kuryer provayderlari bilan integratsiya imkoniyatlari hamda to‘rt mahsulot uchun bosiladigan prototiplar.')
  },
  {
    period: t('2024 · Q3', '2024 · 3-chorak'),
    title: t('First vertical slice', 'Birinchi vertikal kesim'),
    body: t('Customer app with catalog, cart, Click checkout and order tracking, plus the core backend services and a minimal admin order list to prove the loop end to end.', 'Katalog, savat, Click to‘lov va buyurtma kuzatuvi bilan mijoz ilovasi hamda yadro backend servislari va butun zanjirni uchdan-oxirigacha isbotlash uchun minimal admin buyurtmalar ro‘yxati.')
  },
  {
    period: t('2024 · Q4', '2024 · 4-chorak'),
    title: t('Courier terminal & dispatch', 'Kuryer terminali va dispetcher'),
    body: t('Offline operation queue, scanning and proof of handover, cash ledger, live fleet map and the dispatch board in the operations dashboard.', 'Offline amallar navbati, skanerlash va topshirish isboti, naqd daftar, jonli flot xaritasi va boshqaruv panelidagi dispetcher ekrani.')
  },
  {
    period: t('2025', '2025'),
    title: t('Carriers, finance & scale', 'Kuryerlar, moliya va miqyos'),
    body: t('Uzpost and BTS Express adapters, commission and payout reporting, analytics workers, caching strategy and load hardening for peak retail season.', 'Uzpost va BTS Express adapterlari, komissiya va to‘lov hisobotlari, analitika ishchilari, kesh strategiyasi va savdo mavsumidagi yuklamaga chidamlilik.')
  },
  {
    period: t('2026', '2026'),
    title: t('Release train', 'Doimiy reliz oqimi'),
    body: t('Trunk-based delivery with feature flags, additional payment methods, marketplace onboarding for partner stores and a second-language expansion of the storefront.', 'Feature flag bilan trunk-based yetkazib berish, qo‘shimcha to‘lov usullari, hamkor do‘konlar uchun marketpleys integratsiyasi va vitrinaning ikkinchi tilga kengayishi.')
  }
]

const principles: LocalizedText[] = [
  t('Carrier abstraction: adding a provider is a new adapter behind an existing interface, never a rewrite of the order flow.', 'Kuryer abstraksiyasi: yangi provayder — mavjud interfeys ortidagi yangi adapter, buyurtma oqimini qayta yozish emas.'),
  t('Idempotency wherever money moves — order creation, payment webhooks and refunds all accept a replay-safe key.', 'Pul harakatlanadigan joyda idempotentlik — buyurtma, to‘lov webhooklari va qaytarishlar xavfsiz takrorlanadigan kalit qabul qiladi.'),
  t('Offline-first for the field: operational data is queued on the device and replayed idempotently when the network returns.', 'Dala uchun offline-first: operatsion ma’lumot qurilmada navbatga yoziladi va tarmoq qaytganda idempotent yuboriladi.'),
  t('One design-token layer across app, terminal and dashboard, so the ecosystem feels like one product.', 'Ilova, terminal va panel uchun yagona dizayn-token qatlami — ekotizim bitta mahsulotdek tuyuladi.'),
  t('Background workers for anything slow: reports, polling and notifications never block a customer request.', 'Sekin ishlarning barchasi fon ishchilarida: hisobot, so‘rov va bildirishnomalar mijoz so‘rovini bloklamaydi.'),
  t('Observability from day one: correlation ids, per-endpoint latency and alerting on payment failures.', 'Birinchi kundan kuzatuv: korrelyatsiya id, endpoint kechikishi va to‘lov xatolariga ogohlantirish.')
]

const caseStack = [
  'Vue 3',
  'Capacitor',
  'TypeScript',
  'Tailwind CSS',
  'NestJS',
  'Fastify',
  'Node.js',
  'PostgreSQL',
  'Redis',
  'BullMQ',
  'S3',
  'Docker',
  'Nginx',
  'Hetzner',
  'Cloudflare',
  'GitHub Actions',
  'Click Payment',
  'Uzpost API',
  'BTS Express'
]

/**
 * Full ConnectMobile case study: the four client products, the service catalog
 * behind them, third-party integrations, the order lifecycle and the delivery
 * phases. All copy is bilingual (EN / UZ).
 */
export function useCaseStudy() {
  return {
    slug: 'connectmobile',
    name: 'ConnectMobile',
    path: '/work/connectmobile',
    liveUrl: 'https://connectmobile.uz',
    domain: 'connectmobile.uz',
    period: t('June 2024 — present', '2024-yil iyundan — hozirgacha'),
    tagline: t(
      'All-in-One E-Commerce & Delivery Ecosystem',
      'E-tijorat va yetkazish uchun yagona ekotizim'
    ),
    summary: t(
      'A retail logistics loop built as one product family: a customer app, a courier terminal, an operations dashboard and the backend platform that keeps them honest. The same order moves from storefront tap to payment, warehouse, carrier, courier and settlement without leaving the system or being retyped by a human.',
      'Bitta mahsulot oilasi sifatida qurilgan savdo-logistika zanjiri: mijoz ilovasi, kuryer terminali, boshqaruv paneli va ularni bir holatda ushlab turuvchi backend platforma. Bitta buyurtma vitrinadagi bosishdan to‘lov, ombor, kuryer va hisob-kitobgacha tizimdan chiqmasdan va qo‘lda qayta kiritilmasdan o‘tadi.'
    ),
    metrics: caseMetrics,
    products: caseProducts,
    services: backendServices,
    integrations,
    lifecycle,
    phases,
    principles,
    stack: caseStack
  }
}
