# PSAMETRA LOGISTICS - DEEP RESEARCH & AUDIT

**Project:** `psametra-logistics`  
**Repository:** `RMSPvtLtd/psametra-logistics`  
**Local:** `E:\psametra-logistics`  
**Research date:** 2026-09-14

## Boundary

**NEW BUILD - DO NOT MODIFY THE LEGACY PSAMETRA WEBSITE.**

This document records research for a new standalone demo logistics website. The legacy Psametra corporate website was inspected only as a reference source and is not the implementation base.

## 1. What the new project is for

Psametra needs a high-end demonstration website it can show to logistics companies during sales conversations. The demo should prove two things at once:

1. Psametra can make a logistics brand look modern, credible and premium.
2. Psametra understands the operational digital journeys logistics customers actually need, not just marketing pages.

The demo therefore should combine a cinematic public website with believable quote, tracking and portal experiences.

The site is not meant to imply that Psametra itself is a freight forwarder. It is a concept/showcase brand.

## 2. Existing Psametra corporate site - reference-only audit

Production inspected: `https://psametra-website.vercel.app/`.

Useful reference value:

- Psametra wordmark/logo assets
- restrained black/white/blue brand language
- company/founder context
- real agency contact pathway
- general tone of precision and engineering quality

What must NOT carry over merely because it exists:

- generic software-studio page structure
- orbit/eclipse visual metaphors
- services/work/about layout composition
- legacy Next/component architecture
- page-transition implementation
- existing contact-form architecture
- old design tokens or motion system

The corporate site solves a different job: explaining Psametra as a software company. The new demo must solve a logistics company's job.

## 3. Founder portfolios - capability audit

### Muhammad Saad

Portfolio: `https://muhammadsaad-portfolio.vercel.app/`

Observed strengths relevant to the demo:

- backend/system engineering presentation
- AI/ML and applied product work
- project proof through repository-linked work
- dark premium visual taste

### Abdur Rafay Khan

Portfolio: `https://abdur-rafay-khan-portfolio.vercel.app/`

Observed strengths relevant to the demo:

- full-stack/product delivery
- polished business websites
- interface-first project presentation
- responsive portfolio composition

These portfolios support Psametra's ability to build the demo, but they must not be represented as logistics-company testimonials or customer evidence.

## 4. RMS logistics software - product/domain audit

Audited local source: `E:\LogisticSoftware\sea-and-air`.

This is the most important internal research source because it demonstrates actual understanding of freight workflows.

### Air freight vertical

Verified architecture and product surfaces include:

- FastAPI backend
- React/TypeScript frontend
- PostgreSQL production model with SQLite test path
- ops authentication
- worker authentication
- customer authentication
- quote/inquiry flow
- shipment lifecycle
- invoice workflow
- documents
- rate cards
- airline schedules
- customer portal
- public tracking
- control tower / operational overview

The shipment lifecycle has a canonical 17-stage flow covering inquiry, quotation, job opening, documentation, airport/handling milestones, airline movement and invoicing.

This is valuable because the new demo can show a simplified customer journey that still feels grounded in real logistics operations rather than generic progress bars.

### Customer-facing boundary

The existing RMS system deliberately keeps internal operational notes and sensitive risk reasons out of the public tracking/customer view. That is a good product rule to retain in the demo.

### Quote flow

The working reference supports concepts including:

- customer selection/creation
- origin and destination
- air freight mode
- cargo type
- Incoterm
- weight and volume
- ready date
- HS code
- pieces/dimensions
- supplier/shipper context
- rate-card/manual quoting
- quote acceptance

This gives the new demo enough domain detail to make a quote experience feel real without fabricating a live pricing engine.

### Tracking

Public tracking supports job/reference search and renders:

- route
- mode
- current milestone
- next milestone
- route map
- journey rail
- stage checklist
- event timeline
- shipment references
- exception/at-risk messaging

Sea mode supports container tracking and voyage/event detail through a provider abstraction.

### Control tower

The current RMS overview demonstrates a credible operational information architecture:

- active shipments
- at-risk shipments
- on-hold shipments
- ready-to-invoice work
- active lanes
- network map
- attention queue
- pipeline phases

For the public demo, use this as inspiration for a premium control-tower preview. Do not dump the entire back-office product into a marketing page.

### Verification evidence

During this audit:

- Air backend: **413 tests passed**
- Sea backend: **49 tests passed**
- Air frontend lint: 0 errors, 7 fast-refresh style warnings
- Air frontend production build: succeeded

This evidence means the logistics workflows are not merely speculative research notes.

## 5. External logistics benchmark research

### Einride

Source: `https://www.einride.tech/`

Strongest lessons:

- Treat physical transportation and software as one platform, not two separate products.
- Use large editorial messaging and real freight imagery instead of generic SaaS illustrations.
- Explain the system in a few powerful categories rather than endless service cards.
- Let the physical vehicle/product create emotional impact, then explain the digital layer.

Applicable idea for Psametra Logistics:

**Start in the physical world, then reveal the digital operating layer.**

### Flexport

Source: `https://www.flexport.com/products/flexport-platform/`

Strongest lessons:

- Logistics technology should explicitly connect to the real movement of goods.
- Freight modes, customs, booking, control tower and visibility belong in the same product story.
- A platform page works best when each digital capability maps to a real operational problem.

Applicable idea:

The website should not say merely "AI-powered logistics". It should demonstrate exactly what becomes clearer/faster: quote, movement, tracking, documents, exceptions and decisions.

### Kuehne+Nagel myKN

Source: `https://www.kuehne-nagel.com/digital-services/mykn`

Strongest lessons:

- The simplest customer mental model is highly effective: **Quote -> Book -> Track -> Explore/Report**.
- Shipment alerts and document access are core value, not secondary features.
- Customer self-service should be obvious from the marketing experience.

Applicable idea:

Make `Get a quote`, `Track shipment` and `Portal` persistent high-value actions.

### Forto

A target platform page returned HTTP 403 during the research session. Do not cite detailed Forto findings from this audit as verified.

## 6. Market-pattern synthesis

Across serious modern freight platforms, the repeated customer journey is not "read about services then contact us". It is closer to:

**discover -> quote -> book/plan -> move -> track -> react to exceptions -> access documents -> review/report**

That is the foundation for the new information architecture.

The best demo should therefore feel like the front door to an operating system for freight, while still functioning as a premium corporate website.

## 7. Audience model

The demo should be persuasive to several likely logistics-client stakeholders:

### Owner / CEO

Needs to see:

- premium brand credibility
- a site that looks larger/more mature than a typical local logistics website
- clear lead generation
- confidence that software can become a competitive advantage

### Sales / commercial team

Needs to see:

- quote enquiry flow
- clear services/modes
- reduced back-and-forth for basic shipment information
- professional presentation to overseas customers

### Operations manager

Needs to see:

- shipment stages
- exception visibility
- customer-safe tracking
- documents
- operations/control-tower concept

### Logistics customer

Needs to see:

- fast quote path
- easy tracking
- confidence about current shipment state
- self-service portal possibility

## 8. Conversion strategy

Primary CTAs should be functional and repeated intelligently:

1. `Get a quote`
2. `Track shipment`
3. `Customer portal` / `Explore platform`

Do not let a generic `Contact us` button be the only meaningful conversion path.

The final site should end with a truthful bridge back to Psametra, for example:

`Want this experience for your logistics business? Talk to Psametra.`

That message can sit in a closing strip/footer so the demo still feels like a logistics-company website during the main experience.

## 9. Recommended information architecture

### Home

Goal: emotional impact + immediate utility + digital capability proof.

### Services

Organize around real freight modes and logistics needs. Keep content demonstrative rather than claiming a real operating network.

Potential groups:

- Air freight
- Ocean freight
- Road freight
- Customs coordination
- Warehousing / fulfillment
- Specialized cargo

The last three should remain generic/demo unless actual client-specific content later replaces them.

### Tracking

A polished sample tracking product with consistent sample shipment references.

### Quote

