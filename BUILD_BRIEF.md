# PSAMETRA LOGISTICS - BUILD BRIEF

## CRITICAL PROJECT BOUNDARY

**NEW BUILD - DO NOT MODIFY THE LEGACY PSAMETRA WEBSITE.**

This repository is a completely new standalone project named **psametra-logistics**.

- GitHub: `RMSPvtLtd/psametra-logistics`
- Local workspace: `E:\psametra-logistics`
- Purpose: a premium logistics-company demo website Psametra can show to prospective logistics/freight/3PL clients as an example of what Psametra can build for their business.
- The existing Psametra corporate website at `https://psametra-website.vercel.app/` is the agency/company front door. It is NOT being redesigned, replaced, refactored, migrated, or used as the implementation base.
- The legacy repository and `E:\psametra-website` must remain untouched unless Saad explicitly opens a separate task for them.

The legacy site may be inspected only for verified Psametra information, branding, contact details, legitimate content, and reusable brand assets. Do not copy its page structure, source architecture, layout system, animation architecture, or component hierarchy into this project just because they exist.

## STATUS

Research/audit: **COMPLETE**.
Implementation: **IN PROGRESS** on `codex/logistics-experience`.
Production deployment: **DO NOT DEPLOY WITHOUT SAAD'S EXPLICIT APPROVAL**.

The application is being built from a clean slate. Both reference repositories remain read-only.

### Implementation architecture and work plan

- Next.js App Router, TypeScript, one tokenized CSS system; static/server pages with focused client components for hero, tracking, quote and portal interactions.
- Charcoal/off-white editorial grids, restrained cobalt, locally hosted open-source Inter. Approved poster paints first; the silent GOP-12 video scrubs across 220vh on capable desktops. Mobile, data-saving and reduced-motion visitors get the poster.
- `src/data/demo.ts` owns typed customers, shipments, milestones, references, documents, quotes and service content. Public tracking reveals only customer-safe fields/documents. All routes reuse the same records.
- `src/components/` contains shell and shipment presentation; `src/features/` owns interactions; `src/app/` owns the eight requested routes and metadata. No database, carrier API, authentication or external submission is implied by the demo.
- [ ] Foundation: shell, tokens, shared demo data and invariant/reference tests.
- [ ] Sales experience: film hero, homepage narrative, services, tracking and validated quote flow.
- [ ] Software proof: attention-first platform, customer portal, quotes, documents and invoice detail.
- [ ] Verification: every route at desktop/tablet/mobile sizes, interaction/error states, keyboard/reduced motion, lint/typecheck/tests/build and measured Lighthouse reports.
- Keep source assets intact. Generated QA files live in ignored `test-results/`. Review every implementation diff before commits/pushes; do not deploy.

### CONTINUATION CHECKPOINT — read before resuming

Saved on 2026-09-14 at Saad's explicit request. This is the plan and handoff; do not create competing handoff files. The full product scope and acceptance criteria are below. Continue the complete build autonomously; this checkpoint is not a declaration of completion.

**Git and environment**

- Workspace: `E:\psametra-logistics`; remote: `https://github.com/RMSPvtLtd/psametra-logistics.git`.
- Implementation branch: `codex/logistics-experience`; base `main` was clean at `932e435`.
- Node `24.15.0`, npm `11.12.1`; installed Next `16.3.5`, React `19.3.0`, TypeScript, ESLint, Playwright, Lighthouse, tsx and Inter. `package-lock.json` exists.
- Run `npm run dev` for preview. No dev server has been started at this checkpoint. Chrome exists at `C:\Program Files\Google\Chrome\Application\chrome.exe` for Playwright/Lighthouse.
- Git writes and network/npm install required sandbox escalation in this session; normal workspace file edits work. Do not mistake that for a product blocker.

**Written so far (implementation is incomplete and not yet integrated/verified)**

