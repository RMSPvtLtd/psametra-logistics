# Psametra — A-Z audit, continuation checklist, and AI handoff

**Updated:** 2026-09-13, ~23:35 PKT  
**Repository:** `rmspvtltdsoftware/psametra-website`  
**Branch:** `codex/psametra-site`  
**HEAD before this handoff update:** `9b828bfc8ed69ac630875592ed3b97bcbd9c35b7`  
**Premium-upgrade implementation:** `49a5691049cb8d51fb62a303aaa84497a1c9f10f`

This is the current source-of-truth handoff for Saad and any AI continuing the Psametra site. The original detailed premium-upgrade plan and old ~6.5/10 baseline remain in Git history at `d77fefd7d71724365aa916ec9d7e74519cbd3a23` and its parents.

---

## 0. MANDATORY CONTINUATION PROTOCOL — DO NOT REPEAT FINISHED WORK

Every AI must follow this before doing anything:

1. **Read this entire HANDOFF.md first.**
2. Confirm current branch and HEAD and compare them with the hashes recorded here.
3. Work from the checklist below **item by item**.
4. Items marked **DONE** or **VERIFIED** must NOT be repeated merely to “be safe.” Re-run them only when:
   - code affecting that item changed after the recorded verification, or
   - the item explicitly requires a fresh preview/production measurement.
5. Items marked **TODO** are the remaining work. Items marked **OPTIONAL** are recommendations, not permission to implement them.
6. Items marked **BLOCKED / NEEDS SAAD** require Saad’s decision or authorization before implementation.
7. When an item is completed, change its state to **DONE** or **VERIFIED**, record the exact evidence/result and relevant commit, and remove it from the active TODO queue if appropriate.
8. If an attempted item cannot be completed, mark it **BLOCKED** and record exactly why. Do not leave ambiguous “probably done” status.
9. After a code fix, re-run only the tests/checks affected by that code plus the standard build gate; do not blindly repeat the complete 90-viewport matrix unless the change can affect global layout.
10. **Before stopping, handing off, or nearing a model/context/usage limit, update, commit, and push this HANDOFF.md.** Never leave the next AI dependent on chat history.

### User control / authorization

- Repository ownership stays with RMS.
- Do not create a new repo.
- Do not modify website code merely because this audit recommends something.
- Do not deploy production or change Vercel settings without Saad’s explicit approval.
- Documentation/handoff maintenance and pushing the handoff are authorized for continuity.
- Connected GitHub identity during the latest ChatGPT audit is `msaad9632` and has push access.

---

## 1. CURRENT REPOSITORY / DEPLOYMENT STATE

### GitHub

- Repo: `rmspvtltdsoftware/psametra-website`
- Branch: `codex/psametra-site`
- Premium implementation: `49a5691` — `Upgrade Psametra layouts, motion, founders, and contact`
- Previous audit handoff: `9b828bf` — `Audit upgraded Psametra and record latest handoff`
- No product code was changed by the A-Z audit that produced this handoff.

### Vercel

- Team: `rmspvtltdsoftware-4375s-projects`
- Team ID: `team_K7mVodqcY51jB9vLxTygtBRm`
- Project: `psametra-website`
- Project ID: `prj_uegLEQdah5M3SMVjidjqqoPChpeK`
- Production deployment: `dpl_6TmvkL75xh4tEg57nfuPbzB7qSRq`
- Production state: READY
- Production Git SHA: `698002c3faceb877faafd894a671271949bf1940`
- Public URL: `https://psametra-website.vercel.app/`

**CRITICAL:** production is still the OLD build. The premium-upgrade implementation in GitHub is NOT what the public site currently serves. The live production HTML was rechecked and still contains old content such as `hello@psametra.example`.

Do not use the current production URL to judge whether the premium upgrade is visually correct.

---

## 2. WHAT THE PREVIOUS HANDOFF SAID

The previous handoff said the premium implementation was approximately **8.4/10**, substantially improved from the old ~6.5/10 baseline. It recorded that:

- Stages 1–3 of the approved plan are largely implemented.
- Stage 4 — final performance/accessibility/release acceptance — remains incomplete.
- Build/lint/type/tests had passed.
- 90 settled responsive layout checks had passed with no horizontal document overflow.
- Production is stale and still points at the older build.
- One real release-blocking responsive-state bug was confirmed: opening the mobile menu and then resizing into desktop can leave scroll locked.
- Fresh Lighthouse, accessibility, real-device touch, reduced-motion, interrupted-navigation stress, full orbit-cycle checks, external-link verification, and final product-owner review remain pending.
- No product code should be changed without Saad’s authorization.

