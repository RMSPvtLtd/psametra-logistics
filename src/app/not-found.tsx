import { SiteLink } from "@/components/navigation/site-link";
import { Arrow, SectionLabel } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="not-found container">
      <SectionLabel>404 / A small detour</SectionLabel>
      <div className="error-number" aria-hidden="true">
        404<span>↗</span>
      </div>
      <h1>This page is out of orbit.</h1>
      <p>
        The address may have changed, or the page may no longer exist.
        <br />
        Let’s get you somewhere useful.
      </p>
      <SiteLink className="button primary" href="/">
        Back to the beginning <Arrow />
      </SiteLink>
    </section>
  );
}
