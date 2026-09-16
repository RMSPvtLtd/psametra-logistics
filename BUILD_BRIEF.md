# Psametra Logistics — build brief
Updated 2026-09-16. Single plan and handoff; read this before continuing.

## Current state
- **Initial release deployed and verified:** https://psametra-logistics.vercel.app/
- Workspace: `E:\psametra-logistics`; GitHub: `RMSPvtLtd/psametra-logistics` (private).
- Branch: `codex/logistics-experience`. Application release: `397128d1086dba871dbc682586265dd49cdcd380`; deployment handoff pushed: `ff4c4cd8c39782a460f2d38f44167bb163e0cc97`. Main remains `932e435`.
- **Premium upgrade:** persistent light/dark mode, seven reproduced defect fixes and refinements across all eight pages. Final checks passed. Saad authorized GitHub publication with “push it” on 2026-09-16. This upgrade is recorded on `codex/logistics-experience`; use its Git log for the source revision. The Vercel production release above is unchanged.
- Full latest user request is preserved verbatim at `reference/requests/premium-upgrade.md`. Original baseline detail is recoverable from Git, e.g. `git show ff4c4cd:BUILD_BRIEF.md`.
- Existing untracked `.tmp_audit_report.txt` and `.tmp_followup_report.txt` are earlier audit output; preserve them. They contain stale local failures and are excluded from deployment.

