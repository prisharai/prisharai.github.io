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
      className="group flex items-baseline justify-between gap-4 border-b border-line py-5 transition-colors hover:border-rose-deep/40 sm:gap-6"
    >
      <span className="shrink-0 text-[11px] uppercase tracking-[0.22em] text-ink-faint">
        {link.label}
      </span>
      <span className="break-all text-right font-serif text-base font-light text-ink transition-colors group-hover:text-rose-deep sm:text-lg">
        {value}
        <span className="ml-2 inline-block text-rose-deep transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </a>
  );
}
