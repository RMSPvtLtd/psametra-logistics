You are taking over an existing NEW website project:

`E:\psametra-logistics`

Your job is NOT to rebuild it from zero and NOT to redesign Psametra’s existing corporate website.

# CRITICAL PROJECT BOUNDARY

**NEW BUILD — DO NOT MODIFY THE LEGACY PSAMETRA WEBSITE.**

The project you may modify is ONLY:

`E:\psametra-logistics`

Do NOT modify:

* `E:\psametra-website`
* any legacy Psametra corporate-site repository
* `E:\LogisticSoftware`
* RMS logistics software repositories
* unrelated repositories

The old Psametra website may only be inspected READ-ONLY where the existing `BUILD_BRIEF.md` explicitly permits it.

Do not push, deploy, alter Vercel projects, or modify production infrastructure unless I explicitly authorize that later.

---

# PRIMARY OBJECTIVE

Take the CURRENT Psametra Logistics implementation and elevate it from:

**“very good logistics demo / polished prototype”**

to:

**“premium enterprise logistics digital product that could plausibly have been produced by a top-tier digital agency for a serious international freight company.”**

The target reaction from a prospective logistics client should be:

> “This does not look like a template or student demo. This looks like a real premium logistics brand with a sophisticated customer platform behind it.”

This is both:

1. a convincing logistics/freight-company digital presence, and
2. proof that Psametra can build serious customer-facing logistics software.

The first impression must still be **LOGISTICS**, not SaaS.

---

# FIRST: UNDERSTAND WHAT ALREADY EXISTS

Before changing anything:

1. Open `E:\psametra-logistics`.
2. Read `BUILD_BRIEF.md` completely.
3. Inspect git status/history so you understand which work is current.
4. Inspect the complete source architecture.
5. Run the current site locally.
6. Inspect EVERY route visually on desktop and mobile:

   * `/`
   * `/services`
   * `/track`
   * `/quote`
   * `/platform`
   * `/portal-demo`
   * `/about`
   * `/contact`
7. Interact with everything:

   * header/navigation
   * cinematic hero
   * hero scroll sequence
   * tracking
   * demo shipment selectors
   * quote wizard
   * form validation
   * route maps
   * platform/control tower
   * portal shipment filters/search
   * portal tabs
   * quote dialog
   * document views/download actions
   * responsive/mobile navigation
8. Read the current CSS system rather than layering random styles on top.
9. Inspect existing media under `public/media` and references before requesting or inventing new assets.

DO NOT start making arbitrary aesthetic changes after looking at only the homepage.

Understand the product first.

---

# CURRENT PRODUCT — PRESERVE THIS DEPTH

The current implementation already contains meaningful functionality.

It includes:

* Next.js App Router
* TypeScript
* local/self-hosted Inter
* custom CSS rather than a component-template framework
* shared typed fictional logistics data
* air / sea / road freight
* shipment references
* route maps
* milestones
* operational exceptions
* documents
* activity
* multi-step quote inquiry
* validation
* shipment tracking
* control tower
* customer portal
* quotes
* local quote acceptance demo
* invoices/documents
* responsive layouts
* accessibility work
* reduced-motion handling
* cinematic hero film
* Psametra truck visual
* special grille/logo transition
* mobile/static hero fallback

DO NOT throw these away to produce a simpler marketing website.

The product depth is one of the strongest parts of the project.

---

# CURRENT QA CONTEXT

Previous verified work recorded in `BUILD_BRIEF.md` reported:

* lint passing
* typecheck passing
* build passing
* 16 functional tests passing
* extensive browser checks
* accessibility checks
* strong Lighthouse lab results

However, a later local browser rerun produced several failures:

* desktop homepage horizontal overflow:
  approximately `1928px` content in a `1440px` viewport
* mobile navigation button click intercepted by the hero/poster image
* desktop film-seek test timing out
* desktop reduced-motion poster expectation failing
* desktop video-error fallback expectation failing
* browser console errors involving generated Next CSS chunks being served as `text/plain`

Do NOT blindly assume all of these are current application defects.

The CSS MIME problems may indicate a stale `.next` build/server mismatch.

Therefore FIRST:

1. stop stale local Next processes if appropriate;
2. remove only generated build artifacts if safe;
3. perform a clean production build;
4. launch that exact fresh build;
5. rerun browser verification;
6. determine which failures are genuine;
7. fix genuine regressions before piling new visual changes on top.

