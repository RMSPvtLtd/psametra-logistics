import { site } from "@/content/site";
import { Brand } from "./brand";
import { SiteLink } from "./navigation/site-link";
export function Footer() {
  return (
    <footer className="footer dark-surface">
      <div className="container">
        <div className="footer-wordmark" aria-hidden="true">
          PSAMETRA
        </div>
        <div className="footer-top">
          <SiteLink href="/" aria-label="Psametra home">
            <Brand />
          </SiteLink>
          <p>
            Thoughtfully built.
            <br />
            For what comes next.
          </p>
          <nav aria-label="Footer navigation">
            {site.navigation.map((item) => (
              <SiteLink href={item.href} key={item.href}>
                {item.label}
              </SiteLink>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getUTCFullYear()} Psametra. All rights reserved.
          </span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>Precision is a practice.</span>
        </div>
      </div>
    </footer>
  );
}