- Application package/config, layout, icon, robots/noindex policy, 404, header/mobile navigation, footer/conversion.
- Hero client uses approved GOP-12 silent film, poster-first rendering, native rAF seeks and desktop capability gating. Needs visual/scroll/error fallback verification.
- Shared route map, shipment detail, milestone rail, status badges; tracking search with blank/not-found/sample-reference paths; interactive six-stage journey.
- `src/data/demo.ts`: typed customers, four sample shipments, documents, quotes, services, reference resolution, UTC date and currency formatting. Featured `PSX-260914-001` is Air / Lahore → Dubai / In transit / Airborne. Keep this identical across routes.
- `src/features/quote/`: four-step inquiry, validation, review, local-only success and summary download. `QuoteForm.tsx` default export. Tests in `tests/demo.test.ts` and `tests/quote.test.ts`. Worker reported 8 tests green; primary agent has not yet independently rerun them at this checkpoint.
- `src/features/portal/Portal.tsx` named `Portal` export; portal CSS; `src/components/document-list.tsx` named `DocumentList`. Shipment/quote/document/activity tabs, active/completed filters, local sample quote acceptance, native document dialogs and sample text downloads. These have not yet had browser verification.
- `public/media/`: hero film/poster, air/sea photography, generated Natural Earth map SVG. `public/brand/`: approved logos and Inter OFL license.

**NEXT ACTIONS, in order**

1. Read actual current files/git status; other bounded workers may have finished after this saved snapshot. Preserve their work and user-added assets.
2. Finish `src/styles/globals.css` (currently MISSING): tokenized shell, hero, responsive editorial sections, tracking/map/timeline, journey and quote styles. Portal styles already live in its feature folder.
3. Implement the eight route pages (currently MISSING): `/`, `/services`, `/track`, `/quote`, `/platform`, `/portal-demo`, `/about`, `/contact`. Wire existing features. Homepage sequence is locked below. Build attention-first platform showcase from the shared shipments; do not invent metrics. Add site social preview and route metadata without claiming a deployment hostname.
4. Verify module contracts, import paths and all route links. Remove any hardcoded shipment reference in feature links in favor of the central data export where practical.
5. Start preview; visually inspect every route at desktop/tablet/mobile. Exercise tracking success/not-found/blank, quote validation/back/review/success/download, portal filters/empty states/quote acceptance/documents, navigation/keyboard focus, reduced-motion and video failure/mobile fallback. Check horizontal overflow and browser errors. Inspect the new 1080p hero source before deciding whether to use it; original dense-keyframe derivative remains current runtime choice.
6. Independently review all diffs. Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`; fix real failures. Add a runnable browser smoke script at `scripts/browser-check.mjs` (package script exists, file currently MISSING).
7. Measure Lighthouse desktop/mobile against the production build, record exact scores/limitations here, and review real screenshots. No performance/accessibility claims before measurement.
8. Update this checkpoint to final verified state, commit meaningful stable work on the feature branch and push only after review. No production deployment or Vercel change without Saad's explicit approval.

**Asset and factual evidence**

- User-pasted root `Start_frame_the_new_front_fac (2).mp4` SHA-256 matches `reference/hero/psametra-logistics-hero-source.mp4` exactly (`4032556698288DEE194EDA62F73DC08F20682959B8B9E8BBE7914E0719CC53F3`). Duplicate root upload is ignored, source preserved.
- A new `reference/hero/psametra-logistics-hero-1080p.mp4` appeared during implementation; not yet inspected. Preserve it.
- Air photo: nrd, https://unsplash.com/photos/white-plane-releasing-cargo-Woev36hRtIQ (Unsplash License). Sea photo: Pankaj Mishra, https://www.pexels.com/photo/cargo-containers-in-a-ship-11825325/ (Pexels free-use license). These depict freight generically, not company assets/partners.
- Map: Natural Earth public-domain 1:110m land, https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson. `scripts/prepare-map.mjs` generated the committed runtime SVG from the ignored downloaded JSON in `test-results/`. Map labels explicitly say illustrative, not real-time GPS.
- Verified actual sales contact: `rmspvtltd.software@gmail.com`; existing corporate site `https://psametra-website.vercel.app/`. Reference-only source: `E:\psametra-website\src\content\site.ts`. No invented phone/address.
- Read-only RMS inspection confirmed public-safe tracking excludes pricing, internal notes/risk reasons and account data (`air/backend/schemas/tracking.py`). Keep invoices/prices in the clearly fictional portal. No reference repository was modified.

**Known limitations at this checkpoint**

The application is not yet runnable because route pages and global stylesheet are still missing. No lint/typecheck/production build/browser/Lighthouse pass has been established by the primary agent. No production deployment, remote push or carrier integration has occurred. This is the expected middle of the implementation, not a finished demo.

## PRODUCT DEFINITION

The website should behave like a convincing modern logistics/freight company's public digital presence, while simultaneously demonstrating the kind of customer-facing and operational software Psametra can build for a logistics client.

