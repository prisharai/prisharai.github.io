import { useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../data/site";
import { Starfield } from "./Starfield";

type PageFrameProps = {
  /** Small kicker label above the title. */
  eyebrow: string;
  /** Big section title — the section name, kept factual. */
  title: string;
  /** Optional single factual lead line. No marketing fluff. */
  lead?: string;
  children: ReactNode;
};

export function PageFrame({ eyebrow, title, lead, children }: PageFrameProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen text-ivory">
      <Starfield />

      {/* Light, unobtrusive header — a mark and chapter links, never a navbar. */}
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 pt-8 sm:px-10">
        <Link
          to="/"
          className="font-serif text-lg tracking-wide text-ivory/90 transition-opacity hover:opacity-70"
        >
          pr15ha
        </Link>
        <nav className="flex gap-5 text-xs uppercase tracking-[0.18em] text-ivory/45">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`transition-colors hover:text-ivory ${
                pathname === item.href ? "text-ivory" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main
        key={pathname}
        className="page-enter mx-auto max-w-4xl px-6 pb-32 pt-20 sm:px-10 sm:pt-28"
      >
        <p
          className="mb-5 text-xs uppercase tracking-[0.34em] text-rose-muted/85"
          style={{ animation: "rise-in 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          {eyebrow}
        </p>
        <h1
          className="font-serif text-[clamp(3rem,9vw,6rem)] font-light leading-[0.98] tracking-[-0.01em]"
          style={{
            animation: "rise-in 0.85s cubic-bezier(0.16,1,0.3,1) 0.08s both",
          }}
        >
          {title}
        </h1>
        {lead ? (
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/60"
            style={{
              animation: "rise-in 0.85s cubic-bezier(0.16,1,0.3,1) 0.16s both",
            }}
          >
            {lead}
          </p>
        ) : null}

        {/* Hairline that grows in under the title. */}
        <div
          className="mt-10 h-px w-full origin-left bg-gradient-to-r from-rose-muted/50 via-ivory/15 to-transparent"
          style={{ animation: "grow-x 1.1s cubic-bezier(0.16,1,0.3,1) 0.24s both" }}
        />

        <div className="mt-14">{children}</div>

        <div className="mt-24 border-t border-ivory/10 pt-8">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm text-ivory/50 transition-colors hover:text-ivory"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">
              ←
            </span>
            back to the beginning
          </Link>
        </div>
      </main>
    </div>
  );
}