This A-Z audit extends that handoff rather than replacing those facts.

---

## 3. A-Z REPOSITORY AUDIT SCOPE — COMPLETED

**Status: VERIFIED — do not repeat this source inventory unless the repo changes materially.**

The latest audit inspected the repository from root through application code and deployment state, excluding only binary image bytes from line-by-line text review.

### Root/config/docs reviewed

- `.env.example`
- `.gitignore`
- `.openai/hosting.json`
- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/QA.md`
- `eslint.config.mjs`
- `next.config.ts`
- `package.json`
- `package-lock.json` inventory/version context
- `postcss.config.mjs`
- `tsconfig.json`
- `scripts/optimize-brand.mjs`
- public brand asset inventory and sizes
- GitHub branch/commit state
- Vercel team/project/deployment state

### App/routes reviewed

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/services/page.tsx`
- `src/app/work/page.tsx`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/not-found.tsx`
- `src/app/globals.css`

### Components reviewed

- `brand.tsx`
- `contact-form.tsx`
- `footer.tsx`
- `motion-observer.tsx`
- `ui.tsx`
- navigation: header, mobile menu, scroll provider, site link, theme config/toggle, transition provider/CSS
- shared sections: contact CTA, page intro, project card/visual, service diagrams

### Data/libs reviewed

- `src/content/site.ts`
- `src/lib/navigation.ts`
- `src/lib/project-brief.ts`
- `src/lib/transition-sequence.ts`

### Styling reviewed

- tokens
- base
- navigation
- home
- diagrams
- projects
- pages
- footer
- sections import index

### Tests reviewed

- navigation tests
- project brief tests
- theme bootstrap tests
- transition sequence tests

### A-Z conclusion

Architecture is disciplined and small. There is no reason to rebuild it or introduce a large framework. Editorial data is centralized, static export fits the current product, client code is restricted to actual browser interactions, contact behavior is honest, and transition/scroll ownership is substantially better than the original version.

No second critical code bug was found during static inspection beyond the already-confirmed responsive mobile-menu scroll-lock bug.

---

## 4. APPROVED PLAN IMPLEMENTATION STATUS

### VIS-01 — shared visual system / typography / palette
**DONE / VERIFIED**

- restrained monochrome palette
- limited blue accent
- larger responsive type
- stronger hierarchy
- dark/light surface choreography
- responsive container system

Do not redesign from scratch.

### VIS-02 — premium homepage hero
**DONE / VERIFIED**

- large asymmetric typography
- cropped eclipse
- faint edge glow
- immediately readable headline
- ambient drift with reduced-motion support

### VIS-03 — homepage pacing
**DONE / VERIFIED**

- dark statement
- dark capabilities
- dark work
- off-white approach section
- dark closing CTA/footer

### VIS-04 — homepage work hierarchy
**DONE / VERIFIED**

- one lead concept + two secondary previews
- not three equal cards
- honest concept labels retained

### VIS-05 — footer upgrade
**DONE / VERIFIED**

- oversized PSAMETRA wordmark
- compact navigation
- real RMS contact link in upgraded source

### MOT-01 — Lenis desktop glide
**DONE / VERIFIED IN CODE + PREVIOUS LOCAL BROWSER PASS**

- pinned Lenis `1.3.26`
- single owner
- one automatic RAF
- `lerp: 0.12`
- only fine-pointer / hover / >=768px / no reduced motion
- native touch retained

### MOT-02 — page transition architecture
**DONE / VERIFIED**

- one root transition owner
- 80ms cover
- route loading concurrent with ~220ms rotation
- reveal ~320ms
- route barrier prevents stale reveal
- browser history can interrupt transition
- reduced-motion path avoids rotation/translation-heavy choreography

### MOT-03 — progressive entrances / ambient pause
**DONE / VERIFIED**

- content visible without JS
- 16px / ~450ms reveal treatment
- intersection observer
- ambient state tracks viewport
- reduced motion cancels running entrance animation

### INT-01 — Services page
**DONE / VERIFIED**

- editorial rows
- four services retained
- code-native diagrams
- deliverables retained

### INT-02 — Work page
**DONE / VERIFIED**

- larger editorial visual studies
- explicit concept disclaimer
- challenge/direction groupings
- concept status remains honest

### INT-03 — About / founders
**DONE / VERIFIED**

- Muhammad Saad and Abdur Rafay Khan represented equally
- portfolio links present
- no invented titles/metrics/outcomes

### INT-04 — Contact
**DONE / VERIFIED IN SOURCE + PARTIAL BROWSER QA**

- real default email `rmspvtltd.software@gmail.com`
- explicit mailto draft
- local brief download
- whitespace validation
- no backend/storage/fake “sent” state

---

## 5. EXISTING VERIFICATION — DO NOT BLINDLY REPEAT

**VERIFIED at premium-upgrade checkpoint unless relevant code changes:**

- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm test`: PASS — 9 tests / 0 failures
- `npm run build`: PASS — five routes + 404 statically exported
- `npm run format:check`: PASS at recorded checkpoint
- `git diff --check`: PASS at recorded checkpoint
- 90 settled route/width/theme layout checks: PASS
- widths: 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920
- both themes in that matrix
- zero horizontal document overflow in those settled checks
- trailing-slash active nav: checked
- same-page history: checked
- cross-page hash placement: checked
- main focus after internal navigation: checked
- ordinary mobile menu Escape/focus/scroll restoration: checked
- whitespace validation: checked
- local brief download action: checked
- desktop homepage/About/founders/work visual review: completed
- mobile homepage/contact/footer visual review: completed

