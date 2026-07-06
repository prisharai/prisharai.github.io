import { Link } from "react-router-dom";
import { navItems } from "../data/site";

type ChapterLinksProps = {
  /** 0..1 — how revealed the chapter links should be. */
  reveal: number;
};

export function ChapterLinks({ reveal }: ChapterLinksProps) {
  const visible = reveal > 0.02;

  return (
    <nav
      aria-label="Sections"
      aria-hidden={!visible}
      className="pointer-events-none absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center px-6"
      style={{ opacity: reveal }}
    >
      {/* Deepen the backdrop so the closing titles read cleanly over the bloom. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: reveal,
          background:
            "radial-gradient(70% 60% at 50% 50%, rgba(12,9,8,0.82), rgba(12,9,8,0.45) 60%, transparent 85%)",
        }}
      />
      <p
        className="mb-8 text-[11px] uppercase tracking-[0.4em] text-rose-muted/80"
        style={{
          opacity: reveal,
          transform: `translateY(${(1 - reveal) * 24}px)`,
        }}
      >
        Chapters
      </p>
      <ul className="flex flex-col items-center gap-2 sm:gap-3">
        {navItems.map((item, i) => (
          <li key={item.href}>
            <Link
              to={item.href}
              tabIndex={visible ? 0 : -1}
              className="group pointer-events-auto flex items-baseline gap-3 py-1"
              style={{
                opacity: reveal,
                transform: `translateY(${(1 - reveal) * (24 + i * 14)}px)`,
                transition:
                  "transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <span className="w-6 text-right font-sans text-xs text-ivory/55 transition-colors group-hover:text-rose-muted">
                0{i + 1}
              </span>
              <span className="relative font-serif text-[clamp(2.2rem,7vw,4.5rem)] font-light leading-[1] text-ivory/85 transition-all duration-500 group-hover:tracking-[0.06em] group-hover:text-ivory">
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-rose-muted transition-all duration-500 group-hover:w-full" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
