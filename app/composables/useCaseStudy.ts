export interface CaseMetric {
  value: string
  label: string
}

export interface CaseProduct {
  id: string
  name: string
  kind: string
  tagline: string
  summary: string
  platform: string
  icon: string
  accent: 'indigo' | 'cyan' | 'emerald' | 'amber'
  modules: { title: string, body: string }[]
  capabilities: string[]
  outcome: string
}

export interface BackendService {
  name: string
  icon: string
  role: string
  detail: string
  stores: string[]
}

export interface CaseIntegration {
  name: string
  icon: string
  purpose: string
  notes: string[]
}

export interface CasePhase {
  period: string
  title: string
  body: string
}

export interface LifecycleStep {
  title: string
  body: string
  icon: string
}

const caseMetrics: CaseMetric[] = [
  { value: '4', label: 'Ishga tushirilgan mahsulot' },
  { value: '2', label: 'Ilova do‘koni' },
  { value: '10k+', label: 'Yuklab olishlar' },
  { value: '12', label: 'Backend servis' },
  { value: '3+', label: 'Kuryer integratsiyasi' },
  { value: '1', label: 'Umumiy kod bazasi' }
]

const caseProducts: CaseProduct[] = [
  {
    id: 'mobile-app',
    name: 'ConnectMobile ilovasi',
    kind: 'Mijoz ilovasi · iOS va Android',
    tagline: 'Vitrina, to‘lov va buyurtmani real vaqtda kuzatish — bitta native tuyg‘uli ilovada.',
    summary: 'Ekotizimning mijozga qaragan mahsuloti. Bitta Vue 3 + Capacitor kod bazasi App Store va Google Play’ga chiqadi va Tailwind dizayn tokenlarini kuryer terminali hamda boshqaruv paneli bilan bo‘lishadi — shu sabab butun ekotizim bitta mahsulotdek tuyuladi.',
    platform: 'Vue 3 · Capacitor · TypeScript · Tailwind',
    icon: 'i-lucide-smartphone',
    accent: 'indigo',
    modules: [
      {
        title: 'Katalog va qidiruv',
        body: 'Kategoriya daraxti, fasetli filtrlar, omborga bog‘langan qidiruv va lazy-load galereyalar. Rasmlar S3’dan CDN orqali moslashuvchan WebP/AVIF ko‘rinishida beriladi — yuzlab SKU bor kategoriya ham o‘rtacha Android qurilmada bir zumda ochiladi. “Yaqinda ko‘rilgan” va qayta buyurtma yorliqlari takroriy xaridni ikki bosishga tushiradi.'
      },
      {
        title: 'Savat, to‘lov va yetkazish oynalari',
        body: 'Ilova qayta ishga tushganda ham yo‘qolmaydigan server-side savat, mehmon hisobini akkauntga ko‘chirish, jonli qoidalar bo‘yicha promokod tekshiruvi. To‘lov bosqichida mijoz xaritada belgilangan manzilga yetkazish yoki eng yaqin hamkor punktidan olib ketishni tanlaydi. Manzillar kitobi xaritada belgilangan nuqtalarni saqlaydi.'
      },
      {
        title: 'To‘lovlar va naqd pul',
        body: 'Click Payment to‘lovi hosted karta oqimi orqali prepare/complete bosqichlari bilan ishlaydi — aloqa uzilsa ham “to‘langan, lekin tasdiqlanmagan” buyurtma qolmaydi. Har bir tasdiq idempotent tarzda solishtiriladigan webhook sifatida keladi; qaytarish va qayta urinishlar to‘lov servisi tomonidan bajariladi. Naqd to‘lov buyurtmalari kuryer daftari uchun belgilanadi.'
      },
      {
        title: 'Buyurtma kuzatuvi va bildirishnomalar',
        body: 'Uzpost va BTS Express hodisalari hamda ichki flot ma’lumotlari bitta status oqimiga keltiriladi — mijoz yagona vaqt chizig‘ini ko‘radi: qabul qilindi, qadoqlandi, yo‘lda, kuryerga berildi, yetkazildi. Har bir o‘zgarishda push yuboriladi, faol buyurtma esa lokal kesh tufayli zaif tarmoqda ham ochiladi.'
      },
      {
        title: 'Kabinet, sharhlar va qo‘llab-quvvatlash',
        body: 'Profil va saqlangan manzillar, buyurtmalar tarixi va bir tugma bilan qayta buyurtma, sevimlilar, kameradan yuklangan fotoli sharhlar, shuningdek buyurtma konteksti biriktirilgan holda qo‘llab-quvvatlashga chiqish. Interfeys o‘zbek va rus tillarida, qorong‘i mavzuda ishlaydi.'
      }
    ],
    capabilities: ['Kamera', 'Geolokatsiya', 'Xavfsiz token saqlash', 'Push (FCM / APNs)', 'Deep link', 'Offline kesh'],
    outcome: 'Bitta kod bazasi, ikkita do‘kon sahifasi va tarmoq ishlamaganda ham ishlashda davom etadigan to‘lov oqimi.'
  },
  {
    id: 'courier-terminal',
    name: 'Kuryer terminali',
    kind: 'Oxirgi milya ish stoli · offline-first',
    tagline: 'To‘liq ish smenasi — skanerlash, topshirish isboti, naqd pul va telemetriya — barqaror tarmoqsiz ham.',
    summary: 'Kuryer mahsuloti qat’iy cheklov asosida loyihalandi: dalada aloqa ishonchsiz. Har bir amal avval qurilmadagi amallar navbatiga yoziladi va tarmoq qaytganda API’ga yuboriladi — kuryer deyarli offline sharoitda butun smenani yakunlab, kun oxirida serverda izchil holat qoldiradi.',
    platform: 'Vue 3 · Capacitor · Fon sinxronizatsiyasi',
    icon: 'i-lucide-truck',
    accent: 'emerald',
    modules: [
      {
        title: 'Kunning marshruti',
        body: 'Yetkazish oynalari, har bir manzildagi posilka soni, manzil tafsilotlari va navigatsiyaga bir tugma bilan o‘tish imkoniyati. Terminal keyingi manzilni oyna va masofa bo‘yicha taklif qiladi hamda SLA buzilish xavfi bor manzillarni ajratib ko‘rsatadi.'
      },
      {
        title: 'Topshirishni tasdiqlash',
        body: 'Posilka yorlig‘i kameradan QR yoki shtrix-kod sifatida skanerlanadi, mijozga OTP yuboriladi va ekranda tasdiqlanadi, uyda topilmagan yetkazishlarda esa foto va imzo olinadi. Isbot zanjiri to‘liq bo‘lmasa, buyurtma yetkazilgan deb belgilanmaydi — shu bilan ilgari telefon orqali hal qilinadigan nizolar yo‘qoldi.'
      },
      {
        title: 'Offline amallar navbati',
        body: 'Status o‘zgarishlari, skanlar, imzolar, fotolar va naqd qaydlar mijoz tomonidan yaratilgan id bilan lokal navbatga yoziladi. Aloqa qaytganda terminal navbatni tartib bilan yuboradi; server bu id’larni idempotent qabul qiladi, takrorlarni tashlab yuboradi va ziddiyatli o‘tishlarni jimgina ustidan yozish o‘rniga rad etadi.'
      },
      {
        title: 'Naqd pul va hisob-kitob',
        body: 'Har bir manzil bo‘yicha daftar qancha naqd yig‘ilganini yetkazish turiga qarab ajratadi — onlayn oldindan to‘langan, punktida to‘langan yoki yetkazishda naqd. Smena yakunidagi xulosa kutilgan va yig‘ilgan summani solishtiradi, farq bo‘lsa kuryer smenasi yopilishidan oldin dispetcherga ko‘rsatiladi.'
      },
      {
        title: 'Telemetriya va smena nazorati',
        body: 'GPS nuqtalari, har manzildagi davomiylik, muvaffaqiyatsiz yetkazish sabablari va SLA taymerlari keyingi muvaffaqiyatli sinxronizatsiya bilan yuboriladi. Dispetcherlar jonli flot xaritasida jarayonni kuzatadi va javob bermayotgan manzilni telefon kutmasdan bir necha soniyada qayta yo‘naltiradi.'
      }
    ],
    capabilities: ['Kamera skaneri', 'Fon geolokatsiyasi', 'Amallar navbati', 'Imzo olish', 'Haptik ogohlantirish', 'Smena hisobotlari'],
    outcome: 'Kuryerlar qamrov past hududlarda smenani yakunlaydi, dispetcher esa yangilanishlarni telefon orqali so‘rashni to‘xtatadi.'
  },
  {
    id: 'admin-dashboard',
    name: 'Boshqaruv paneli',
    kind: 'Admin va dispetcher paneli · web',
    tagline: 'Buyurtmalar, ombor, flot va moliya uchun yagona boshqaruv markazi.',
    summary: 'Admin panel — ekotizimning operatsion miyasi: mijoz ilovasidan kelgan buyurtma yig‘ish varaqasi, kuryer bron qilish, kuryer marshruti va oxir-oqibat moliya qatoriga aylanadigan joy. Interfeys Ant Design komponentlari ustiga qurilgan — jadval, filtr va forma kabi og‘ir ekranlar tez yig‘iladi. U mobil mahsulotlar bilan bir xil REST shartnomalari orqali ishlaydi, shuning uchun yangi operatsion ekran backend’ni tarmoqlashni talab qilmaydi.',
    platform: 'Vue 3 · Ant Design · Tailwind · REST BFF',
    icon: 'i-lucide-layout-dashboard',
    accent: 'cyan',
    modules: [
      {
        title: 'Buyurtmalar oqimi',
        body: 'Har bir kartada SLA taymeri bo‘lgan kanban oqimi, ommaviy amallar, qo‘lda qayta yo‘naltirish, sabab kodlari bilan bekor qilish va qaytarish. Status o‘zgarishlari uni kim o‘zgartirgani bilan birga audit jurnaliga yoziladi — “bu buyurtmani kim o‘zgartirdi?” savoli bitta so‘rovga aylandi.'
      },
      {
        title: 'Katalog va ombor',
        body: 'Kategoriya daraxti, variantlar, narx ro‘yxatlari, aksiya va promokodlar, omborlar bo‘yicha qoldiq, kam qoldiq ogohlantirishlari va S3’ga asoslangan media kutubxonasi. Ombor xodimlari shtrix-kod yorliqlarini yig‘ish varaqasidan chiqarib chop etadi.'
      },
      {
        title: 'Flot va dispetcher paneli',
        body: 'Kuryerlar ro‘yxati, smenalari va hududlari, faol kuryerlarning joriy manzili bilan jonli xaritasi, tayinlash bir tugma bilan qo‘lda yoki hudud, yuklama va SLA bosimi bo‘yicha avtomatik. Tayinlanmagan posilkalar oyna buzilishidan oldin ko‘rsatiladi.'
      },
      {
        title: 'Moliya va solishtirish',
        body: 'Har bir kuryer bo‘yicha komissiya va to‘lov hisobotlari, SLA va hajm bo‘yicha kuryer hisob-fakturalarini solishtirish, naqd to‘lov buyurtmalari uchun kassa solishtiruvi hamda buxgalteriya uchun rejali CSV/XLSX eksport. Paneldagi va kuryer daftaridagi raqamlar bir xil hodisalardan olinadi — oy oxirida qo‘lda solishtirish kerak bo‘lmaydi.'
      },
      {
        title: 'Rollar, huquqlar va audit',
        body: 'Beshta rol — egasi, operator, ombor, dispetcher va moliya — har biri alohida huquq doirasiga ega: ombor xodimi to‘lov raqamlarini ko‘rmaydi, dispetcher narxni o‘zgartira olmaydi. Har bir muhim amal kim, nimani va qachon bajargani bilan audit jurnaliga tushadi.'
      },
      {
        title: 'Analitika',
        body: 'Buyurtma yo‘li, hudud bo‘yicha o‘rtacha yetkazish vaqti, bekor qilish va qaytarish darajasi, kuryerlar SLA solishtiruvi, eng yaxshi kategoriyalar va takroriy xarid kohortlari. Hisobotlar so‘rov yo‘lida emas, fon ishchi jarayonida quriladi — og‘ir agregatsiyalar panelni sekinlashtirmaydi.'
      }
    ],
    capabilities: ['Server tomonda sahifalash', 'Virtualizatsiyalangan jadvallar', 'Jonli flot xaritasi', 'Ommaviy amallar', 'Rejali eksportlar', 'Audit jurnali'],
    outcome: 'Buyurtmalar, ombor, flot va moliya endi alohida jadvallarda yashamaydi.'
  },
  {
    id: 'backend',
    name: 'Backend platforma',
    kind: 'NestJS servislari · yagona haqiqat manbai',
    tagline: 'Bitta gateway ortidagi modul servislar — buyurtma, pul va yetkazish uchun yagona haqiqat manbai.',
    summary: 'Uch klient qilgan barcha ish shu yerda yakunlanadi. Platforma texnik qatlamlar emas, domen chegaralari bo‘yicha bo‘lingan: identity, katalog, narx, savat, buyurtma, to‘lov, yetkazish, bildirishnoma, ombor va analitika — har biri o‘z MongoDB ma’lumotiga ega va Fastify ustidagi bitta gateway orqali versiyalangan shartnoma taqdim etadi.',
    platform: 'NestJS · Fastify · MongoDB · Redis',
    icon: 'i-lucide-server-cog',
    accent: 'amber',
    modules: [
      {
        title: 'Status maydoni emas — holat mashinasi',
        body: 'Buyurtma — aniq o‘tishlar, shartlar va sabab kodlariga ega holat mashinasi. Shu bitta qaror tufayli bekor qilish, qaytarish, bo‘lib yuborish va qayta yetkazish qaysi servis oxirgi yozganiga bog‘liq bo‘lmaydi.'
      },
      {
        title: 'Pul harakatlanadigan joyda idempotentlik',
        body: 'Buyurtma yaratish, to‘lov webhooklari va qaytarishlar mijoz idempotentlik kalitini qabul qiladi. Beqaror mobil tarmoqdan kelgan qayta urinishlar xavfsiz takrorlanadi, takroriy Click webhook bir buyurtmani ikki marta hisoblay olmaydi.'
      },
      {
        title: 'MongoDB ustida tranzaksion yozuv',
        body: 'Pul va qoldiq bilan bog‘liq yozuvlar bitta hujjatga jamlanadi yoki replica set tranzaksiyasida bajariladi, muhim maydonlar uchun unikal indekslar takroriy buyurtma va to‘lovni bazaning o‘zida to‘xtatadi. Katalog kabi tez o‘zgaradigan sxemalar esa hujjatli modeldan yutadi — yangi xususiyat migratsiyasiz qo‘shiladi.'
      },
      {
        title: 'Navbatga asoslangan yon ta’sirlar',
        body: 'Bildirishnoma yuborish, kuryer statusini so‘rash, to‘lovni solishtirish va hisobot qurish BullMQ vazifalari sifatida qayta urinish va backoff bilan ishlaydi. Shu sabab sekin uchinchi tomon API’lari to‘lov so‘rovini sekinlashtira olmaydi.'
      },
      {
        title: 'Kesh, izchillik va kuzatuv',
        body: 'Redis issiq yo‘llarni — katalog o‘qishlari, sessiya, limit hisoblagichlari — xizmat qiladi va taymer bilan emas, yozishda yangilanadi. Har bir so‘rov korrelyatsiya id bilan jurnalga tushadi, endpoint bo‘yicha kechikish kuzatiladi, to‘lov yoki webhook xatolari esa mijoz sezmasidan oldin ogohlantirish beradi.'
      }
    ],
    capabilities: ['Versiyalangan shartnomalar', 'Korrelyatsiya id', 'So‘rov limiti', 'Feature flag', 'Blue-green deploy', 'Uzilishsiz migratsiya'],
    outcome: 'To‘rtinchi kuryer, yangi to‘lov usuli yoki yangi klient ilovasi — qayta yozish emas, adapter va shartnoma.'
  }
]