### Re-test rule

If only the mobile-menu resize-lock fix changes, do NOT automatically redo all 90 settled layout checks. Re-run:

- lint
- typecheck
- tests
- build
- mobile-menu open/close/resize regression
- affected widths around the breakpoint (e.g. 390/430/700/701/768)
- scroll ownership after transition/menu overlap

Run the full matrix again only if global CSS/layout/navigation structure changes materially.

---

## 6. CONFIRMED BUG QUEUE

### BUG-01 — mobile menu resize can retain scroll lock
**TODO — P0 BEFORE RELEASE / NEEDS SAAD AUTHORIZATION TO FIX**

Reproduction:

1. viewport <=700px
2. open mobile dialog
3. resize above mobile breakpoint while dialog is still open
4. `.mobile-menu` becomes hidden by CSS
5. dialog component remains mounted and the `suspend()` release may never run
6. desktop-looking page can remain scroll locked

Root cause is confirmed in `MobileMenu` + `navigation.css`:

- `suspend()` is acquired before `showModal()`
- release occurs on `close`, pathname change, or unmount
- CSS breakpoint hides the wrapper but does not unmount/close it

Recommended bounded fix:

- observe the mobile breakpoint with `matchMedia`
- when leaving mobile, explicitly close an open dialog and release the lock
- make release idempotent
- add a browser/component regression covering `open -> cross breakpoint -> unlocked`

Do not implement until Saad authorizes website code changes.

### BUG-02 — none confirmed
**VERIFIED:** static A-Z inspection found no second release-critical bug.

Do not invent additional bugs without reproduction/evidence.

---

## 7. NEW A-Z AUDIT FINDINGS / RECOMMENDATIONS

These did not all appear in the earlier handoff.

### QA-01 — browser-level regression coverage
**TODO — P1 RECOMMENDATION / NEEDS SAAD FOR IMPLEMENTATION**

Current tests are valuable but pure/unit-oriented. They cover transition ordering, URL policy, theme bootstrap, and contact formatting. They do not mount the actual dialog/viewport behavior, which is exactly why BUG-01 escaped.

Recommended:

- add a minimal Playwright or equivalent browser regression suite
- keep it small: mobile menu resize lock, transition completion, native back/forward, contact validation, reduced-motion mode
- do not create a giant brittle screenshot suite

### CI-01 — GitHub CI
**TODO — P1 RECOMMENDATION / NEEDS SAAD FOR IMPLEMENTATION**

The latest GitHub commit has no reported CI/status checks. Local checks passed, but there is no durable automated gate visible on GitHub.

Recommended lightweight workflow on push/PR:

- `npm ci`
- lint
- typecheck
- tests
- build

If browser tests are later added, run the small critical suite after the build gate.

