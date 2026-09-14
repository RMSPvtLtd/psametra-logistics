import { site } from "@/content/site";
import { Brand } from "@/components/brand";
import { SiteLink } from "./site-link";
import { Arrow } from "@/components/ui";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
export function Header() {
  return (
    <header className="header">
      <div className="header-inner container">
        <SiteLink href="/" aria-label="Psametra home">
          <Brand />
        </SiteLink>
        <nav aria-label="Main navigation">
          {site.navigation.map((item) => (
            <SiteLink key={item.href} href={item.href}>
              {item.label}
            </SiteLink>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <SiteLink href="/contact" className="button header-cta">
            Start a project <Arrow diagonal />
          </SiteLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