const backendServices: BackendService[] = [
  {
    name: 'API Gateway',
    icon: 'i-lucide-layers',
    role: 'Yagona kirish nuqtasi',
    detail: 'Fastify ustidagi autentifikatsiya, huquq doiralari, so‘rov limiti, mobil klientlar uchun imzolash va shartnoma versiyalash. Admin panel uchun o‘qish modellarini jamlaydi — panel ekrani beshta emas, bitta so‘rov bilan ochiladi.',
    stores: ['Redis']
  },
  {
    name: 'Identity va sessiyalar',
    icon: 'i-lucide-key-round',
    role: 'Odamlar va ruxsatlar',
    detail: 'Telefon va email OTP, qisqa muddatli access token va aylanuvchi refresh token, foydalanuvchi bo‘yicha qurilmalar reyestri hamda uch klient uchun umumiy rol doiralari.',
    stores: ['MongoDB', 'Redis']
  },
  {
    name: 'Katalog',
    icon: 'i-lucide-package',
    role: 'Nima sotiladi',
    detail: 'Kategoriya, mahsulot, variant, xususiyat va media; har bir mahsulot uchun SEO metama’lumot hamda jonli qoldiq bo‘yicha filtrlaydigan fasetli qidiruv indeksi.',
    stores: ['MongoDB', 'Redis']
  },
  {
    name: 'Narx va aksiyalar',
    icon: 'i-lucide-circle-dollar-sign',
    role: 'Qancha turadi',
    detail: 'Ombor bo‘yicha narx ro‘yxatlari, rejalashtirilgan aksiyalar, limitlar va birlashtirish qoidalari bilan promokodlar hamda savat har to‘lovdan oldin chaqiradigan tekshiruv endpointi.',
    stores: ['MongoDB', 'Redis']
  },
  {
    name: 'Savat',
    icon: 'i-lucide-shopping-cart',
    role: 'Buyurtmadan oldingi niyat',
    detail: 'Mehmon va akkauntlar uchun server-side savat, narx va qoldiq bo‘yicha qayta tekshiruv, to‘lov jarayonida band qilish muddati va kirishda savatlarni birlashtirish.',
    stores: ['MongoDB', 'Redis']
  },
  {
    name: 'Buyurtmalar',
    icon: 'i-lucide-clipboard-list',
    role: 'Tranzaksion yadro',
    detail: 'Buyurtma holat mashinasi, bo‘lib yuborish, bekor qilish va qaytarish oqimlari, yetkazish oynasi va’dalari hamda kim nimani va nima uchun o‘zgartirgani bo‘yicha to‘liq audit jurnali.',
    stores: ['MongoDB']
  },
  {
    name: 'To‘lovlar',
    icon: 'i-lucide-credit-card',
    role: 'Pulning kirishi va qaytishi',
    detail: 'Click Payment integratsiyasi prepare/complete bosqichi bilan, idempotent webhook solishtiruvi, qaytarishlar, qayta urinish siyosati va kuryer terminali uchun naqd to‘lov daftari.',
    stores: ['MongoDB', 'BullMQ']
  },
  {
    name: 'Yetkazish va marshrutlash',
    icon: 'i-lucide-route',
    role: 'U yetib borish yo‘li',
    detail: 'Har bir provayder uchun bitta adapterdan iborat kuryer abstraksiya qatlami, hudud va zona qoidalari, kuryer tayinlash hamda har bir provayder so‘z boyligini yagona ichki statuslar to‘plamiga aylantiruvchi normalizatsiya.',
    stores: ['MongoDB', 'Redis']
  },
  {
    name: 'Bildirishnomalar',
    icon: 'i-lucide-bell',
    role: 'Hammani xabardor qilish',
    detail: 'FCM va APNs orqali push, topshirishni tasdiqlash uchun SMS OTP, shablonli tranzaksion email va navbatda qayta urinish bilan har bir o‘tish uchun xabar qoidalari.',
    stores: ['BullMQ']
  },
  {
    name: 'Ombor',
    icon: 'i-lucide-boxes',
    role: 'Yig‘ish, qadoqlash, yorliq',
    detail: 'To‘langan buyurtmalardan hosil bo‘lgan yig‘ish varaqalari, shtrix-kod yorliq chop etish, statuslar orasidagi qoldiq harakati va SKU tugashidan oldin panelga yetib boradigan kam qoldiq ogohlantirishlari.',
    stores: ['MongoDB']
  },
  {
    name: 'Kuryer API',
    icon: 'i-lucide-navigation',
    role: 'Daladagi aloqa',
    detail: 'Smena ma’lumotlari, kuryerning navbatdagi amallarini idempotent qayta yuboradigan offline batch-sync endpointi, telemetriya qabul qilish va smena yakunidagi solishtiruv.',
    stores: ['MongoDB', 'Redis']
  },
  {
    name: 'Analitika va hisobotlar',
    icon: 'i-lucide-bar-chart-3',
    role: 'Amal qilsa bo‘ladigan raqamlar',
    detail: 'Fon ishchilari MongoDB agregatsiya quvurlari orqali tayyorlaydigan yo‘nalish va SLA ko‘rsatkichlari, kuryerlar solishtiruv hisobotlari va har hafta moliya pochta qutisiga tushadigan rejali eksportlar.',
    stores: ['MongoDB', 'BullMQ']
  }
]