### SEO-01 — canonical / metadata base / share completeness
**TODO — P1 RECOMMENDATION**

Current root metadata has title, description, and basic Open Graph fields, and pages have titles/descriptions. The repository does not currently provide a complete public-share/SEO layer.

Consider after the final domain is known:

- `metadataBase`
- canonical URLs
- Twitter metadata
- a purpose-built OG/social image
- consistent per-page share metadata where useful

Do not hard-code a temporary Vercel URL as the permanent canonical if Psametra will use a custom domain.

### SEO-02 — robots / sitemap / structured organization data
**TODO — P1 RECOMMENDATION**

No `robots.ts`/`robots.txt` or `sitemap.ts`/`sitemap.xml` is present in the current tree. Consider:

- robots
- sitemap for the five public routes
- Organization/ProfessionalService-style structured data only with factual, approved company information

Do not invent address, awards, clients, ratings, founding dates, or other schema facts.

### BRAND-01 — generated app icon is not square
**TODO — P2 RECOMMENDATION**

`scripts/optimize-brand.mjs` resizes the supplied dark logo to width 192 while preserving its original aspect ratio. The resulting `src/app/icon.png` is therefore approximately 192×128 rather than a conventional square app/favicon asset.

Recommended:

- create a deliberate square icon treatment while preserving the approved mark/artwork
- optionally add an Apple touch icon
- visually verify it at very small sizes

Do not crop/redraw the logo without Saad’s approval.

### PERF-01 — brand images are always `priority`
**TODO — P2 PERFORMANCE POLISH**

`Brand()` renders both light/dark WebPs with `priority`, and the component is used in both header and footer. The assets are already small (~16.9KB dark WebP and ~26.7KB light WebP), so this is not a serious problem, but the footer does not need LCP priority and both theme variants do not necessarily need eager treatment.

Recommended only if fresh Lighthouse/trace shows value:

- allow `Brand` to accept a priority/eager prop
- header may remain priority
- footer should be normal/lazy
- avoid changing the visual/logo assets just for micro-optimization

### PERF-02 — keep current dependency discipline
**VERIFIED / DO NOT CHANGE WITHOUT EVIDENCE**

- no Framer Motion
- no Three.js
- no icon library
- Lenis is the only motion dependency
- static export stays appropriate

Do not add 3D/heavy animation libraries merely to chase “premium.”

### CODE-01 — `SiteLink` client subscription scope
**OPTIONAL P3 CLEANUP**

`SiteLink` calls `usePathname()` for every use, including many ordinary content/CTA links where active-route semantics are unnecessary. This is not a current bug and may not matter measurably.

Possible future cleanup only if profiling/build analysis justifies it:

- reserve active-route hook behavior for navigation links
- use ordinary Next `Link` for non-nav CTAs/content links

Do not refactor this before release acceptance simply for theoretical purity.

### CODE-02 — minor repo housekeeping
**OPTIONAL P3**

`.gitignore` contains `.vercel` twice. Harmless; clean only when touching nearby configuration.

### CONTENT-01 — generic concepts are now the largest credibility limitation
**P1 PRODUCT/SALES RECOMMENDATION — NEEDS SAAD DECISION**

The current Work page is intentionally honest, but every item is a generic concept study. For a software company trying to win work, verified real builds will create more trust than another layer of visual polish.

Potential direction:

- retain concept studies if desired
- add a distinct “Selected builds” / “Founder-built products” section using real, verifiable projects
- candidates may include real founder/RMS work such as QuickSign, logistics/business software, AI extraction tooling, or other actually built products — **only after verifying ownership, public links, screenshots, status, and what claims may be made**
- describe the actual problem, what was built, technologies, and current status
- never invent client outcomes, revenue, adoption, launch status, or testimonials

This is probably the highest-impact path from ~8.4 visual quality toward a company site that also sells effectively.

### CONTENT-02 — founder proof links
**OPTIONAL P2 / NEEDS SAAD CONTENT APPROVAL**

Current founder profiles link to portfolios. If useful and approved, add verified professional proof such as GitHub/LinkedIn links. Keep both founders balanced. Do not assign CEO/CTO or other executive titles unless Saad explicitly approves them for Psametra.

### PROOF-01 — verified external project proof inventory (2026-09-14)
**VERIFIED / AUDIT EVIDENCE ONLY — NO SITE CHANGE**

