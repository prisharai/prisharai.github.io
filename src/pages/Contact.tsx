import { PageFrame } from "../components/PageFrame";
import { ContactLink } from "../components/ContactLink";
import { socialLinks } from "../data/site";

export function Contact() {
  return (
    <PageFrame eyebrow="Contact" title="Say hello.">
      <p className="max-w-2xl text-base leading-relaxed text-ivory/70">
        I’m always open to research collaborations, software engineering
        opportunities, and conversations around AI safety infrastructure,
        computational biology, and human-centered systems.
      </p>

      <div className="mt-12 max-w-2xl">
        {socialLinks.map((link) => (
          <ContactLink key={link.href} link={link} />
        ))}
      </div>
    </PageFrame>
  );
}