const integrations: CaseIntegration[] = [
  {
    name: 'Click Payment',
    icon: 'i-lucide-credit-card',
    purpose: 'Har bir buyurtma uchun karta to‘lovi — onlayn va yetkazishda.',
    notes: [
      'Prepare/complete bosqichi — to‘langan buyurtma ilova va bank o‘rtasida yo‘qolmaydi.',
      'To‘liq to‘lov hodisalari jurnali bilan idempotent webhook solishtiruvi.',
      'Qaytarish va qayta urinishlarni mobil klient emas, to‘lov servisi bajaradi.'
    ]
  },
  {
    name: 'Uzpost API',
    icon: 'i-lucide-package',
    purpose: 'Ichki flotdan tashqarida milliy kuryer qamrovi.',
    notes: [
      'Posilka ro‘yxatga olish va yorliq ma’lumotlari taqsimotda yuboriladi.',
      'Kuzatuv hodisalari olib kelinadi va umumiy status oqimiga keltiriladi.',
      'Xatolar navbatda backoff bilan qayta uriniladi, buyurtmani bloklamaydi.'
    ]
  },
  {
    name: 'BTS Express',
    icon: 'i-lucide-truck',
    purpose: 'Ortiqcha hajm va uzoq hududlar uchun ikkinchi kuryer.',
    notes: [
      'Xuddi shu adapter interfeysi orqali olib ketish so‘rovi va status so‘rovi.',
      'Yetkazish isboti hujjatlari buyurtma vaqt chizig‘iga qaytariladi.',
      'Panelda kuryerlar bo‘yicha SLA va xarajat solishtiriladi.'
    ]
  },
  {
    name: 'Push va SMS',
    icon: 'i-lucide-bell',
    purpose: 'Buyurtma yangiliklari va yetkazishni tasdiqlash.',
    notes: [
      'Status o‘zgarishi, aksiya va qaytarish uchun FCM va APNs.',
      'Kuryer va mijoz o‘rtasidagi topshirish isboti sifatida SMS OTP.',
      'Qo‘llab-quvvatlash diagnostikasi uchun kanal bo‘yicha yetkazish natijalari.'
    ]
  }
]

