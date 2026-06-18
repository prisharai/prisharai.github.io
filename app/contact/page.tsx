import { PageIntro } from "../components/PageIntro";
import { contactLinks } from "../data/site";

export default function ContactPage() {
  return (
    <section className="page-content">
      <PageIntro eyebrow="contact" title="let's connect">
        <p>
          I&apos;m always open to chat! For opportunities, requests, or a quick
          hello, email is the best path. Don&apos;t hesitate to reach out.
        </p>
      </PageIntro>

      <div className="contact-list" aria-label="Contact links">
        {contactLinks.map((link) => {
          const isExternal = link.href.startsWith("http");

          return (
            <a
              className="contact-link"
              href={link.href}
              key={link.label}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              data-cursor
            >
              <span>{link.label}</span>
              <span aria-hidden="true">open</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