Founder portfolios and the private RMS logistics repository materially strengthen the evidence available for future Work-page copy, but personal/freelance work must not be silently relabeled as Psametra company client work.

- Abdur Rafay Khan’s public portfolio lists **APPNA New Jersey** as 2026 freelance Full-Stack Developer work, with a live public link at `https://www.appnanj.org/` and a Next.js/React/TypeScript/Tailwind/Vercel stack.
- The same portfolio describes APPNA New Jersey as a nonprofit website covering programs, leadership/events, membership, and donations. The live APPNA NJ site was independently fetched during this audit and currently publishes `10,000+ patients served` and `200+ students mentored` (plus other organization metrics). If these are ever referenced, attribute them as APPNA-reported organizational impact — **not as outcomes caused by Psametra/the website unless that causality is separately evidenced**.
- Muhammad Saad’s public portfolio provides additional founder-built proof candidates: QuickSign, `extract`, Ledger, and DineSync. These are evidence of founder capability, not automatically Psametra client engagements.
- Existing Psametra founder portfolio links are already present; do not repeat work to add them.

### CASE-01 — APPNA New Jersey case-study candidate
**VERIFIED REAL PUBLIC BUILD / NEEDS ATTRIBUTION + COPY APPROVAL BEFORE USE**

APPNA New Jersey is the strongest immediately public client-style proof found in the audit. It can support a real-work case study once ownership/agency attribution is phrased truthfully. Prefer verifiable scope, screenshots, stack, and public URL. Do not invent outcomes, engagement metrics, or imply Psametra contracted the work unless Saad confirms that relationship.

### CASE-02 — Raaziq logistics platform case-study candidate
**VERIFIED REAL PRODUCT EVIDENCE / NEEDS PUBLICATION + CLAIM APPROVAL BEFORE USE**

Evidence reviewed from `E:\LogisticSoftware\sea-and-air` and the live branded shell at `https://frontend-beryl-three.vercel.app/` confirms Raaziq is a substantial logistics build rather than a concept mockup. The air vertical documents quotation-to-shipment workflows, ops/worker/customer/public-tracking surfaces, a 17-stage air-freight lifecycle, FastAPI + React architecture, and a documented integration-test suite. The sea vertical provides public container lookup through a provider abstraction and shares the customer-facing tracking UI.

Claim boundaries are important: current documentation explicitly does **not** support claims of live carrier integrations for air, ETA prediction, GPS/IoT, AI pricing/prediction, payments/ERP, or other future capabilities. The sea SAPT connector has an explicit authorization/commercial-use caveat; never market it as an official SAPT partnership/integration unless separately authorized. Air documentation is internally stale/inconsistent around ops authentication, so avoid detailed auth claims until runtime/source behavior is specifically re-verified. Public shell/branding was verified; authenticated live workflow verification was not completed in this audit.

### CONTENT-03 — recommended real-work information architecture
**P1 PRODUCT/SALES RECOMMENDATION — NEEDS SAAD DECISION**

For credibility, the strongest evidence-backed direction is a distinct **Selected Work / Real Builds** area led by APPNA New Jersey and Raaziq, plus a separately labeled **Founder-built products** area if QuickSign, `extract`, Ledger, or DineSync are used. This separation prevents personal/freelance work from being presented as company client history while still proving the founders can ship real systems.

### TESTIMONIAL-01 — temporary testimonial evidence boundary
**OWNER-REPORTED POSITIVE FEEDBACK / STAGING PLACEHOLDER ONLY / NEEDS APPROVED QUOTE FOR FACTUAL PUBLICATION**

Saad reports that both the APPNA New Jersey client and the Raaziq client were happy with the work and intends to use temporary testimonials. No exact approved client quotation, speaker name/title, or publication permission was verified during this audit. A testimonial component may use clearly marked staging/placeholder copy during development, but fabricated attributed quotes must not ship as factual customer statements. Before production, use an exact approved quote or owner/client-approved paraphrase with truthful attribution.

### AUDIT-01 — one-pass local audit confirmation (2026-09-14)
**VERIFIED / AUDIT ONLY — NO PRODUCT CODE CHANGE**