const lifecycle: LifecycleStep[] = [
  {
    title: 'Buyurtma berildi',
    body: 'Ilova idempotentlik kaliti bilan imzolangan so‘rov yuboradi; biror narsa band qilinishidan oldin savat jonli narx va qoldiq bo‘yicha qayta tekshiriladi.',
    icon: 'i-lucide-smartphone'
  },
  {
    title: 'To‘lov tasdiqlandi',
    body: 'Click to‘lovi yakunlanadi va webhook idempotent solishtiriladi. Naqd to‘lov buyurtmalari gateway’ni chetlab o‘tadi, lekin kuryer daftariga tushadi.',
    icon: 'i-lucide-credit-card'
  },
  {
    title: 'Omborda yig‘ish va qadoqlash',
    body: 'Ombor navbatida yig‘ish varaqasi paydo bo‘ladi, mahsulotlar shtrix-kod bilan skanerlanadi, qadoqlanadi va tayinlangan kuryer uchun yorliqlanadi.',
    icon: 'i-lucide-boxes'
  },
  {
    title: 'Kuryerga taqsimlash',
    body: 'Marshrut servisi kuryerlarni hudud, vazn, xarajat va SLA bosimi bo‘yicha baholaydi, so‘ng tanlangan adapter orqali yuborishni bron qiladi.',
    icon: 'i-lucide-route'
  },
  {
    title: 'Oxirgi milya tayinlovi',
    body: 'Dispetcher posilkani kuryer marshrutiga qo‘lda yoki avtomatik tayinlaydi va u terminalda navbatdagi manzil sifatida ko‘rinadi.',
    icon: 'i-lucide-truck'
  },
  {
    title: 'Jonli kuzatuv',
    body: 'Kuryer hodisalari va kuryer telemetriyasi yagona status oqimiga keltiriladi — u bir vaqtda mijoz vaqt chizig‘ini ham, operatsion panelni ham oziqlantiradi.',
    icon: 'i-lucide-activity'
  },
  {
    title: 'Yetkazish isboti',
    body: 'Skan, OTP va imzo yoki foto terminalda olinadi va sinxronlanadi — tartib bilan, idempotent, sinxronizatsiya soatlar keyin bo‘lsa ham.',
    icon: 'i-lucide-shield-check'
  },
  {
    title: 'Hisob-kitob',
    body: 'Yig‘ilgan naqd pul smena xulosasi bilan solishtiriladi, komissiya, to‘lovlar va kuryer hisob-fakturalari moliya hisobotlari uchun hisoblanadi.',
    icon: 'i-lucide-receipt'
  }
]

