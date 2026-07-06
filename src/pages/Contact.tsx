import { PageFrame } from "../components/PageFrame";
import { ContactLink } from "../components/ContactLink";
import { Reveal } from "../components/Reveal";
import { socialLinks } from "../data/site";

const asset = (name: string) => `${import.meta.env.BASE_URL || "/"}${name}`;

export function Contact() {
  return (
    <PageFrame
      eyebrow="Cornell University · Ithaca, NY"
      title="Contact"
      lead="The best way to reach me is email — I read everything and reply thoughtfully."
    >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
        {/* Portrait, framed like a plate. */}
        <Reveal>
          <figure className="overflow-hidden rounded-2xl border border-line bg-porcelain">
            <img
              src={asset("prisha-portrait.png")}
              alt="Prisha Rai"
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>
          <figcaption className="mt-4 text-[13px] leading-relaxed text-ink-faint">
            Prisha Rai — B.S. &amp; M.Eng. Computer Science, Cornell University.
          </figcaption>
        </Reveal>

        {/* Links. */}
        <div className="lg:pt-2">
          {socialLinks.map((link, i) => (
            <Reveal key={link.href} delay={i * 90}>
              <ContactLink link={link} />
            </Reveal>
          ))}
        </div>
      </div>
    </PageFrame>
  );
}
