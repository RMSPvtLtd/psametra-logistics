import { site } from "@/content/site";
import { Arrow, Eclipse, SectionLabel } from "@/components/ui";
import { SiteLink } from "@/components/navigation/site-link";
import { ProjectCard } from "@/components/sections/project-card";
import { ContactCta } from "@/components/sections/contact-cta";
export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <SectionLabel>
            Independent thinking. Exceptional engineering.
          </SectionLabel>
          <h1>
            Software engineered
            <br />
            for what’s next.
          </h1>
          <p className="hero-description">{site.home.description}</p>
          <div className="actions">
            <SiteLink className="button primary" href="/contact">
              Start a project <Arrow />
            </SiteLink>
            <SiteLink className="text-link" href="/work">
              Explore our work <Arrow />
            </SiteLink>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true" data-ambient>
          <span className="art-coordinate">
            PS / 001 — THE POSSIBILITY OF PRECISE
          </span>
          <Eclipse />
          <div className="art-caption">
            <span>Built with intention.</span>
            <span>Designed to move you forward.</span>
          </div>
        </div>
        <div className="hero-baseline">
          <span>SOFTWARE. INTELLIGENCE. POSSIBILITY.</span>
          <a href="#capabilities">
            Discover Psametra <span>↓</span>
          </a>
        </div>
      </section>
      <section className="clarity-section dark-surface">
        <div className="container">
          <div className="section-rule">
            <span>02</span>
            <i />
            <span>A CLEARER TOMORROW</span>
          </div>
          <h2>Clarity in every system.</h2>
          <p>
            Complexity is everywhere.
            <br />
            We build what brings it into focus.
          </p>
          <SiteLink className="text-link" href="/about">
            Meet Psametra <Arrow />
          </SiteLink>
        </div>
        <div className="statement-eclipse" aria-hidden="true" data-ambient>
          <Eclipse />
        </div>
      </section>
      <section id="capabilities" className="capabilities-section dark-surface">
        <div className="section container">
          <div className="section-rule">
            <span>03</span>
            <i />
            <span>CAPABILITIES</span>
          </div>
          <div className="capabilities-layout">
            <div className="capabilities" data-reveal>
              {site.services.map((service, index) => (
                <SiteLink
                  href={`/services#${service.id}`}
                  className="capability"
                  key={service.id}
                >
                  <span className="index">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <Arrow />
                </SiteLink>
              ))}
            </div>
            <div className="capabilities-art" aria-hidden="true" data-ambient>
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three">
                <div className="orbit-point" />
              </div>
              <div className="orbit-axis horizontal" />
              <div className="orbit-axis vertical" />
              <Eclipse />
              <span className="orbit-caption">
                CONNECTED THINKING. COHERENT SYSTEMS.
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="work-section dark-surface">
        <div className="container section">
          <div className="section-rule">
            <span>04</span>
            <i />
            <span>SELECTED CONCEPTS</span>
          </div>
          <div className="section-heading">
            <h2>Possibility, made tangible.</h2>
            <SiteLink className="text-link" href="/work">
              Explore all concepts <Arrow diagonal />
            </SiteLink>
          </div>
          <div className="project-grid">
            {site.projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <p className="concept-note">
            Concept studies that illustrate our thinking. Not commissioned
            client work.
          </p>
        </div>
      </section>
      <section className="principles-section light-surface">
        <div className="container section">
          <div className="section-rule">
            <span>05</span>
            <i />
            <span>OUR APPROACH</span>
          </div>
          <div className="principle-intro" data-reveal>
            <h2>
              A clearer path
              <br />
              from insight to impact.
            </h2>
            <p>
              Technology is only as valuable as the problem it solves. We bring
              clarity, care, and a long-term perspective to every decision.
            </p>
          </div>
          <div className="principles-grid">
            {site.principles.map((principle, index) => (
              <div key={principle.title} data-reveal>
                <span className="index">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
