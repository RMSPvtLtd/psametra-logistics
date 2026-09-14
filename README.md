# Psametra

A five-page company website built with Next.js App Router, strict TypeScript, React, and Tailwind CSS. The design follows the supplied visual reference: restrained typography, alternating surfaces, Neptune blue, and geometric eclipse motifs.

## Local development

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Next.js, usually `http://localhost:3000`.

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

The build generates a static site in `out/`. All five routes and the custom 404 are prerendered. `npm start` serves that exported site for production inspection. Google font files are downloaded at build time by `next/font` and served locally to visitors.

## Content and brand assets

- `src/content/site.ts`: navigation, page introductions, company story, service descriptions, project concepts, and operating principles. Keep portfolio entries labelled as concepts until real case studies are supplied.
- `src/app/*/page.tsx`: route composition and section-specific headings. Shared sections are in `src/components/sections/`.
- `src/styles/tokens.css`: surface colors, typography-related theme values, radii, spacing, and motion tokens. Styles are separated by ownership: navigation, home, projects, diagrams, internal pages, and footer.
- `public/brand/`: original supplied PNGs and optimized WebP versions. Replace originals using the same filenames and run `npm run assets`. The asset script preserves the complete artwork, alpha, aspect ratio, and existing appearance; it does not crop, redraw, or add effects to the logo.

## Contact setup

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_CONTACT_EMAIL` to a verified business address. Rebuild after changing it.

The approved default is `rmspvtltd.software@gmail.com`. The form validates meaningful, trimmed entries and opens a `mailto:` draft in the visitor’s email application; a separate download action always remains available. It never claims to send a message, stores no enquiry data, and has no backend. Add a separately validated server endpoint if direct form delivery becomes a requirement.

## Page transitions

`TransitionProvider` is the sole owner of navigation motion and resource cleanup. Links keep normal Next.js semantics. Only unmodified, same-origin, cross-page clicks are intercepted; downloads, new tabs, external URLs, and same-page anchors retain browser behavior.

The screen covers, the geometric mark rotates exactly 90 degrees, and a route-commit barrier confirms the destination before the clipped upper and lower panels separate. An 80 ms cover is followed by concurrent route loading and 220 ms rotation, then a 320 ms split reveal: approximately 620 ms when the destination is ready. A slow route remains covered, with an 8-second recovery bound. Back/forward stays native and supersedes interrupted clicks. Reduced motion uses two short fades with the same commit barrier. Selected content groups enter once; all content remains visible without JavaScript.

Tests deliberately delay the route promise to prove that stale content is not revealed. See `docs/ARCHITECTURE.md` for ownership and tradeoffs.

## Scrolling

`ScrollProvider` dynamically loads Lenis 1.3.26 only on fine-pointer, hover-capable viewports at least 768px wide with no reduced-motion preference. It owns one automatic RAF with lerp 0.12. Touch stays native; anchors, keyboard, and history cancel inertia. Modal and transition locks compose through an idempotent release API.

## Deploy to Vercel

1. Import this repository into Vercel using its Next.js preset.
2. Verify the RMS Vercel account and scope before deploying. The email defaults to the approved RMS address.
3. Use `npm run build`; the static export is `out/`.
4. Deploy and connect your company domain when ready.

There are no runtime secrets, databases, analytics, third-party embeds, or server requirements. Images are optimized ahead of time because the export has no image-optimization server. The `.openai/hosting.json` file also identifies the private Sites project used for review; it is not required by Vercel.

## Verification

Automated checks cover strict types, lint, navigation eligibility, Unicode brief formatting, transition ordering under delayed commits, reduced motion, and route failures. Browser review covers desktop and mobile layouts, route links, theme switching, native history, and contact validation. See `docs/QA.md` for the completed checks and limits. Lighthouse scores have not been measured; no score is claimed.
