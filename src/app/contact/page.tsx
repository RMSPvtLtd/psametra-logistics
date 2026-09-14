import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/page-intro";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/content/site";
export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell us what you have in mind. Start a conversation about your next software, AI, or digital product project.",
};
export default function Contact() {
  return (
    <>
      <PageIntro {...site.intros.contact} />
      <section className="contact-layout container">
        <aside>
          <h2>
            Every project starts
            <br />
            with a conversation.
          </h2>
          <p>
            Tell us about your business, what you want to change, and where
            you’d like to go. A few thoughtful details are all we need to get
            started.
          </p>
          <div className="contact-direct">
            <span className="eyebrow">Prefer email?</span>
            <a className="text-link email-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
          <div className="contact-next">
            <span className="eyebrow">What comes next</span>
            <p>
              Align on your goals.
              <br />
              Explore the right approach.
              <br />
              Define a clear next step.
            </p>
          </div>
        </aside>
        <ContactForm />
      </section>
    </>
  );
}