It is a sales demo, not evidence that Psametra itself owns trucks, freight terminals, fleets, customs licences, warehouses, or a global forwarding network. Avoid invented factual claims.

The experience should make a prospective logistics client think:

> "Our company could look and operate like this online."

The strongest concept is **physical freight + digital control in one connected experience**.

## PRIMARY EXPERIENCE PRINCIPLES

1. **Logistics first, software second.** The visitor must immediately read this as a serious freight/logistics company website, not a generic SaaS template.
2. **Operational usefulness, not brochureware.** Quote, track, shipment visibility, documents, exceptions, and portal concepts should feel like one system.
3. **Premium industrial design.** Editorial typography, cinematic freight imagery, restrained motion, dark/neutral surfaces, precise operational UI.
4. **Truthful demo framing.** Demo data is fine. Fake achievements, client logos, testimonials, fleet counts, years in operation, coverage statistics, awards, certifications, SLAs, or "live" integrations are not.
5. **Strong conversion path.** The main actions are `Get a quote`, `Track shipment`, and `Explore the platform`/`View customer portal demo`.

## RESEARCH ALREADY COMPLETED - DO NOT REPEAT FROM ZERO

### Premium logistics references

- Einride: physical freight and software presented as one system; large editorial layouts; operational product narrative instead of generic service cards. Reference: `https://www.einride.tech/`
- Flexport: freight forwarding/control-tower positioning and the idea of a logistics platform that exists in the physical world. Reference: `https://www.flexport.com/products/flexport-platform/`
- Kuehne+Nagel myKN: quote -> book -> track -> explore/reporting; proactive alerts; central documents; integration narrative. Reference: `https://www.kuehne-nagel.com/digital-services/mykn`
- Forto was attempted during research but its target page returned a 403; do not treat unsupported Forto details as verified findings.

Local reference screenshots are under `reference/research/`.

### Psametra sources inspected

- Corporate site: reference-only for legitimate Psametra brand/contact/company data.
- Muhammad Saad portfolio: `https://muhammadsaad-portfolio.vercel.app/`
- Abdur Rafay Khan portfolio: `https://abdur-rafay-khan-portfolio.vercel.app/`

The portfolios establish team capability, but they are not logistics-client proof and should not be presented as such on the demo logistics site.

## RMS LOGISTICS SOFTWARE - VERIFIED CAPABILITY SOURCE

`E:\LogisticSoftware\sea-and-air` was audited as a real working reference product. Do not mutate that repository from this project.

Verified useful capabilities/patterns include:

- freight inquiry and quote generation
- rate-card-driven and manual quoting paths
- quote comparison and customer quote acceptance
- invoice generation/PDF/email workflow
- operations control tower
- shipment list/detail views
- route/network maps
- shipment risk/hold/priority handling
- document management
- worker queues and stage completion
- customer portal
- public air tracking
- sea container tracking
- journey timelines and milestone checklists
- customer-safe vs internal operational data boundaries

The air vertical passed **413 backend tests** in the audit. The sea vertical passed **49 tests**. The air frontend production build succeeded. These facts support using the system as an internal capability/design reference, not claiming it is part of this new public site unless Sol deliberately implements a demo version here.

## RECOMMENDED SITE MAP

Build a focused multi-route demo rather than a huge fake enterprise site:

- `/` - cinematic home
- `/services` - Air, Sea, Road, Customs/warehousing style solution categories; clearly demo content unless backed by actual client copy
- `/track` - polished shipment tracking demo
- `/quote` - multi-step freight quote/inquiry experience
- `/platform` - digital logistics platform/control-tower story
- `/portal-demo` - customer portal demo with sample shipments, milestones, documents and exceptions
- `/about` - concise demonstration-company story; no fabricated history or metrics
- `/contact` - real Psametra sales/contact bridge or clearly labelled demo enquiry route

Do not add routes merely to imitate a large freight company. Depth and polish matter more than page count.

## HOMEPAGE STRUCTURE - LOCKED DIRECTION

1. **Cinematic freight hero** - truck/warehouse sequence, strong headline, tiny supporting copy, primary quote CTA, secondary tracking CTA.
2. **Immediate utility strip** - Track shipment / Get quote / Customer portal demo.
3. **Modes / logistics solutions** - Air, Sea, Road plus supporting customs/warehousing only where the demo copy remains generic and non-factual.
4. **Connected journey** - Quote -> Book/Plan -> Move -> Track -> Handle exceptions -> Documents/Invoice.
5. **Digital platform reveal** - transition from physical freight imagery into a control-tower/dashboard composition inspired by real RMS logistics workflows.
6. **Tracking experience preview** - usable sample reference or obvious demo mode, not a fake live lookup.
7. **Visibility / exception-management proof** - route map, milestone rail, at-risk state, documents and customer-safe updates.
8. **Portal preview** - sample active/completed shipments, quotes/documents and journey detail.
9. **Conversion close** - `Build this for your logistics business` / Psametra consultation CTA can appear in the closing area or footer so the demo remains truthful.

