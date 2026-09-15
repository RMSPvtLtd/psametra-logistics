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

**Specific motion exception authorized by Saad on 2026-09-15:** Use the page-transition motion from `https://psametra-website.vercel.app/` after the truck film reaches its grille/mark close-up: the Psametra mark rotates 90 degrees, then its upper half moves up and lower half moves down to reveal the next section. Read-only inspection of `src/components/navigation/transition-provider.tsx` and `transition.css` in the legacy repository is authorized for this effect. Recreate this local hero transition using native browser/CSS motion; the legacy repository remains untouched and its global routing/layout architecture is not needed. Preserve a static reduced-motion/mobile alternative.

## STATUS

Research/audit: **COMPLETE**.
Implementation: **BUILT AND VERIFIED; DEPLOYMENT IN PROGRESS** on `codex/logistics-experience`.
Production deployment: **AUTHORIZED by Saad on 2026-09-15, only for the new psametra-logistics project in the RMS Vercel team, after final QA.**

The application is being built from a clean slate. Both reference repositories remain read-only.

### Implementation architecture and work plan

- Next.js App Router, TypeScript, one tokenized CSS system; static/server pages with focused client components for hero, tracking, quote and portal interactions.
- Charcoal/off-white editorial grids, restrained cobalt, locally hosted open-source Inter. Approved poster paints first; the silent GOP-12 video scrubs across 260vh on capable desktops. Mobile, data-saving and reduced-motion visitors get the poster.
- `src/data/demo.ts` owns typed customers, shipments, milestones, references, documents, quotes and service content. Public tracking reveals only customer-safe fields/documents. All routes reuse the same records.
- `src/components/` contains shell and shipment presentation; `src/features/` owns interactions; `src/app/` owns the eight requested routes and metadata. No database, carrier API, authentication or external submission is implied by the demo.
- [x] Foundation: shell, tokens, shared demo data and invariant/reference tests.
- [x] Sales experience: film hero, homepage narrative, services, tracking and validated quote flow.
- [x] Software proof: attention-first platform, customer portal, quotes, documents and invoice detail.
- [x] Verification: every route at desktop/tablet/mobile sizes, interaction/error states, keyboard/reduced motion, lint/typecheck/tests/build and measured Lighthouse reports.
- Keep source assets intact. Generated QA files live in ignored `test-results/`. Review every implementation diff before commits/pushes; do not deploy.

### CONTINUATION CHECKPOINT — read before resuming

Updated 2026-09-15. This is the single plan/handoff. Continue the entire build, QA and deployment; preserve user media edits and both legacy repositories.

**Completed and verified**

- All eight routes complete: home, services, track, quote, platform, portal-demo, about, contact. Next 16.3.5 / React 19.3.0 / TypeScript / native tokenized CSS / self-hosted Inter.
- Shared fictional shipment, quote and document data; tracking results follow the URL through Back and same-route navigation. Native inquiry flow validates route/cargo/contact, supports back/review and downloads a local summary. Portal provides active/completed/search, local quote acceptance, invoice/document dialogs and downloads. Platform prioritizes exceptions and waiting work. No backend, carrier, booking, payment or email submission is implied.
- Desktop hero: 260vh native rAF video seeking, decoded final grille frame, cover, 90-degree mark rotation, upper/lower split, content reveal. Reverse scroll restores film and focus. Mobile, reduced motion, save-data and failed-video paths retain the poster and normal content flow. CSS reserves the capable desktop layout before hydration to prevent layout shift; scripting-disabled browsers retain static flow.
- Maps follow central route waypoints, including Suez/Gibraltar/English Channel for sea; nearby road routes zoom in. Geometry is schematic Natural Earth 1:110m, not navigation or GPS; narrow canals/gulfs/port approaches are simplified. Event timestamps include time and UTC. Quote ready dates follow visitor-local calendar day; timezone-boundary tests pass.
- All requested desktop/tablet/mobile route screenshots reviewed. Tablet headings fixed after visual review. Public/portal document visibility, keyboard/focus, no-overflow, error states, query navigation and reset behavior checked.
- Primary checks: lint, typecheck and production build pass; 16 tests pass (including portal/tracking browser regressions); production browser script passes 34/34, zero unexpected browser errors. Extended axe WCAG 2/2.1 A/AA scan passes 20/20 page/viewport combinations after muted-text/count contrast corrections.
- Lighthouse 13 / Chrome 153, local production URL: desktop Performance 100, Accessibility 100, Best Practices 100, SEO 66, LCP 0.7s, CLS 0; mobile Performance 92, Accessibility 100, Best Practices 100, SEO 66, LCP 3.4s, CLS 0. SEO is reduced by intentional demo noindex/robots policy. These are lab runs, not field/Core Web Vitals or 60fps claims. Valid JSON/HTML reports exist despite a Windows Chrome temporary-profile cleanup EPERM causing CLI exit 1 AFTER report generation; runtimeError is null in both valid reports. Later changes only darkened muted text and added the Vercel production URL metadata fallback.
- Runtime video SHA-256 matches the approved 1080p GOP-12 source exactly. User-approved replacement masters/sources are preserved in reference/; previous reference sources remain in Git history.

