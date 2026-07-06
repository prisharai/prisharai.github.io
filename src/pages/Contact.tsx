import { PageFrame } from "../components/PageFrame";
import { ContactLink } from "../components/ContactLink";
import { Reveal } from "../components/Reveal";
import { socialLinks } from "../data/site";

export function Contact() {
  return (
    <PageFrame
      eyebrow="Cornell University · Ithaca, NY"
      title="Contact"
      lead="pr482@cornell.edu"
    >
      <div className="max-w-2xl">
        {socialLinks.map((link, i) => (
          <Reveal key={link.href} delay={i * 90}>
            <ContactLink link={link} />
          </Reveal>
        ))}
      </div>
    </PageFrame>
  );
}