Do not weaken tests simply to make them pass.

---

# DESIGN PHILOSOPHY

The visual direction is:

## Premium industrial minimalism

NOT:

* generic SaaS
* Tailwind-dashboard aesthetic
* generic shadcn aesthetic
* giant rounded cards everywhere
* excessive glassmorphism
* neon gradients
* purple AI startup colors
* random glowing blobs
* excessive drop shadows
* childish illustrations
* stock-template sections
* over-animated text
* animation merely because it looks clever

Think more in terms of:

* premium freight company
* industrial design
* editorial art direction
* transport infrastructure
* global movement
* precision
* operational clarity
* high-end B2B software
* information hierarchy
* confident use of negative space
* physical freight meeting digital control

The website should feel serious enough that an operations director, freight-forwarding executive, or logistics company owner could imagine buying it.

---

# DO NOT DESTROY THE CURRENT BRAND LANGUAGE

The existing direction is useful:

* near-charcoal
* warm/off-white
* restrained cobalt blue
* thin operational rules
* monospace references/data
* large editorial typography
* maps
* route lines
* IDs
* timestamps
* status states
* cinematic freight imagery

Evolve it.

Do not replace the identity with an unrelated aesthetic.

---

# MAIN PREMIUM GAP TO SOLVE

Right now, too many surfaces use roughly the same visual formula:

* rectangular white panel
* 1px grey border
* Inter
* small eyebrow
* heading
* cobalt accent

It is coherent but can become visually flat.

Create more hierarchy and art direction WITHOUT making it noisy.

Consider improving:

* typography contrast
* display typography treatment
* spacing rhythm
* section-to-section pacing
* scale changes
* image crops
* editorial composition
* asymmetry where useful
* operational information density
* micro typography
* metadata
* table hierarchy
* visual states
* data visualization treatment
* map treatment
* hover/focus states
* dividers
* layering
* subtle texture
* intentional dark/light transitions
* transitions between physical freight and digital software

Every section should not feel like another card grid.

---

# TYPOGRAPHY

Audit typography A–Z.

The current site mostly depends on Inter.

Determine whether premium editorial display typography can improve the experience while retaining Inter or another highly legible sans-serif for operational UI.

If you introduce another typeface:

* it must be legally usable/open source
* preferably local/self-hosted
* performance must remain good
* do not add multiple unnecessary font families
* operational dashboards must remain extremely legible

Create a proper typographic system for:

* cinematic display headlines
* section headlines
* utility labels
* shipment references
* status labels
* body text
* buttons
* form labels
* metadata
* table headings
* route codes
* timestamps

Do not merely make everything larger.

---

# HOMEPAGE

The homepage should become the strongest page in the project.

Preserve its overall story:

1. physical freight
2. services
3. connected journey
4. physical → digital
5. tracking
6. exception management
7. customer workspace
8. conversion

But improve the composition dramatically.

## Hero

The current hero is valuable and MUST be preserved conceptually.

Existing experience:

* Psametra truck film
* rain-soaked freight yard
* truck approaches
* grille/Psametra mark fills frame
* mark rotates 90°
* upper/lower pieces split
* following content is revealed
* desktop scroll scrub
* poster fallback on mobile/reduced-motion/save-data

Do not replace this with a generic image hero.

Make it feel cinematic and intentional.

Audit:

* first paint
* visual crop
* typography
* CTA placement
* image readability
* scroll hint
* progress indicator
* video scrub smoothness
* transition timing
* end-frame transition
* reverse scrolling
* viewport-height differences
* ultra-wide displays
* short laptop displays
* reduced-motion path
* data-saving path
* mobile path
* failed-video path

The hero must never interfere with navigation or pointer events.

Avoid gimmicky text animation.

The freight film is the star.

---

# HEADER / NAVIGATION

Make the navigation feel like part of a premium identity rather than a generic sticky navigation bar.

Evaluate:

* proportions
* logo treatment
* nav hierarchy
* track action
* portal action
* quote conversion path
* hover state
* current-page state
* scroll behavior
* header/hero relationship
* mobile navigation presentation
* open/close animation
* focus management
* touch targets

Mobile navigation MUST be fully functional and must never be covered/intercepted by the hero.

Keep accessibility intact.

---

# SERVICES