**Git and deployment checkpoint**

- Branch: codex/logistics-experience. Base main: 932e435. Initial handoff docs: 4c26de4. Reviewed implementation is ready to commit/push; check git log/status for latest commit before resuming.
- DEPLOYMENT AUTHORIZED by Saad on 2026-09-15: 'make sure to deploy on vercell too using rms at the end'. Target only new psametra-logistics in RMS team rmspvtltdsoftware-4375s-projects / team_K7mVodqcY51jB9vLxTygtBRm. Existing corporate project psametra-website / prj_uegLEQdah5M3SMVjidjqqoPChpeK remains untouched.
- No deployment yet at this snapshot. Initial targetless MCP deployment call was rejected by automatic review due to wrong-project risk; a later explicitly scoped call reached schema validation. Official Vercel MCP docs confirm direct file deployment supports name, target, teamId, files [{file,data,encoding}] and projectSettings. Authenticated connector can deploy; Vercel CLI 59.17.0 is available via npx but is logged out.
- Next: commit reviewed files and push branch, prepare exact src/public/package/config file payload, deploy through authenticated Vercel connector with explicit name psametra-logistics, teamId above and production target. Do not deploy corporate project. test-results/prepare-deploy.mjs builds an ignored payload for the current files; regenerate after any code edit. It excludes reference masters, tests, docs and QA output. .vercelignore also records exclusions for future CLI use.
- Metadata uses SITE_URL if configured, otherwise VERCEL_PROJECT_PRODUCTION_URL, otherwise local fallback. Verify live OpenGraph host after deployment; use assigned logistics URL, never invent one. Keep noindex for the demo.
- After deployment: verify status READY, all live routes/media, tracking/quote/portal workflows and console errors, record actual URL/deployment ID/commit here, commit/push final handoff. Real-device motion review by Saad remains the only subjective acceptance step; do not claim measured frame rate.

**Commands and environment**

- npm ci; npm run dev (127.0.0.1:3000); npm run build; npm run start -- --port 3001.
- npm run lint; npm run typecheck; npm test. Include browser regression tests with PowerShell $env:PORTAL_TEST_URL='http://127.0.0.1:3001'; npm test.
- $env:BASE_URL='http://127.0.0.1:3001'; npm run test:browser; node scripts/accessibility-check.mjs. Browser QA files/reports live in ignored test-results/. Chrome path override: CHROME_PATH.
- Node 24.15.0 / npm 11.12.1. Chrome: C:\Program Files\Google\Chrome\Application\chrome.exe. Lighthouse command: node node_modules/lighthouse/cli/index.js URL --preset=desktop --chrome-flags='--headless' --output=json --output=html --output-path=./test-results/lighthouse-desktop --only-categories=performance,accessibility,best-practices,seo --quiet. Omit preset for mobile. Set CHROME_PATH first.
- Local server processes can end on new user messages: verify/restart before tests. Chrome Lighthouse needs approved escalation because sandbox GPU launch fails. Git writes/network also need approved escalation. Do not confuse environment errors with application defects.

**Asset and factual evidence**