A single local audit script inspected Git state, package/config files, the filtered source tree, tests, TODO/FIXME/error patterns, existing handoff items, relevant navigation/scroll/SEO/performance patterns, and attempted the standard quality gates. At the start of the pass, branch `codex/psametra-site` and `origin/codex/psametra-site` both pointed to `1051fed7e43645ece769fce616b14e8ef0f71188`; the only working-tree change was this handoff update.

- No additional critical source bug was identified beyond **BUG-01**.
- No source `TODO`/`FIXME`/`HACK`/`XXX`, `@ts-ignore`, or `@ts-expect-error` debt was found by the pass; TODO hits were confined to this handoff/checklist.
- The single source `console.error` remains in transition failure handling and was not identified as a new defect.
- Existing findings for SEO metadata, missing robots/sitemap, always-priority brand images, Lenis ownership, and the mobile-menu scroll-lock path were reconfirmed rather than duplicated as new issues.
- Unit tests executed successfully: **9/9 passed**.
- `lint`, `typecheck`, and `build` could not start in this checkout because the local `eslint`/`next` executables are unavailable (`node_modules` is not installed). Treat this as a local environment precondition, **not a code-gate failure**. Earlier successful lint/typecheck/build evidence in this handoff remains the latest completed gate evidence until dependencies are installed and the gate is rerun.
- The temporary audit report is not a project artifact and must not be committed.

### BIZ-01 — custom company domain
**P1 BEFORE SERIOUS PUBLIC LAUNCH / NEEDS SAAD**

Current production is on a `vercel.app` hostname. A real Psametra domain would materially improve trust, email/brand consistency, canonical SEO, and sharing.

Do not buy/configure a domain without Saad’s approval.

### ANALYTICS-01 — lightweight conversion measurement
**OPTIONAL P2 AFTER LAUNCH / NEEDS SAAD**

README confirms there is currently no analytics. Once the upgraded site is live, consider lightweight measurement for:

- Start a project clicks
- contact-page visits
- Open email draft
- Download brief
- portfolio/case-study clicks

Use a privacy-conscious setup and document it. Do not add analytics before Saad chooses the provider and privacy approach.

---

## 8. RELEASE ACCEPTANCE TODO QUEUE — EXECUTE IN THIS ORDER

This is the list the next AI should work through rather than starting another general audit.

### REL-01 — BUG-01 fix
**TODO / BLOCKED ON SAAD AUTHORIZATION**

Fix mobile-menu breakpoint scroll lock and add regression coverage.

### REL-02 — standard code gate after BUG-01
**TODO AFTER REL-01**

Run lint, typecheck, tests, build. Re-run breakpoint-focused browser checks, not automatically the entire old matrix.

### REL-03 — upgraded Vercel preview
**TODO / NEEDS SAAD AUTHORIZATION IF DEPLOYMENT ACTION REQUIRED**

Create or identify a preview containing the upgraded HEAD. Verify it is built from the correct new SHA. Do not promote production yet.

### REL-04 — fresh Lighthouse / Core Web Vitals lab checks
**TODO ON UPGRADED PREVIEW**

Targets retained from plan:

- mobile performance >=95
- desktop performance >=99
- LCP <=2.5s
- CLS <=0.05

Record actual scores and test conditions. Do not reuse old production scores.

### REL-05 — upgraded accessibility acceptance
**TODO ON UPGRADED PREVIEW**

- automated accessibility scan
- contrast scan
- keyboard-only pass
- focus visibility
- dialog behavior
- both themes

### REL-06 — navigation stress
**TODO**

- rapid repeated internal clicks
- Back during cover
- Back during rotation
- Back during reveal
- throttled destination readiness
- transition + mobile-menu lock overlap

### REL-07 — motion / device acceptance
**TODO**

- desktop wheel trace
- emulated midrange phone trace
- real/native touch if available
- OS/browser-level reduced motion
- full ambient orbit cycle without overflow
- do not claim stable 60fps until measured

### REL-08 — contact end-to-end acceptance
**TODO**

- inspect downloaded brief bytes/content/filename
- verify mailto result in real browser
- no fake sent state
- real RMS address everywhere

### REL-09 — external links
**TODO**

- Saad portfolio link
- Rafay portfolio link
- any future real case-study links

### REL-10 — product-owner visual review
**TODO / NEEDS SAAD**

Saad reviews the actual upgraded preview on desktop/mobile and both themes. Record concrete requested refinements instead of launching another generic redesign audit.

