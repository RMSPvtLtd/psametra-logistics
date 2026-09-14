import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageIntro } from "@/components/sections/page-intro";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionLabel } from "@/components/ui";
import { ServiceDiagram } from "@/components/sections/service-diagram";
export const metadata: Metadata = {
  title: "Services",
  description:
    "Software engineering, AI systems, web platforms, and product strategy. Explore what we can build together.",
};
export default function Services() {
  return (
    <>
      <PageIntro {...site.intros.services} />
      <section className="service-details container">
        {site.services.map((service, index) => (
          <article
            id={service.id}
            className="service-detail"
            key={service.id}
            data-reveal
          >
            <div className="service-illustration">
              <span className="index">0{index + 1} / CAPABILITY</span>
              <ServiceDiagram type={service.id} />
            </div>
            <div className="service-description">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <ul>
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <section className="container section">
        <SectionLabel>A clear way forward</SectionLabel>
        <h2>Deliberate at every step.</h2>
        <div className="process-grid">
          {site.process.map((step, index) => (
            <article key={step.title}>
              <span className="index">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
