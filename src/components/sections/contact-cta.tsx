import { SiteLink } from "@/components/navigation/site-link";
import { Arrow, SectionLabel } from "@/components/ui";
export function ContactCta() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div data-reveal>
          <SectionLabel>The next chapter starts here</SectionLabel>
          <h2>
            Something in mind?
            <br />
            <span>Let’s make it matter.</span>
          </h2>
        </div>
        <SiteLink className="button primary" href="/contact">
          Start a conversation <Arrow diagonal />
        </SiteLink>
      </div>
    </section>
  );
}