const phases: CasePhase[] = [
  {
    period: '2026-yil may',
    title: 'Tahlil va arxitektura',
    body: 'Savdo va yetkazish jarayonining domen xaritasi, entity va status modeli, to‘lov va kuryer provayderlari bilan integratsiya imkoniyatlari hamda to‘rt mahsulot uchun bosiladigan prototiplar.'
  },
  {
    period: '2026-yil iyun',
    title: 'Birinchi vertikal kesim',
    body: 'Katalog, savat, Click to‘lov va buyurtma kuzatuvi bilan mijoz ilovasi hamda yadro backend servislari va butun zanjirni boshidan oxirigacha isbotlash uchun minimal admin buyurtmalar ro‘yxati.'
  },
  {
    period: '2026-yil iyul',
    title: 'Kuryer terminali va dispetcher',
    body: 'Offline amallar navbati, skanerlash va topshirish isboti, naqd daftar, jonli flot xaritasi va Ant Design asosidagi boshqaruv panelidagi dispetcher ekrani.'
  },
  {
    period: '2026-yil avgust',
    title: 'Kuryerlar, moliya va miqyos',
    body: 'Uzpost va BTS Express adapterlari, komissiya va to‘lov hisobotlari, analitika ishchilari, MongoDB indeks va kesh strategiyasi hamda savdo mavsumidagi yuklamaga chidamlilik.'
  },
  {
    period: '2026-yil sentyabr',
    title: 'Doimiy reliz oqimi',
    body: 'Feature flag bilan trunk-based yetkazib berish, qo‘shimcha to‘lov usullari, hamkor do‘konlar uchun marketpleys integratsiyasi va vitrinaning ikkinchi tilga kengayishi.'
  }
]

