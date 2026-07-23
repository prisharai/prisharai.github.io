import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../data/site";
import { Starfield } from "./Starfield";

type PageFrameProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
};

function AnimatedTitle({ title }: { title: string }) {
  return (
    <span aria-label={title}>
      {title.split("").map((character, index) => (
        <span
          key={`${character}-${index}`}
          aria-hidden
          className="title-letter"
          style={{ animationDelay: `${80 + index * 34}ms` }}
        >
          {character}
        </span>
      ))}
    </span>
  );
}

export function PageFrame({ eyebrow, title, lead, children }: PageFrameProps) {
  const { pathname } = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(distance > 0 ? window.scrollY / distance : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  return (
    <div className="relative min-h-screen overflow-clip text-ink">
      <Starfield />

      <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-white/[0.04]">
        <div
          className="h-full origin-left bg-gradient-to-r from-bloom-blue via-rose-muted to-bloom-glow shadow-[0_0_18px_rgba(229,175,200,.45)]"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.07] bg-bone/55 backdrop-blur-2xl">
        <div className="mx-auto flex h-[4.5rem] max-w-[72rem] items-center justify-between gap-3 px-5 sm:gap-6 sm:px-8 lg:px-10">
          <Link to="/" className="group flex items-center gap-3" aria-label="pr15ha">
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-rose-muted/40 transition-transform duration-700 group-hover:rotate-180 group-hover:scale-110" />
              <span className="h-1.5 w-1.5 rounded-full bg-rose-deep shadow-[0_0_14px_rgba(229,175,200,.8)]" />
            </span>
            <span className="hidden font-serif text-base tracking-[0.16em] text-ivory/90 sm:block">pr15ha</span>
          </Link>

          <nav aria-label="Main navigation" className="-mr-1 flex max-w-[72vw] items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`shrink-0 rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.16em] transition-all duration-500 sm:px-4 sm:text-[11px] ${active ? "bg-white/[0.075] text-ivory" : "text-ink-faint hover:text-ivory"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main key={pathname} className="page-enter mx-auto max-w-[72rem] px-5 pb-20 pt-32 sm:px-8 sm:pt-36 lg:px-10">
        <section>
          <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-rose-deep sm:text-[11px]" style={{ animation: "rise-in .7s cubic-bezier(.16,1,.3,1) both" }}>
            {eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(3.2rem,8vw,6.25rem)] font-light leading-[.92] tracking-[-0.045em] text-ivory">
            <AnimatedTitle title={title} />
          </h1>
          {lead ? (
            <p className="mt-5 max-w-2xl text-[14px] leading-[1.75] text-ink-soft sm:text-[15px]" style={{ animation: "rise-in .85s cubic-bezier(.16,1,.3,1) .22s both" }}>
              {lead}
            </p>
          ) : null}
          <div className="mt-7 h-px w-full origin-left bg-gradient-to-r from-rose-deep/50 via-bloom-blue/20 to-transparent" style={{ animation: "grow-x 1s cubic-bezier(.16,1,.3,1) .22s both" }} />
        </section>

        <div className="mt-10 sm:mt-12">{children}</div>

        <div className="mt-16 border-t border-white/[0.09] pt-6">
          <Link to="/" className="group inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink">
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
            back to the beginning
          </Link>
        </div>
      </main>
    </div>
  );
}
