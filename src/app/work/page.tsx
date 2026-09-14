import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageIntro } from "@/components/sections/page-intro";
import { ProjectVisual } from "@/components/sections/project-card";
import { ContactCta } from "@/components/sections/contact-cta";
export const metadata: Metadata = {
  title: "Work & Concepts",
  description:
    "Explore conceptual directions for custom platforms, applied AI, digital experiences, and product engineering.",
};
export default function Work() {
  return (
    <>
      <PageIntro {...site.intros.work} />
      <div className="container work-notice">
        <span className="status-dot" />
        <p>
          These are illustrative concepts, not commissioned projects. Client
          case studies will be added as they become available.
        </p>
      </div>
      <section className="container work-details">
        {site.projects.map((project) => (
          <article id={project.id} key={project.id} className="work-detail">
            <ProjectVisual project={project} />
            <div className="work-detail-copy" data-reveal>
              <p className="eyebrow">{project.category} / CONCEPT</p>
              <h2>{project.title}</h2>
              <p className="work-lead">{project.summary}</p>
              <div className="work-context">
                <h3>The challenge</h3>
                <p>{project.challenge}</p>
              </div>
              <div className="work-context">
                <h3>The direction</h3>
                <p>{project.approach}</p>
              </div>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
      <ContactCta />
    </>
  );
}