Air / Sea / Road currently work, but push the art direction further.

Do not create generic feature cards.

Make each freight mode feel physical.

Use:

* imagery
* route metadata
* operational labels
* relevant service details
* structured hierarchy
* cinematic cropping
* restrained interaction

A visitor should immediately understand:

“This is a logistics company experience.”

---

# CONNECTED JOURNEY

The Quote → Plan → Move → Track → Exception → Documents journey is strategically important.

Make it one of the signature components of the website.

It should explain how Psametra connects the entire logistics journey.

Consider ways to give the journey more spatial/operational personality:

* shipment rail
* route progression
* active phase
* contextual details
* physical/digital handoff
* metadata
* subtle state transitions

Keep interaction understandable and keyboard accessible.

Do not turn it into an animation toy.

---

# PHYSICAL → DIGITAL SECTION

This is another signature moment.

The left side represents physical freight.

The right side represents the digital customer/operational layer.

Strengthen the contrast and connection between them.

The UI should feel like actual enterprise logistics software rather than a screenshot-shaped card.

Use real information already in the demo:

* reference
* route
* mode
* status
* milestone
* next milestone
* map
* exception
* ETA
* documents where appropriate

Do NOT invent fake integrations or carrier connections.

---

# TRACKING EXPERIENCE

Treat `/track` almost like a standalone real product.

Make it feel excellent enough to demo to a logistics client in a sales meeting.

Improve visual polish around:

* shipment reference search
* sample shipment options
* empty state
* invalid state
* loading perception if useful
* shipment header
* origin/destination
* map
* mode
* ETA
* status
* milestones
* activity
* references
* documents
* exception messages
* next actions

The information hierarchy should answer immediately:

1. Where is my shipment?
2. What is its current status?
3. Has anything gone wrong?
4. When should it arrive?
5. What happened?
6. What happens next?
7. Where are my documents?

Maintain the explicit disclaimer that this is fictional/demo data.

---

# QUOTE EXPERIENCE

The current multi-step quote workflow is one of the strongest “real product” proofs.

Do NOT replace it with a basic contact form.

Make the wizard feel like an enterprise freight inquiry experience.

Improve:

* progress visualization
* input hierarchy
* mode selection
* origin/destination treatment
* dates
* cargo information
* contact section
* validation
* back/forward transitions
* review state
* completion state
* mobile ergonomics

Keep the existing validation logic and test coverage intact.

Never imply that a real carrier rate or booking has been generated.

---

# CONTROL TOWER / PLATFORM

`/platform` should demonstrate serious operational-software capability.

The core concept is excellent:

**“The next action comes first.”**

Lean into this.

The control tower should prioritize:

* exceptions
* at-risk shipments
* holds
* next actions
* customer-safe vs internal information
* route/milestone context

Increase the sense of information architecture and software maturity.

Do not imitate a generic analytics dashboard.

This is freight operations software.

---

# CUSTOMER PORTAL

`/portal-demo` should feel like a premium customer workspace.

Current sections include:

* Shipments
* Quotes
* Documents
* Activity

Preserve them.

Polish:

* sidebar/tab navigation
* account treatment
* shipment rows
* active/completed filters
* search
* selected row states
* detail panel
* route/status hierarchy
* document list
* quote presentation
* quote modal
* sample acceptance state
* activity timeline
* invoice/document visual design
* responsive behavior

The portal should feel related to the public website but denser and more operational.

A customer should believe they could actually use it daily.

---

# ABOUT PAGE

Avoid agency fluff.

The page needs to clarify:

* this is a logistics experience designed/built by Psametra
* Psametra can connect a logistics company’s public website with useful customer software
* the public site and digital operations can feel like one journey

Make the page more editorial/premium, but do not invent client case studies or false logistics credentials.

---

# CONTACT / CONVERSION

The real commercial conversion is:

A logistics company likes this demo → talks to Psametra.

Make that path extremely clear.

There are TWO distinct concepts:

### Demo logistics actions

* track shipment
* request sample freight inquiry
* portal demo

### Real Psametra commercial action

* talk to Psametra about building something like this

Never blur them.

The contact experience should feel premium and intentional, not like an afterthought.

---

# MOTION

Motion should communicate:

* movement
* continuity
* handoff
* transition
* direction
* freight flow
* state change

Use restrained native CSS/Web APIs where possible.