## HERO ASSET - VERIFIED

Reference assets live in `reference/hero/`.

- `psametra-logistics-hero-source.mp4`: 1280x720, H.264 + AAC, 24fps, 10.005s, 3,110,120 bytes, **1 video keyframe**.
- `psametra-logistics-hero-scroll-g12.mp4`: 1280x720, H.264 video only, 24fps, 10.0s, 2,614,123 bytes, **20 keyframes** (GOP 12).
- `psametra-logistics-hero-poster.jpg`: fallback/poster.

The source video visually matches the intended narrative: branded truck in a wet warehouse yard -> direct approach -> Psametra mark fills the grille/frame.

**Do not use the original one-keyframe MP4 for aggressive scroll seeking.** It was specifically audited because arbitrary seeking would require much more decode work. Prefer the supplied dense-keyframe derivative for desktop scrub experiments.

Recommended implementation:

- sticky hero section around 200-260vh
- `video.currentTime` driven by normalized scroll progress inside `requestAnimationFrame`
- update only after metadata is ready; avoid pointless micro-seeks
- muted, `playsInline`, no audio track, poster fallback
- keep copy readable independently of video load
- on mobile/low-power/reduced-motion, prefer poster + limited transform/fade or simple non-scrub playback instead of forcing desktop scrubbing
- if real-device testing still shows seek jank, fall back to an image/frame sequence rather than adding animation libraries blindly

## VISUAL DIRECTION

Use **premium industrial minimalism**, not generic startup/SaaS aesthetics.

Preferred language:

- near-black / charcoal / steel / off-white foundation
- one restrained electric/cobalt blue accent if needed
- large confident grotesk typography; compact mono/technical labels for operational metadata
- full-bleed photography/video mixed with precise grid-based software UI
- sharp or modest radii; avoid a page made from endless rounded cards
- thin rules, route lines, map geometry, timestamps, shipment references and status rails as visual texture
- strong whitespace and hierarchy

Avoid:

- generic blue/purple gradients
- glassmorphism everywhere
- floating dashboard cards over every photograph
- stock icon grids
- fake 3D globes
- excessive glow
- animated cursor gimmicks
- meaningless counters/statistics
- huge walls of generic marketing copy

## COPY DIRECTION

Copy should sound operational and specific without fabricating company facts.

Useful headline territories:

- `Freight, in full view.`
- `Move with clarity.`
- `From quote to delivery, one connected journey.`
- `Every shipment. A clearer view.`
- `Physical freight. Digital control.`

Do not lock final wording until it is reviewed in the actual layout. Keep claims qualitative unless a number is genuinely sourced.

## QUOTE EXPERIENCE

The quote demo should borrow business logic concepts from the RMS logistics app without copying that app's UI wholesale.

Recommended fields/steps:

- transport mode
- origin / destination
- cargo type
- weight / volume
- pieces / dimensions when useful
- Incoterm
- ready date
- contact/company details
- optional notes

The result can be a polished `Request received / example quote workflow` rather than pretending a real carrier rate was calculated. If sample prices are displayed, label them as demo/example data.

## TRACKING EXPERIENCE

Use a shareable sample reference or demo switch. A strong result view includes:

- origin -> destination
- mode
- current milestone
- last update
- next milestone
- route/map treatment
- milestone rail/timeline
- exception/at-risk state
- shipment references
- documents where appropriate

Never expose internal notes/risk reasons in customer-facing demo views. The RMS product already follows this boundary and is a useful reference.

## DIGITAL PLATFORM / PORTAL DEMO

The strongest software proof is not a fake analytics dashboard. It is a coherent logistics workflow:

- customer sees active and completed shipments
- shipment detail shows journey status and activity
- quotes are visible and can be accepted in the concept
- documents/invoices are organized
- operations view prioritizes exceptions and waiting work
- map/network view explains movement rather than serving as decoration

Use believable sample data consistently across routes. One shipment reference should resolve to the same route/customer/status everywhere it appears.

