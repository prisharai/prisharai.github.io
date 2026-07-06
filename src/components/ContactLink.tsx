import type { SocialLink } from "../data/site";

export function ContactLink({ link }: { link: SocialLink }) {
  const isEmail = link.href.startsWith("mailto:");
  const value = isEmail
    ? link.href.replace("mailto:", "")
    : link.href.replace("https://", "");

  return (
    <a
      href={link.href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noreferrer"}
      className="group flex items-baseline justify-between border-b border-ivory/12 py-5 transition-colors hover:border-ivory/40"
    >
      <span className="text-xs uppercase tracking-[0.22em] text-ivory/45">
        {link.label}
      </span>
      <span className="font-serif text-lg font-light text-ivory/85 transition-all group-hover:tracking-[0.02em] group-hover:text-ivory">
        {value}
        <span className="ml-2 inline-block text-rose-muted transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </a>
  );
}