Do not install Framer Motion just because it exists.

Do not add parallax everywhere.

Do not animate all text on scroll.

Avoid animation that makes enterprise software slower to understand.

Potential useful motion:

* sophisticated image reveal
* route line progression
* status/state transitions
* subtle tab/selection movement
* list-state response
* hero sequence
* controlled section transitions
* buttons/arrows responding precisely

Reduced motion must remain first-class.

---

# MICRO-INTERACTIONS

This is one area where premium products separate themselves from prototypes.

Review EVERY interactive control.

Buttons, links, cards, rows, tabs and inputs should have intentional:

* default
* hover
* active
* focus
* pressed
* disabled
* selected
* error
* success states

Keep them subtle.

50 polished small interactions are better than 5 huge animations.

---

# SPACING AND GRID

Audit every page for:

* vertical rhythm
* section pacing
* container widths
* left/right alignment
* baseline relationships
* max text width
* image-to-copy proportion
* excessive dead space
* insufficient breathing room
* tablet awkwardness
* laptop-height awkwardness

Use a consistent underlying grid but allow editorial compositions to break symmetry intentionally.

Avoid the “every section is centered in the same max-width container” feeling where it hurts the art direction.

---

# RESPONSIVENESS

Test at minimum:

Desktop:

* 1920×1080
* 1440×900
* 1366×768

Tablet:

* approximately 1024
* approximately 768

Mobile:

* 430px
* 390px
* 360px

Also inspect:

* very wide viewport
* short laptop viewport

No horizontal overflow.

No clipping.

No giant typography that becomes absurd on intermediate sizes.

No image covering navigation.

No hidden important action.

---

# PERFORMANCE

Premium does NOT mean heavy.

Preserve or improve performance.

Be especially careful with:

`public/media/freight-film.mp4`

It is intentionally optimized for scroll seeking.

Do not casually replace, recompress, duplicate or enlarge it.

Requirements:

* immediate hero poster
* lazy-load noncritical media
* use `next/image` properly
* avoid unnecessary JS
* avoid huge dependency additions
* avoid loading portal-only logic unnecessarily on homepage
* avoid expensive scroll handlers
* preserve requestAnimationFrame approach where useful
* prevent layout shifts
* preserve save-data fallback
* preserve reduced-motion fallback

Do not sacrifice usability for cinematic effects.

---

# ACCESSIBILITY

Premium includes accessibility.

Preserve or improve:

* semantic structure
* heading hierarchy
* landmarks
* keyboard navigation
* visible focus
* dialogs
* form labels
* form errors
* aria-live states
* tab patterns
* contrast
* reduced motion
* touch targets

Do not remove accessibility code because it complicates styling.

---

# CONTENT RULES

Use credible logistics language.

Do NOT invent:

* revenue figures
* customer logos
* certifications
* carrier partnerships
* shipment volume
* global office count
* delivery rates
* sustainability statistics
* awards
* testimonials
* years of experience
* fake clients

If data is fictional, label it appropriately.

Do not litter the visual experience with giant “THIS IS A DEMO” messages either.

Use tasteful contextual labels such as:

* Sample data
* Demo shipment
* Example workflow
* Illustrative journey

---

# ENCODING / CONTENT QUALITY AUDIT

Inspect the actual source files for character-encoding corruption.

During terminal inspection, suspicious rendered strings appeared around characters such as:

* arrows
* smart apostrophes
* em/en dashes
* metadata separators

Examples appeared visually similar to corrupted `�` / `�?` sequences.

Determine whether this exists in source or was only terminal encoding.

If source is corrupted, fix it carefully.

Do not perform blind global replacement.

---

# VISUAL REFERENCE RESEARCH

You may research current world-class freight/logistics, transportation, industrial and enterprise-software experiences for inspiration.

Do not clone another brand.

Study WHY good sites feel premium:

* composition
* information hierarchy
* art direction
* interaction density
* typography
* image treatment
* movement
* trust
* whitespace
* operational clarity

Use references as benchmarks, not templates.

Avoid wasting hours redoing competitor research already summarized in `BUILD_BRIEF.md`.

---

# ENGINEERING RULES

Before editing:

1. establish a clean baseline;
2. understand existing tests;
3. inspect current git diff;
4. preserve intentional user edits;
5. do not overwrite media/reference assets casually.

During implementation:

* make logical, reviewable changes
* reuse the current architecture where it is good
* refactor when it materially improves maintainability
* avoid dependency bloat
* do not duplicate CSS systems
* remove obsolete styles created by your redesign
* keep components reasonably focused
* do not break shared demo-data consistency

Do not rewrite the entire application merely because you prefer another architecture.

---

# QA AFTER IMPLEMENTATION

Run ALL relevant checks:

`npm run lint`

`npm run typecheck`

`npm test`

`npm run build`

Then launch the fresh production build and run:

`npm run test:browser`

Also run the existing accessibility verification.

Inspect screenshots/routes visually.

Test:

* home
* services
* tracking empty state
* tracking valid sample
* tracking invalid sample
* quote validation
* quote forward/back
* quote review
* quote completion/download
* portal navigation
* portal shipment filters
* portal search
* portal quotes
* portal quote dialog
* acceptance state
* documents
* activity
* platform filters
* header navigation
* mobile menu
* hero
* video-error fallback
* reduced motion
* mobile fallback
* console errors
* horizontal overflow

Do not call the redesign complete just because TypeScript builds.

---

# LIGHTHOUSE / PERFORMANCE REVIEW

After the final visual implementation is stable, perform another Lighthouse review.

Do not obsess over getting a fake 100 by deleting useful features.

Look for material regressions in:

* LCP
* CLS
* responsiveness
* bundle weight
* hero media behaviour
* accessibility
* best practices

Record real results.

---

# VISUAL ACCEPTANCE STANDARD

Before calling the job finished, ask yourself:

### Homepage

Could this opening experience plausibly belong to a premium international logistics company?

### Tracking

Would a client be comfortable showing this to their own customers?

### Quote

Does this feel like real freight software rather than an HTML form?

### Portal

Could someone plausibly work inside this every day?

### Platform

Does it feel operational rather than “dashboard-ish”?

### Mobile

Does it still feel deliberately designed rather than merely stacked?

### Whole system

Do the public site and software feel like ONE product family?

If any answer is no, continue polishing.

---

# IMPORTANT PRODUCT PRINCIPLE

Do not confuse “premium” with “more.”

Premium usually means:

* stronger hierarchy
* fewer weak elements
* better typography
* better imagery
* better proportions
* better states
* cleaner interaction
* more confident whitespace
* thoughtful detail
* consistent motion
* credible content
* zero obvious bugs

Remove weak design before adding decoration.

---

# AUTONOMY

You have permission to inspect the entire `E:\psametra-logistics` project and make local code/design changes required for this premium upgrade.

You may run tests, builds, browsers and local verification autonomously.

You may NOT:

* modify the legacy Psametra website
* modify RMS/LogisticSoftware
* push Git changes
* deploy to Vercel
* change DNS/domains
* alter production infrastructure

unless I explicitly authorize those actions later.

If you need read-only comparison with another repository, make sure it remains read-only.

---

# WHEN YOU FINISH

Do not just say “done.”

Give me:

1. **Before assessment**

   * what made the previous site feel less premium

2. **Design system changes**

   * typography
   * color
   * spacing
   * grids
   * surfaces
   * interaction rules
   * motion

3. **Page-by-page changes**

   * Home
   * Services
   * Track
   * Quote
   * Platform
   * Portal
   * About
   * Contact

4. **Functional fixes**

   * genuine bugs found
   * stale-build/test artifacts identified separately

5. **Performance impact**

6. **Accessibility impact**

7. **Tests**

   * exact commands
   * exact pass/fail counts

8. **Remaining concerns**

9. **Files changed**

10. **Visual review**

    * what you inspected at desktop/tablet/mobile sizes

11. **Git status**

    * but DO NOT commit/push unless I authorize it

12. End with:

`READY FOR SAAD PREMIUM REVIEW — NOT PUSHED / NOT DEPLOYED`

---

# FINAL DIRECTION

Do not redesign the corporate Psametra website.

Do not replace the actual working logistics product with a prettier but shallower landing page.

Take the strong functional foundation already inside `psametra-logistics` and give it the art direction, detail, interaction quality and visual confidence of a premium enterprise logistics product.

The benchmark is not:

“Nice website.”

The benchmark is:

**“I would hire Psametra to build this for my logistics company.”**

And remember:

**NEW BUILD — DO NOT MODIFY THE LEGACY PSAMETRA WEBSITE.**
