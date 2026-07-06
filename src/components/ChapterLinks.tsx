import { Link } from "react-router-dom";
import { navItems } from "../data/site";

type ChapterLinksProps = {
  /** 0..1 — how revealed the chapter links should be. */
  reveal: number;
};

export function ChapterLinks({ reveal }: ChapterLinksProps) {
  const visible = reveal > 0.01;

  return (
    <nav
      aria-label="Sections"
      className="pointer-events-none absolute inset-x-0 bottom-[8vh] flex flex-col items-center gap-1 px-6"
      style={{
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 28}px)`,
        transition: "opacity 120ms linear",
      }}
    >
      {navItems.map((item, i) => (
        <Link
          key={item.href}
          to={item.href}
          tabIndex={visible ? 0 : -1}
          className="chapter-link group pointer-events-auto py-1 font-serif text-[clamp(2rem,6vw,4rem)] font-light leading-[1.05] text-ivory/90 transition-all duration-500 hover:text-ivory"
          style={{
            transitionDelay: `${i * 40}ms`,
            transform: `translateY(${(1 - reveal) * (12 + i * 6)}px)`,
            opacity: reveal,
          }}
        >
          <span className="inline-block transition-[letter-spacing,opacity] duration-500 group-hover:tracking-[0.08em]">
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
