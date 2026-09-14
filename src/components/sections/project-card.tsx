import type { Project } from "@/content/site";
import { SiteLink } from "@/components/navigation/site-link";
import { Arrow } from "@/components/ui";

/** Abstract interface studies communicate the concept without implying a shipped client product. */
export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual visual-${project.type}`} aria-hidden="true">
      <span className="concept-label">
        CONCEPT STUDY / PS—0
        {["system", "ai", "web", "product"].indexOf(project.type) + 1}
      </span>
      {project.type === "system" ? (
        <div className="system-study">
          <div className="study-sidebar">
            <b>p.</b>
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="study-content">
            <span>Operations, in sync.</span>
            <div className="study-stats">
              <i />
              <i />
              <i />
            </div>
            <div className="study-row" />
            <div className="study-row" />
            <div className="study-row" />
          </div>
        </div>
      ) : project.type === "ai" ? (
        <div className="ai-study">
          <div className="ai-node">Knowledge</div>
          <div className="ai-connection" />
          <div className="ai-core">
            <span>p</span>
            <span>intelligence</span>
          </div>
          <div className="ai-connection" />
          <div className="ai-node">Possibility</div>
        </div>
      ) : project.type === "web" ? (
        <div className="web-study">
          <span>FORM / FUNCTION</span>
          <strong>
            A clearer
            <br />
            perspective.
          </strong>
          <div />
          <span>EXPLORE WHAT’S POSSIBLE ↗</span>
        </div>
      ) : (
        <div className="product-study">
          <div className="product-cell">
            Discover<span>01</span>
          </div>
          <div className="product-cell">
            Design<span>02</span>
          </div>
          <div className="product-cell">
            Develop<span>03</span>
          </div>
          <div className="product-cell">
            Evolve<span>04</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" data-reveal>
      <SiteLink
        href={`/work#${project.id}`}
        aria-label={`Explore ${project.title}`}
      >
        <ProjectVisual project={project} />
        <div className="project-caption">
          <div>
            <p>{project.category}</p>
            <h3>{project.title}</h3>
          </div>
          <Arrow diagonal />
        </div>
        <p className="project-summary">{project.summary}</p>
      </SiteLink>
    </article>
  );
}