## Latest user direction — 2026-09-16
- Saad still finds the visual composition insufficiently minimal/premium and requested award-winning website research and recommendations. The completed QA above establishes functional coverage, not his aesthetic approval.
- **Preserve the two signature moments:** the truck video scroll sequence and the Psametra mark's 90-degree rotation followed by its upper/lower split. Saad explicitly named these the best features. Redesign proposals should improve the surrounding content.
- Investigated the reported occasional skipped animation: the current Codex preview measures **402px wide**, with a fine pointer and no reduced motion. Its hero correctly reports `data-scrub=false`, no video source and normal-flow layout because the existing eligibility cutoff is **1024px**. At a temporary **1440x900** viewport it activates without reloading; scrolling advanced the film to 5.045s, then its decoded end at 9.955s, then a 63-degree intermediate rotation and the 90-degree split. Returning to 402px switches it off again. Restored the original preview dimensions. This reproduces a viewport fallback, not evidence that every reported skip has the same cause. No animation code or media changed.
- Research references: [Lightship / Awwwards SOTD](https://www.awwwards.com/sites/lightship), [NITEX / Spring-Summer case study](https://springsummer.dk/nitex), [Madar / Vide Infra case study](https://videinfra.com/work/madar). NITEX separates editorial storytelling from task-focused entry points; Madar retains detailed product content behind its animated homepage. Use principles, not copied assets or invented business claims.
- Saad approved this direction with **“sure”**. **Implemented locally:** retain the cinematic opening; reduce repeated bordered panels and headings; consolidate duplicated homepage shipment previews; give air/sea/road a cohesive image treatment and quieter layout. Detailed product flows remain available. This visual revision is not committed, pushed or deployed.

### Editorial revision — local review checkpoint
- Home: a single large freight image alongside three service links; all six interactive journey steps retained with open typography and a simple selection rule; one canonical sea-shipment preview combines route/map/status/ETA/next handover/exception and links to tracking, operations and the portal. Removed superseded homepage-only CSS instead of piling overrides onto it.
- Services: simple mode navigation; consistent title, wide image and open two-column detail chapters; all service details/features, sample references and inquiry links retained. Mobile stacks cleanly; both themes use the existing tokens.
- Concurrent edits from another task appeared in home/services/footer/CSS during verification: image captions/hover, an additional dark “See the system” link section and revised conversion copy. Preserved and reviewed these additions. Saad confirmed the other task was intended to be read-only and said he would correct it. Below-fold images were restored to lazy loading; only the first service image is eager. Coordinate before further writes to this workspace.
- Found and fixed a new narrow-screen overflow in the homepage shipment heading: an inline origin/arrow/destination sequence forced the grid beyond 360px. The route now stacks vertically; fresh checks use document client width, accounting for scrollbar space.
- Fresh verification: lint, typecheck, production build and diff whitespace check passed; **13/13 unit tests, zero skips** (demo, hero phase, quote and map). CUA browser checks passed **40/40 layouts** for home/services × light/dark × 1920×1080,1440×900,1366×768,1024×768,768×1024,430×932,390×844,360×800,2560×720,1280×600: no horizontal overflow, one H1 each, no broken loaded images. All six journey buttons selected correctly and exposed their expected destination links; services sea sample opened the correct tracking reference. Desktop/mobile screenshots inspected. After the final image-loading-only adjustment, rebuilt and verified mobile fit and all three decoded service images with eager/lazy attributes as intended.
- Final hero browser check: film advanced (2.872s, then6.707s), reached9.955s before logo rotation, rotated90° and split both directions; reverse returned to film/000. Browser error/warning log was empty. Hero implementation/media unchanged; parsed hero/reveal/header/theme CSS rules matched the pushed baseline. Film hash remains the value in Media below. The existing <1024px fallback is unchanged.
- Review: primary agent inspected all diffs. The additional reviewer hit its usage limit before returning findings; do not claim an independent reviewer passed. This revision did not rerun the previous full 21-test browser suite, 40 axe scans or Lighthouse; those numbers below belong to the pushed baseline.
- Current production preview: http://127.0.0.1:3001 (server session29177 at this checkpoint; verify it is alive). Changed source: `src/app/page.tsx`, `src/app/services/page.tsx`, `src/components/footer.tsx`, `src/styles/globals.css`, `src/styles/pages.css`. No dependencies, fonts, canonical data, deep product logic or media files changed. GitHub remains7d68140; Vercel remains the initial release. Next: review this local composition with Saad, then apply any concrete feedback; do not publish without new authorization.

## Boundaries and authority
- **NEW BUILD — DO NOT MODIFY THE LEGACY PSAMETRA WEBSITE.** Modify only this workspace.
- `E:\psametra-website`, `E:\LogisticSoftware` and their repositories are read-only references. Do not replace, port or redesign the corporate site.
- Saad explicitly authorized the initial GitHub push and RMS Vercel production deployment; both are complete. On 2026-09-16 he authorized committing/pushing the reviewed premium upgrade (“push it”). This latest request covers GitHub publication; no new Vercel deployment is part of this push.
- Preserve all user media/reference assets. No casual recompression, replacement, copying of legacy architecture, or competing handoff files.
- Inspect repository `AGENTS.md` and relevant `node_modules/next/dist/docs/` guides before code changes. Review worker diffs and run checks independently.
- One explicit legacy-motion exception: after the truck film reaches the grille, rotate the Psametra mark 90°, then move its upper half up and lower half down. Read-only reference: legacy `src/components/navigation/transition-provider.tsx` and `transition.css`. This is already recreated with native CSS/browser motion.

## Product and truth rules
A logistics-first sales demo showing how Psametra can connect a freight company's public site and customer software. Preserve depth; do not turn it into a shallow landing page.
- Fictional/demo shipments, quotes, documents and actions must remain contextually labelled. No live carrier, GPS, booking, payment, email submission, authentication or database is implied.
- Public tracking presents customer-safe fields/documents; prices/invoices and internal operational context belong in the clearly fictional portal/control tower.
- Do not invent clients, testimonials, fleet/offices, freight operations, credentials, partnerships, years, volumes, performance or sustainability claims.
- Distinguish sample freight inquiry/tracking from the real commercial action: talk to Psametra about building this for a logistics business.
- Verified commercial contact: `rmspvtltd.software@gmail.com`; corporate bridge: https://psametra-website.vercel.app/. No invented phone/address.
- Keep intentional demo `noindex` and robots disallow. All transactions are local fictional state; maps are illustrative, not navigation/GPS.

## Architecture and working behavior
Next 16.3.5, React 19.3.0, TypeScript; custom tokenized CSS, self-hosted Inter, native rAF/CSS motion. No animation or UI framework required.
- `src/app/`: eight routes, metadata and static assets; server/static-first pages.
- `src/components/`: header/footer, map, shipment detail, documents and icons.
- `src/features/`: hero, journey, tracking, quote, portal, control tower.
- `src/styles/globals.css` / `pages.css`, plus `features/portal/portal.css`: one existing styling system. Read it before changing it.
- `src/data/demo.ts`: canonical typed fictional customers, shipments, quotes, documents, events and services. All views reuse these records.
- Shipment IDs: `PSX-260914-001` air Lahore→Dubai / in transit; `PSX-260907-002` sea Karachi→Rotterdam / at risk; `PSX-260910-003` road Lahore→Karachi / delivered; `PSX-260914-004` road Sialkot→Lahore / on hold.
- Tracking is URL-driven, including Back/same-route changes. Quote has four validated steps, back/review/completion/local download; dates follow the visitor's calendar. Portal has shipment search/filters/detail, quotes/acceptance, documents/invoices and activity. Platform prioritizes holds/exceptions/next actions.
- Hero: 260vh desktop scrub, decoded final frame before cover, rotation then split, reverse-scroll restoration and focus/inert management. Desktop eligibility: ≥1024px, fine pointer, no reduced motion or save-data. Poster/normal-flow fallback for mobile, reduced motion, save-data, failed video and no script. CSS reserves desktop height before hydration to avoid CLS.
- Maps use Natural Earth projection, route geometry and zoom for short routes; sea waypoints pass Suez/Gibraltar/Channel. Coastline simplification affects narrow gulfs/canal/port approaches. Milestone timestamps include UTC.
- Metadata: `SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → localhost fallback; live OG host verified. Security headers: nosniff, referrer policy, SAMEORIGIN, camera/mic/geolocation disabled.

## Premium-upgrade scope
Evolve charcoal/off-white/cobalt, technical metadata and freight imagery into stronger industrial editorial design. Preserve coherent UI and logistics-first identity. Remove weak repetitions before adding decoration.
- Typography: audit display vs operational hierarchy, widths, sizes/weights, labels, timestamps, tables and forms. Another font is optional, only if useful, licensed/self-hosted and lightweight.
- Composition: address repetitive bordered white panels; vary spacing, image crops, density, asymmetry and dark/light pacing purposefully. Avoid generic SaaS/shadcn grids, giant radii, glass, glows, purple gradients, decorative counters or text animation.
- Motion/micro-interactions: default/hover/active/focus/pressed/disabled/selected/error/success states; native CSS/Web APIs, reduced-motion first. No blanket parallax, motion library or new dependencies without a concrete need.
- Preserve the homepage story: physical freight → services → connected journey → physical/digital handoff → tracking → exceptions → customer workspace → real Psametra conversion.

### Before assessment and completed page changes
The baseline had substantial working flows, but utility pages led with oversized marketing introductions, maps dominated shipment detail, some metadata was too small, and repeated panels weakened hierarchy. The mobile/short-screen defects below were separate functional issues.

| Surface | Local upgrade delivered |
| --- | --- |
| Header / hero | Sun/moon theme control; desktop quote path; responsive navigation fixes; short-screen CTAs; fitted/centered mark before the original 90° rotation and split. |
| Home | Connected journey now pairs its six phases with canonical sea-shipment/quote/document context instead of a decorative large number. Digital preview exposes route and ETA; shared shipment preview prioritizes facts before map. |
| Services | Indexed freight imagery, mode-specific sample routes linked to tracking, alternating image/copy layouts retained; first in-view aircraft image loads eagerly. |
| Track | Smaller utility introduction; larger search label/sample touch targets; route/status/current/next/ETA grouped before or beside the map; more legible milestones and timestamps. |
| Quote | Smaller introduction, clear square progress markers, native radio choices with mode icons, larger labels/fields, local inquiry outline, shorter mobile progress header. Existing four-step validation/review/download preserved. |
| Platform | Queue rows expose real sample next actions, mode and ETA; selected detail puts exception/action before map; better queue/detail proportions and tested filters. |
| Portal | Denser rows and heading, wider search, two-column desktop summary/map, compact mobile rows, larger document/dialog controls; quotes/documents/activity preserved. |
| About | Captioned freight image and direct business-conversation CTA; factual editorial explanation retained. |
| Contact | Dedicated email action, useful conversation prompts and a distinct demo inquiry path; native mailto, no fake backend. |

Shared system: one Inter family retained; display typography separated from 11–14px operational labels, 16px mobile form inputs; existing grid and tokens extended for off-white/charcoal themes, maps, errors, status and selected states. Restrained hover/pressed/arrow feedback respects reduced motion. No dependencies, fonts or media added; original optimized film hash verified unchanged.

## Audit and execution plan — completed for this review candidate
1. **Baseline:** read source/CSS/media and latest request; preserve current diffs. Classify genuine defects separately from stale local server/build failures.
2. **Audit:** inspect all eight routes desktop/mobile plus tablet, interact with every existing flow/control. Inspect UTF-8 source for actual corruption rather than trusting terminal rendering. Record reproduced findings and evidence here.
3. **Prioritize:** fix reproduced functional/responsive/accessibility problems first, then shared type/grid/states, then page-specific composition. Keep changes reviewable; no whole-app rewrite.
4. **Upgrade locally:** preserve shared data, validation, accessibility, film and all product functions. Do not weaken tests to fit changes.
5. **Verify:** lint/typecheck/test/build; start that exact fresh production build; browser/axe checks and screenshots. Re-run Lighthouse only after visual changes stabilize.
6. **Handoff:** update this brief with actual findings, decisions, changed files, exact checks/results, remaining limitations and Git state. Final upgrade report must include before assessment, system/page changes, bug-vs-stale findings, performance/a11y impact and visual coverage. Report upgrade publication state accurately.

Required audit sizes: 1920×1080, 1440×900, 1366×768; tablet 1024 and 768; mobile 430/390/360; also ultra-wide and short laptop. Check overflow/clipping, navigation/touch targets and intermediate type sizes.
Hero checks include first paint, scrub/end-frame/reverse, crop, CTA, height changes, reduced motion/save-data/mobile/video failure. Do not claim measured 60fps or real-device smoothness from browser seeks.

## Verified baseline / QA evidence
- Fresh Vercel build passed. Live production: **34/34 browser checks**, no unexpected browser errors; **16/16 tests, zero skips**, including live portal/tracking regressions.
- The earlier local audit reported 1928px overflow at 1440, menu interception, hero seek/fallback failures, and CSS chunk MIME `text/plain` errors. Those failures did **not** reproduce against the newly built release. Stale local output/server mismatch is plausible, not yet proven as the exact cause; don't treat old screenshots as current failures.
- Previous local lint/typecheck/build passed; axe WCAG 2/2.1 A/AA **20/20 page/viewport scans**.
- Lighthouse 13 / Chrome 153 local production: desktop P100/A100/BP100/SEO66, LCP0.7s/CLS0; mobile P92/A100/BP100/SEO66, LCP3.4s/CLS0. SEO reflects intentional noindex. Lab data, not field/real-device claims. Valid reports have runtimeError null; Windows profile cleanup EPERM happened after report generation.
- QA output ignored under `test-results/`; current reports now record fresh local production at `http://127.0.0.1:3001`. `failure-*.png` may be stale; use timestamps/report provenance. Scripts: `scripts/browser-check.mjs`, `scripts/accessibility-check.mjs`.
- No API/backend is expected; don't inspect credentials or add logging/services for nonexistent integrations.

## Commands / environment
PowerShell; Node 24.15.0/npm11.12.1; installed Chrome `C:\Program Files\Google\Chrome\Application\chrome.exe`.
```powershell
npm ci
npm run lint
npm run typecheck
npm run build
npm run start -- --port 3001
# In another terminal, against that exact build:
$env:BASE_URL='http://127.0.0.1:3001'
$env:PORTAL_TEST_URL=$env:BASE_URL
npm run test:browser
npm test
node scripts/accessibility-check.mjs
```
Dev: `npm run dev` (127.0.0.1:3000). Processes may end on user messages; verify/restart. Stop only this repo's stale server; delete only verified generated output if necessary. Never mix a running stale server with a rebuilt `.next`.
Lighthouse: `node node_modules/lighthouse/cli/index.js URL --preset=desktop --chrome-flags='--headless' --output=json --output=html --output-path=./test-results/lighthouse-desktop --only-categories=performance,accessibility,best-practices,seo --quiet`; omit preset for mobile. Set `CHROME_PATH`; approved escalation may be needed for Chrome/Git/network.

## Deployment checkpoint
- RMS account: `rmspvtltdsoftware-4375`; team `rmspvtltdsoftware-4375s-projects` / `team_K7mVodqcY51jB9vLxTygtBRm`.
- **Logistics project:** `prj_VTQINeiuw7EOLltnZUmGvBkL4spB`. Verify ignored `.vercel/project.json` before future deployment.
- **Never target corporate:** `psametra-website` / `prj_uegLEQdah5M3SMVjidjqqoPChpeK`.
- Live deployment: `dpl_CCWwDERteRnuwjADcPTvUwqKgtLk`, READY/production, app source `397128d`.
- Immutable: https://psametra-logistics-oahpcbw6b-rmspvtltdsoftware-4375s-projects.vercel.app
- Inspector: https://vercel.com/rmspvtltdsoftware-4375s-projects/psametra-logistics/CCWwDERteRnuwjADcPTvUwqKgtLk
- CLI59.17.0 is authenticated. Vercel connector disappeared; CLI was the successful release route.
- Git branch is pushed, but Hobby rejects automatic linking of private organization GitHub repos (409). No plan/visibility change made. Future authorized releases: `npx --yes vercel@59.17.0 deploy --prod --yes --scope rmspvtltdsoftware-4375s-projects`.
- `.vercelignore` excludes references, tests, docs, scripts, QA and temporary audit reports. Keep `.env.local` and `.vercel/` ignored; never commit credentials.

## Media / evidence — preserve
- Runtime `public/media/freight-film.mp4` matches `reference/hero/psametra-logistics-hero-web-1080p-g12.mp4` byte-for-byte: 1920×1080 H.264,24fps,10s,5,911,091bytes,20keyframes at0.5s,no audio. SHA256 `1F2ABF4A90B31FA741C2DFB8419CA1904ACA1A5C3C5A02FBAF9586B16010B2A2`.
- Approved TensorPix references: 4K master17,586,188bytes SHA256 `0D6A9F37186A7A1BDE1662D12A59668FE2A93846906953816D1251BF8ECCFB89`; 1080p source6,871,038bytes SHA256 `6A1352A63FA4A46AA1BD85B9E44348609E66C557A17C40B684ADCDEF7F3D4EEA`. Both24fps/10s/AAC/one video keyframe. Runtime GOP-12 derivative came from approved free browser ffmpeg-webCLI workflow.
- Poster/brand assets under `public/` and `reference/`; Inter OFL retained. No new media generation needed for audit.
- Air image: nrd, https://unsplash.com/photos/white-plane-releasing-cargo-Woev36hRtIQ (Unsplash License).
- Sea image: Pankaj Mishra, https://www.pexels.com/photo/cargo-containers-in-a-ship-11825325/ (Pexels license). Images are generic freight, not company assets.
- Map: Natural Earth public-domain1:110m, https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson; generated by `scripts/prepare-map.mjs` from ignored QA JSON.
- Prior benchmarks already researched: Einride physical/software story; Flexport control tower; Kuehne+Nagel myKN quote/track/documents. Screenshots in `reference/research/`. Forto403 was not evidence; no need to repeat broad research.
- Read-only RMS audit previously found inquiry/rates/quotes/invoices/control-tower/documents/portal/public tracking flows (air413 backend tests, sea49; air frontend build). These inform design, not claims about this demo's backend.

## Current audit findings
### Completed locally
- Header sun/moon theme control: follows system initially, saves manual choice, applies before paint, survives navigation/reload, works with blocked storage. Both themes cover forms, maps, portal, status/error/selected states. No dependency added; static rendering preserved.
- Reproduced and fixed: hidden hero CTAs on short screens; mobile menu remaining open after desktop resize; unreachable landscape menu actions; cropped grille mark at 2560×720; accepted long quote origin overflowing completion; keyboard focus lost after sample quote acceptance; misleading pending-document copy.
- Hero cover now centers/fits the mark before rotation/split. Original video, frame matching and reduced-motion/fallback behavior preserved.
- Strict UTF-8 audit of 29 source files found no corruption. No blind character replacements made.
- Changed files: app layout/home/services/track/quote/about/contact pages; header and new theme-toggle; shared shipment-detail/map/document-list; hero/journey/platform/portal/quote features; globals.css/pages.css/portal.css; new experience tests, portal tests, browser/accessibility scripts; this brief and the preserved request. `package.json`, lockfile, canonical data and media are unchanged. Full exact list: `git status --short`.

### Fresh verification checkpoint
- `npm run lint`, `npm run typecheck`, `npm run build`: passed. Exact fresh production then passed **21/21 tests (zero skips)**, **35/35 browser checks**, **40/40 axe scans** (10 route/tab views × desktop/mobile × light/dark).
- Layout sweep: **160/160** (8 routes × 10 required sizes × 2 themes), zero horizontal overflow, page/console errors or CSS response failures. Evidence: `test-results/premium-audit/layout-report.json` and adjacent screenshots; exploratory runner `test-results/premium-layout-check.mjs`.
- Regression tests cover theme persistence/storage denial, landscape/resize navigation, short/ultrawide hero, long quote text and keyboard acceptance focus. Initial failing assertions reproduced the real defects before the fixes.
- Production server was started on port3001. Verify it is alive before reuse. Rebuild/restart together after further edits; never test an old server against replaced `.next` output.
- Final Lighthouse 13 / Chrome 153: desktop **P100/A100/BP100/SEO66**, LCP0.7s, CLS0, TBT0ms; mobile **P91/A100/BP100/SEO66**, LCP3.5s, CLS0, TBT20ms. Initial mobile was P92/LCP3.4s; this small single-run difference is not proof of a trend. Reports: `test-results/premium-lighthouse-{desktop,mobile}.report.{json,html}`. Both have `runtimeError:null`; CLI exit1 came from Windows temporary Chrome-profile cleanup EPERM after valid reports were written. No real-device frame-rate claim.

### Visual review and final state
- Inspected all eight routes in desktop/mobile captures and tablet snapshots, both themes across the suite; reviewed the revised home journey/digital sections, short-screen navigation/hero and 2560×720 rotating mark. Final screenshots: `test-results/premium-audit/`; browser flow captures: `test-results/`. Automated layout sizes: 1920×1080,1440×900,1366×768,1024×768,768×1024,430×932,390×844,360×800,2560×720,1280×600.
- Final local production is at http://127.0.0.1:3001 (portal preview requested in the Codex right panel). Theme button is at the header's far right, beside the menu on mobile; initial preference follows the OS and manual choice persists.
- Independent source/diff review, lint, typecheck, build and `git diff --check` passed. The browser suite now includes control-tower filtering/selected next actions and the journey's canonical sample link. The final 21 tests have zero skips.
- A light-theme homepage label contrast regression was caught during refinement, fixed by correcting selector specificity, and rechecked in the final 40/40 axe run. Do not confuse the intermediate failing report with final results.
- Windows sandbox helper later failed with account-lock error1909; approved local command escalations allowed verification to finish. Browser automation plugin could not restart; Playwright screenshots and Chrome checks completed. This is a host/tool limitation, not a website failure.

### What remains
1. No known reproduced functional defect remains in the audited flows. Any further aesthetic changes should respond to Saad's concrete feedback, not restart the build.
2. Real iOS/Safari/Android device feel and frame rate have not been measured. Chrome responsive/keyboard/axe coverage is not a claim of universal browser/device certification. Mobile lab LCP3.5s remains a performance opportunity; preserve the approved film when investigating.
3. Maps remain illustrative Natural Earth approximations; no live GPS/carrier/backend was added. SEO66 reflects intentional noindex. No fonts/dependencies were added and no precise before/after bundle-size claim is made.
4. GitHub publication of this upgrade is authorized on `codex/logistics-experience`; the initial Vercel release remains live. If a new deployment is requested, verify the reviewed Git revision and target only the logistics RMS project documented above. Hobby does not automatically deploy this private organization repository from a Git push.

**PREMIUM UPGRADE — GITHUB PUBLICATION AUTHORIZED / VERCEL UNCHANGED**