- Approved hero media now comes from the user's free TensorPix web workflow. `reference/hero/psametra-logistics-hero-master-4k.mp4`: 3840x2160, H.264 + AAC, 24fps, 10.0s, 17,586,188 bytes, SHA-256 `0D6A9F37186A7A1BDE1662D12A59668FE2A93846906953816D1251BF8ECCFB89`, 1 video keyframe. `reference/hero/psametra-logistics-hero-web-1080p.mp4`: 1920x1080, H.264 + AAC, 24fps, 10.0s, 6,871,038 bytes, SHA-256 `6A1352A63FA4A46AA1BD85B9E44348609E66C557A17C40B684ADCDEF7F3D4EEA`, 1 video keyframe. `reference/hero/psametra-logistics-hero-web-1080p-g12.mp4`: browser-processed delivery derivative, 1920x1080, H.264, 24fps, 10.0s, 5,911,091 bytes, SHA-256 `1F2ABF4A90B31FA741C2DFB8419CA1904ACA1A5C3C5A02FBAF9586B16010B2A2`, **20 video keyframes** at 0.5-second intervals, no audio stream.
- `public/media/freight-film.mp4` is byte-identical to the verified `psametra-logistics-hero-web-1080p-g12.mp4` derivative and is the current runtime file. The derivative was created through the free browser-based ffmpeg-webCLI workflow, not by local transcoding. The 4K master and original TensorPix 1080p source remain preserved as references; the runtime derivative removes audio and adds dense GOP-12 keyframes for scroll seeking.
- Air photo: nrd, https://unsplash.com/photos/white-plane-releasing-cargo-Woev36hRtIQ (Unsplash License). Sea photo: Pankaj Mishra, https://www.pexels.com/photo/cargo-containers-in-a-ship-11825325/ (Pexels free-use license). These depict freight generically, not company assets/partners.
- Map: Natural Earth public-domain 1:110m land, https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson. `scripts/prepare-map.mjs` generated the committed runtime SVG from the ignored downloaded JSON in `test-results/`. Map labels explicitly say illustrative, not real-time GPS.
- Verified actual sales contact: `rmspvtltd.software@gmail.com`; existing corporate site `https://psametra-website.vercel.app/`. Reference-only source: `E:\psametra-website\src\content\site.ts`. No invented phone/address.
- Read-only RMS inspection confirmed public-safe tracking excludes pricing, internal notes/risk reasons and account data (`air/backend/schemas/tracking.py`). Keep invoices/prices in the clearly fictional portal. No reference repository was modified.

**Known limitations at this checkpoint**

Deployment/live verification and final Git checkpoint are pending. All transactions are fictional local state. Maps are schematic; narrow waterways/port approaches use simplified geometry. Real-device motion smoothness is not measured. Follow the current checkpoint above rather than older prospective recommendations below.

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

- `psametra-logistics-hero-master-4k.mp4`: approved TensorPix master, 3840x2160, H.264 + AAC, 24fps, 10.0s, 17,586,188 bytes, **1 video keyframe**.
- `psametra-logistics-hero-web-1080p.mp4`: approved TensorPix web source, 1920x1080, H.264 + AAC, 24fps, 10.0s, 6,871,038 bytes, **1 video keyframe**.
- `psametra-logistics-hero-web-1080p-g12.mp4`: approved browser-processed delivery derivative, 1920x1080, H.264, 24fps, 10.0s, 5,911,091 bytes, **20 video keyframes** at 0.5-second intervals, no audio. This is copied byte-for-byte to `public/media/freight-film.mp4`.
- `psametra-logistics-hero-poster.jpg`: fallback/poster.

The source video visually matches the intended narrative: branded truck in a wet warehouse yard -> direct approach -> Psametra mark fills the grille/frame.

**The runtime delivery file now has dense GOP-12 keyframes.** The original TensorPix reference files still each have one keyframe, but the browser-processed 1080p runtime derivative has 20 keyframes at exact 0.5-second intervals and no audio. It is the preferred desktop scrub candidate. Verify on real desktop hardware before treating scrub performance as final; use the poster/simplified fallback if real-device seeking is still janky.

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
- current runtime 1080p GOP-12 derivative is 5,911,091 bytes (~5.6 MiB); measure real loading/seek behavior before deciding whether further compression is necessary
- runtime GOP-12 derivative contains no audio stream; preserved TensorPix reference sources still contain AAC
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
6. Do not spend premium context repeating the same competitor/site audit unless something material changed.
7. Keep `BUILD_BRIEF.md` current at meaningful milestones.
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