Multi-step inquiry UX. It should feel easier than emailing a spreadsheet.

### Platform

Explain digital visibility, control tower, exceptions, documents and customer self-service.

### Portal demo

Interactive demonstration of what a client/customer portal could look like.

### About

Keep minimal. Do not fabricate a decades-long logistics history.

### Contact

Either a demo logistics-sales form with explicit demo framing or a direct Psametra consultation bridge.

## 10. Homepage narrative in detail

### Scene 1 - physical freight

Full viewport truck/warehouse hero.

Possible copy territory:

- `Freight, in full view.`
- `Move with clarity.`
- `Physical freight. Digital control.`

Keep the headline short enough to coexist with video.

### Scene 2 - utility

Expose the three actions immediately after the hero:

- Track
- Quote
- Portal

### Scene 3 - modes

Show logistics categories using large visual panels, not four tiny icon cards.

### Scene 4 - connected journey

A horizontal/scrolling operational story:

`Quote -> Plan -> Move -> Track -> Resolve -> Deliver -> Document`

### Scene 5 - control tower

Blend from freight photography into a crisp control-tower UI. This is where the demo becomes visibly more advanced than a normal logistics brochure site.

### Scene 6 - tracking proof

Allow an example tracking number or `Try demo shipment` button.

### Scene 7 - customer portal

Show the user what happens after login: shipments, milestones, documents, quotes/invoices.

### Scene 8 - sales close

Bridge to Psametra truthfully.

## 11. Hero-video technical audit

Original supplied video:

- 1280x720
- H.264 video
- AAC audio
- 24 fps
- 10.005 seconds
- 3,110,120 bytes
- 240 video frames
- only **1 keyframe**

Why this matters:

A single-keyframe 10-second MP4 is fine for ordinary linear playback but is a poor source for repeated arbitrary scroll seeks because the decoder may need to work forward from the beginning.

A dedicated derivative was created in this new repo:

`reference/hero/psametra-logistics-hero-scroll-g12.mp4`

Verified derivative:

- H.264 video only
- 1280x720
- 24 fps
- 10.0 seconds
- 2,614,123 bytes
- 20 keyframes
- GOP 12
- no audio stream

This is the preferred first candidate for desktop scroll scrubbing.

Also supplied:

`reference/hero/psametra-logistics-hero-poster.jpg`

### Recommended hero interaction

Use a sticky sequence rather than trying to animate the whole page around the video.

Concept:

- 100vh sticky video viewport
- 200-260vh outer scroll section
- map section progress from 0..1 to video time 0..duration
- schedule updates in one `requestAnimationFrame`
- do not seek before metadata is loaded
- avoid seeking when the target is effectively unchanged
- clamp and clean up listeners

### Mobile strategy

Do not force desktop scroll-scrub behavior onto phones.

Preferred fallback order:

1. poster + subtle scale/position choreography
2. short muted autoplay/loop if device/browser performs well
3. scrub only after real-device verification

Reduced-motion users should receive an immediate stable composition, not a slowly animated substitute.

## 12. Visual system recommendation

### Palette

Base:

- near-black
- graphite
- cool steel gray
- off-white

Accent:

- restrained electric/cobalt blue

Avoid bright gradients as the main identity.

### Typography

Use a modern grotesk/sans display face with a clean body face. Operational metadata can use a mono/technical style sparingly.

Hierarchy should feel more like industrial editorial design than a SaaS dashboard landing page.

### Shapes

Prefer:

- straight grids
- modest radii
- thin rules
- map/route lines
- wide media crops
- technical status rails

Avoid every section becoming a rounded floating card.

## 13. Software UI language

Public marketing and portal UI should share design DNA but not identical density.

Marketing:

- cinematic
- spacious
- large type
- visually emotional

Operational UI:

- compact
- structured
- status-first
- tabular where useful
- timestamps and references easy to scan

The transition between those modes is a feature of the concept, not a problem to hide.

## 14. Demo data strategy

Create one canonical sample dataset and reuse it everywhere.

Example entities:

- 3-5 shipments
- 2 customers
- 2-3 freight modes
- 1 clean delivered journey
- 1 active normal journey
- 1 at-risk/exception journey
- 2 quotes
- a few documents/invoices

Rules:

- same reference always means same route/status
- same company/contact names across quote/portal where reused
- no real third-party client names unless authorized
- clearly distinguish example/demo prices from real rates

## 15. Functional demo depth

The demo should be interactive enough to sell the concept without recreating a complete TMS.

### Must feel real

- quote step progression
- tracking search/result
- portal navigation
- shipment timeline
- exception state
- documents/invoice preview

### Can remain simulated

- rate calculation
- authentication backend
- carrier API integrations
- payments
- real notifications
- live map telemetry

If simulated, the UI should never imply a production integration exists.

## 16. Mobile audit requirements

Mobile is not a shrunk desktop.

Particular risks:

- video decode/scrub performance
- huge display typography wrapping badly
- horizontal timeline overflow
- map height swallowing the viewport
- quote forms becoming exhausting
- dashboard tables becoming unreadable

Use mobile-specific interaction patterns:

- cards/lists instead of wide tables
- collapsible journey details
- sticky action where useful
- simplified motion
- shorter media crops

## 17. Accessibility requirements

From first implementation:

- semantic page landmarks
- skip link
- keyboard-operable navigation/forms/tabs
- proper labels and validation
- no status conveyed by color alone
- visible focus
- sufficient contrast
- reduced-motion path
- logical heading order
- video treated as decorative when copy communicates the essential message

## 18. SEO/content strategy for a client-ready demo

Even as a demo, structure pages the way a real logistics client would need:

- descriptive title/metadata per route
- clear H1s
- freight/service terminology
- internal linking between services/quote/track
- accessible social preview image once branding is approved
- structured organization data only if the demo later becomes a real client's site; do not publish fictitious organization facts as schema

## 19. What not to build

Do not waste time on:

- fake AI chatbot
- decorative globe with meaningless arcs
- fake real-time fleet map
- dozens of service subpages
- investor/news/careers systems
- fake customer logos
- meaningless "99.9% on-time" counters
- login/auth infrastructure unless it materially improves the sales demo
- a clone of Flexport/Einride/Kuehne+Nagel

The goal is a distinct Psametra-quality concept informed by those patterns.

## 20. Risk register

### Risk: looks like a software startup, not logistics

Mitigation: lead with physical freight, modes, routes and operational language.

### Risk: hero causes jank

Mitigation: dense-keyframe derivative, poster fallback, mobile simplification, measure on real hardware.

### Risk: fake-business credibility

Mitigation: no unsupported factual claims; consistent demo framing and data.

### Risk: portal overwhelms marketing site

Mitigation: separate `/platform` and `/portal-demo`; homepage shows only the strongest slice.

### Risk: future agent accidentally edits legacy Psametra

Mitigation: critical boundary repeated in `HANDOFF.md`, `SOL_HANDOFF.md`, and `README.md`; legacy source removed from this repo.

## 21. Priority matrix

### P0 - required to sell the concept

- hero
- homepage
- tracking demo
- quote demo
- strong service/mode presentation
- truthful Psametra bridge CTA
- mobile/reduced-motion behavior

### P1 - differentiates from ordinary agency demos

- platform/control-tower page
- customer portal demo
- consistent operational dataset
- exception/document journey

### P2 - polish

- richer route-map treatment
- microinteraction refinement
- optional light/dark mode if it genuinely improves presentation
- case-study capture/video after the site is stable

## 22. Final research conclusion

The strongest opportunity is not to make another attractive logistics homepage. The differentiator is to show a logistics business **as a connected digital operation**.

The new demo should move visually and conceptually from:

**truck / freight / warehouse -> quote -> journey -> tracking -> exception -> portal -> control tower**

That sequence uses Psametra's real software capabilities as inspiration while remaining truthful about what the demo itself is.

Implementation should now proceed from `SOL_HANDOFF.md` without repeating this research from scratch.

**NEW BUILD - DO NOT MODIFY THE LEGACY PSAMETRA WEBSITE.**