const principles: string[] = [
  'Kuryer abstraksiyasi: yangi provayder — mavjud interfeys ortidagi yangi adapter, buyurtma oqimini qayta yozish emas.',
  'Pul harakatlanadigan joyda idempotentlik — buyurtma, to‘lov webhooklari va qaytarishlar xavfsiz takrorlanadigan kalit qabul qiladi.',
  'Dala uchun offline-first: operatsion ma’lumot qurilmada navbatga yoziladi va tarmoq qaytganda idempotent yuboriladi.',
  'Ilova, terminal va panel uchun yagona dizayn-token qatlami — ekotizim bitta mahsulotdek tuyuladi.',
  'Sekin ishlarning barchasi fon ishchilarida: hisobot, so‘rov va bildirishnomalar mijoz so‘rovini bloklamaydi.',
  'Birinchi kundan kuzatuv: korrelyatsiya id, endpoint kechikishi va to‘lov xatolariga ogohlantirish.'
]

const caseStack = [
  'Vue 3',
  'Capacitor',
  'TypeScript',
  'Tailwind CSS',
  'Ant Design',
  'NestJS',
  'Fastify',
  'Node.js',
  'MongoDB',
  'Mongoose',
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
 * phases. Copy is Uzbek only.
 */
export function useCaseStudy() {
  return {
    slug: 'connectmobile',
    name: 'ConnectMobile',
    path: '/work/connectmobile',
    liveUrl: 'https://connectmobile.uz',
    domain: 'connectmobile.uz',
    period: '2026-yil maydan — hozirgacha',
    tagline: 'E-tijorat va yetkazish uchun yagona ekotizim',
    summary: 'Bitta mahsulot oilasi sifatida qurilgan savdo-logistika zanjiri: mijoz ilovasi, kuryer terminali, boshqaruv paneli va ularni bir holatda ushlab turuvchi backend platforma. Bitta buyurtma vitrinadagi bosishdan to‘lov, ombor, kuryer va hisob-kitobgacha tizimdan chiqmasdan va qo‘lda qayta kiritilmasdan o‘tadi.',
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