### REL-11 — production promotion
**TODO / BLOCKED ON SAAD EXPLICIT APPROVAL**

Only after the release queue above is acceptable. Confirm RMS Vercel scope and deployed commit SHA after promotion.

---

## 9. WHAT REMOTE DESKTOP COMMANDER IS / IS NOT NEEDED FOR

### Not needed for current source audit
**VERIFIED:** GitHub + Vercel connectors were enough to inspect the committed repo and deployment state A-Z.

### Useful later
Remote Desktop Commander can be useful if Saad authorizes it for:

- inspecting the exact local working tree if it has unpushed changes
- launching the upgraded local build
- physical/local browser interaction the connector cannot reproduce
- local Lighthouse/DevTools/performance tracing
- checking downloaded brief files on disk
- verifying touch/emulation/reduced-motion settings available on the local machine

Do not require RDC merely to reread source files already audited in GitHub.

---

## 10. PROVISIONAL SCORES — UPGRADED IMPLEMENTATION

These are subjective design/readiness scores for the upgraded implementation reviewed locally/source-side, NOT scores for the stale public production build.

| Area | Score | Status |
|---|---:|---|
| Overall premium feel | **8.4/10** | strong improvement; final acceptance pending |
| Hero / identity | **8.8** | visually strong |
| Typography | **8.7** | close to intended hierarchy |
| Section pacing | **8.6** | deliberate and varied |
| Services | **8.5** | editorial treatment works |
| Work presentation | **8.6 visual / lower sales proof** | presentation strong; generic concepts limit credibility |
| About/founders | **8.6** | balanced and credible within supplied facts |
| Contact | **8.4** | honest and usable; final browser acceptance pending |
| Navigation/motion | **8.1** | BUG-01 blocks release-grade score |
| Desktop glide | **8.5 provisional** | architecture good; measured traces pending |
| Mobile responsiveness | **8.5** | settled layouts strong; breakpoint bug remains |
| Accessibility readiness | **8.5 provisional** | final upgraded preview scan pending |
| Performance readiness | **8.7 provisional** | lean architecture; fresh measured results pending |

Do not raise these scores merely because code was changed. Raise them only after evidence/product review supports it.

---

## 11. NON-NEGOTIABLE PRODUCT CONSTRAINTS

- RMS repository ownership remains unchanged.
- Existing routes/core concepts/logo assets remain unless Saad changes scope.
- Default theme follows system; manual theme switch stays.
- Desktop may use gentle Lenis easing; touch stays native.
- Contact has no backend/database unless Saad explicitly changes that decision.
- Approved address: `rmspvtltd.software@gmail.com`.
- Never claim an enquiry was sent when only a mail draft opens.
- Keep concept/prototype status honest.
- Do not invent customers, outcomes, testimonials, revenue, awards, addresses, launch status, executive titles, or metrics.
- Do not add heavy animation/3D dependencies without a demonstrated need.
- Performance and responsiveness must not be sacrificed for visual spectacle.
- Suggestions in this handoff are not automatic authorization to implement them.

---

## 12. FINAL STATUS AT THIS HANDOFF

- A-Z committed-repo audit: **VERIFIED COMPLETE**
- Latest one-pass local audit transport check (2026-09-14): **VERIFIED — HANDOFF-only findings; 9/9 unit tests passed; lint/typecheck/build blocked locally by missing installed dependencies**
- Original premium plan comparison: **VERIFIED COMPLETE**
- Premium implementation in GitHub: **DONE at `49a5691`**
- Public production upgraded: **NO — still old `698002c` release**
- Product code changed by latest A-Z audit: **NONE**
- Vercel settings/deployment changed by latest A-Z audit: **NONE**
- Confirmed release bug: **BUG-01 mobile menu resize scroll lock**
- Fresh upgraded Lighthouse/a11y/perf acceptance: **TODO**
- Browser regression/CI improvements: **TODO recommendation**
- SEO/share completeness: **TODO recommendation**
- Real project/case-study proof: **P1 product recommendation / NEEDS SAAD**
- Custom domain: **P1 before serious launch / NEEDS SAAD**
- Next coding action: **REL-01 only after Saad approval**

**Next AI: do not start another A-Z audit. Start at the first applicable TODO in Section 8, respecting authorization, and update this checklist as each item is actually completed.**
