# SoftAppDev — agency website

Marketing and case-study site for **SoftAppDev**, a product engineering studio founded in
Tashkent in April 2026, building mobile, desktop and web apps, Telegram bots and Mini Apps,
CRM/ERP systems, AI integrations and the DevOps behind them.

The site ships **in Uzbek only** and **in dark mode only** — there is no language switch and
no light theme.

Live domains: [`softappdev.uz`](https://softappdev.uz) · case study: `/work/connectmobile`

## What is in here

| Area | Where |
| --- | --- |
| Landing page (hero, portfolio, services, stack, process, company, estimate form) | `app/pages/index.vue` + `app/components/*Section.vue` |
| ConnectMobile case study page | `app/pages/work/connectmobile.vue` |
| Legal pages | `app/pages/privacy.vue`, `app/pages/terms.vue` |
| Uzbek UI dictionary | `app/composables/useLocale.ts` |
| Case study content (Uzbek) | `app/composables/useCaseStudy.ts` |
| Portfolio, tech stack and estimator data | `app/composables/useProjects.ts`, `useTechStack.ts`, `useEstimator.ts` |
| WebGL scenes | `app/components/GlobalBackdrop.vue`, `HeroBackground.vue`, `CaseStudyScene.vue` |
| WebGL lifecycle helper | `app/composables/useThreeScene.ts` |
| Icons | `app/components/AppIcon.vue` + generated `app/assets/icons.ts` |
| Lead intake endpoint | `server/api/estimate.post.ts` |

## Stack

- **Vue 3 + Nuxt 4** (SSR, file-based routing, Nitro server routes)
- **Tailwind CSS v4** with a token layer in `app/assets/css/main.css`
- **three.js** for the ambient backdrop, the hero scene and the case-study ecosystem map
- **GSAP + ScrollTrigger** for scroll choreography, **@vueuse/motion** for declarative reveals
- **@nuxtjs/seo** for metadata, OpenGraph images and JSON-LD (Organization, WebSite, SoftwareApplication)
- Self-hosted fonts through `@nuxt/fonts`, no external icon runtime

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm typecheck  # vue-tsc / nuxt typecheck
pnpm lint       # eslint
pnpm icons      # regenerate app/assets/icons.ts
pnpm build      # production build
pnpm preview    # preview the production build
```

### Environment

| Variable | Purpose | Default |
| --- | --- | --- |
| `NUXT_PUBLIC_SITE_URL` | Canonical origin used for metadata, canonical URLs and JSON-LD | `https://softappdev.uz` |
| `NUXT_OG_IMAGE_SECRET` | Stable signing secret for generated OpenGraph images on multi-instance deploys | auto-generated per build |

Leads submitted through the estimate form are validated by `server/api/estimate.post.ts`
(schema checks per step, honeypot field, per-IP rate limit) and written to the Nitro `data`
storage as `leads/<reference>.json` — `.data/kv/leads/` locally — so nothing is lost when no
email provider is configured yet. Swap the storage write for a transactional email provider
when one is chosen.

## Icons

Icons are inlined SVG, generated from the icon sets already in the workspace — no icon font,
no runtime icon module and no external sprite request:

```bash
node scripts/generate-icons.mjs
```

The script scans `app/` for `i-lucide-*` and `i-simple-icons-*` references and rewrites
`app/assets/icons.ts`. Add an icon by using it in a component, then re-run the script.

## Content editing

- **Copy and UI strings** live in `app/composables/useLocale.ts` as one flat Uzbek dictionary
  read through `t('key')`.
- **Case study content** lives in `app/composables/useCaseStudy.ts` as plain Uzbek strings.
- **Metrics, phases and integration notes** in the case study are business figures — review them
  before publishing so the published numbers match reality.

## Conventions

- No semicolons, single quotes, 2-space indentation (enforced by the Nuxt ESLint stylistic preset).
- Semantic colour utilities (`text-highlighted`, `text-muted`, `bg-accentuated`, `glass`) instead of
  raw palette classes; the tokens are defined once on `:root` in `app/assets/css/main.css`, which is
  the only theme the site ships.
- Every WebGL canvas goes through `useThreeScene`, which handles resize, offscreen pausing,
  `prefers-reduced-motion` and GPU disposal.

## License

MIT — see [LICENSE](./LICENSE).
