import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageIntro } from "@/components/sections/page-intro";
import { ContactCta } from "@/components/sections/contact-cta";
import { Arrow, Eclipse, SectionLabel } from "@/components/ui";
export const metadata: Metadata = {
  title: "About",
  description:
    "Independent thinking. Thoughtful engineering. Get to know the principles behind Psametra.",
};
export default function About() {
  return (
    <>
      <PageIntro {...site.intros.about} />
      <section className="about-story container" data-reveal>
        <div className="about-art" aria-hidden="true">
          <Eclipse />
          <span>CLARITY / CARE / CRAFT</span>
        </div>
        <div>
          <SectionLabel>A considered perspective</SectionLabel>
          <h2>
            More than what we build.
            <br />
            How we think.
          </h2>
          {site.aboutStory.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <section className="container section founders">
        <SectionLabel>The people behind the work</SectionLabel>
        <h2>
          Two perspectives.
          <br />
          One considered approach.
        </h2>
        <div className="founder-grid">
          {site.founders.map((founder, index) => (
            <article key={founder.name} data-reveal>
              <span className="index">0{index + 1} / FOUNDER</span>
              <h3>{founder.name}</h3>
              <p className="founder-focus">{founder.focus}</p>
              <p>{founder.description}</p>
              <a
                className="text-link"
                href={founder.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                View portfolio <Arrow diagonal />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="container section" data-reveal>
        <SectionLabel>Our operating principles</SectionLabel>
        <h2>The foundations don’t change.</h2>
        <div className="about-principles">
          {site.principles.map((principle, index) => (
            <article key={principle.title}>
              <span className="index">0{index + 1}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