## ENGINEERING RECOMMENDATION

Start fresh. Do not restore the deleted legacy Psametra application files.

Recommended implementation baseline for Sol:

- Next.js App Router + TypeScript
- Tailwind CSS or a small tokenized CSS layer; choose one coherent styling approach
- server-first/static-first pages where possible
- client components only for video scrub, quote form, tracking demo, portal interactions and necessary navigation state
- no Framer Motion/Three.js unless a concrete interaction cannot reasonably be achieved with CSS/Web Animations/native APIs
- optimized local assets; no runtime dependency on third-party hero media
- accessible semantic HTML, keyboard operation and visible focus
- `prefers-reduced-motion` path from day one

This is a recommendation, not permission to reuse legacy Next components. The architecture must be selected for this new site on its own merits.

## PERFORMANCE BUDGET

The cinematic hero must not make the sales demo feel slow.

Target principles:

- hero poster visible immediately
- compressed hero derivative around the current ~2.6MB is acceptable for desktop demo testing, but measure it
- no audio bytes
- avoid loading portal/dashboard code on the homepage if it can be code-split
- lazy-load below-fold heavy media/maps
- prevent layout shifts with explicit dimensions/aspect ratios
- no recurring long tasks during normal scroll
- real mobile fallback rather than assuming desktop decode performance

## CONTENT / EVIDENCE RULES

Allowed:

- Psametra brand assets copied into `reference/brand/`
- actual Psametra contact links when the page is explicitly bridging back to the agency
- generic demo freight services and sample operational data when clearly presented as part of the concept
- interaction/design patterns learned from `E:\LogisticSoftware`

Not allowed without new evidence/approval:

- named logistics clients
- claims that Psametra operates freight services
- fleet/warehouse/network size
- countries served
- years in logistics
- certifications/accreditations
- client revenue/savings/performance claims
- made-up testimonials
- invented carrier/port partnerships

## REPOSITORY RULES

1. Work only in `RMSPvtLtd/psametra-logistics` / `E:\psametra-logistics` for this project.
2. **NEW BUILD - DO NOT MODIFY THE LEGACY PSAMETRA WEBSITE.**
3. Treat `E:\psametra-website` and its GitHub repository as read-only reference sources.
4. Treat `E:\LogisticSoftware` as a read-only capability/business-flow reference unless Saad explicitly authorizes changes there.
5. Keep `reference/` as source/reference material; do not silently overwrite originals.
6. Do not spend premium context repeating the same competitor/site audit unless something material changed.`r`n7. Keep `BUILD_BRIEF.md` current at meaningful milestones.
8. Do not deploy to production or change Vercel settings without explicit approval.

## IMPLEMENTATION ORDER FOR SOL

### P0 - foundation

- choose the new visual system and type scale
- create fresh app architecture and route shell
- implement header/footer/mobile navigation
- establish content/data model for consistent demo shipments/services
- build accessibility/reduced-motion foundation

### P1 - sales-critical experience

- cinematic hero with safe fallback
- homepage narrative and utility CTAs
- tracking demo
- quote flow
- services/modes

### P2 - software proof

- platform page
- customer portal demo
- journey/timeline/map/exception states
- documents/invoice visual treatment

### P3 - polish and proof

- desktop/mobile motion refinement
- responsive audit
- keyboard/a11y pass
- Lighthouse/performance pass
- copy truth audit
- visual review with Saad

## ACCEPTANCE STANDARD

Do not call the project ready merely because it builds.

Before final handoff/deployment candidate:

- desktop and mobile layouts visually reviewed
- hero smooth on a representative desktop and has a deliberate mobile/reduced-motion fallback
- quote and tracking flows work end to end with consistent demo data
- all routes have real empty/error/demo states where relevant
- no fake factual business claims
- no horizontal overflow
- keyboard navigation and focus states work
- reduced motion works
- build/lint/type/tests pass
- Lighthouse/performance results recorded after the implementation exists
- Sol updates `BUILD_BRIEF.md` with exact completed items and remaining blockers

## FINAL INSTRUCTION TO SOL

Do not redesign Psametra's corporate site. Do not port its source into this project. Do not waste context re-auditing work already summarized here.

Build **psametra-logistics** from scratch as a premium, cinematic, operationally credible logistics-company demo that demonstrates what Psametra can deliver to a real logistics client.

**NEW BUILD - DO NOT MODIFY THE LEGACY PSAMETRA WEBSITE.**

