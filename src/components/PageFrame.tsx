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
    <div className="relative min-h-screen text-ink">
      <Starfield />

      {/* Light, unobtrusive header — a mark and chapter links, never a navbar. */}
      <header className="mx-auto flex max-w-5xl flex-col gap-3 px-6 pt-7 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:pt-9">
        <Link
          to="/"
          className="font-serif text-lg tracking-wide text-ink transition-opacity hover:opacity-60"
        >
          pr15ha
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-ink-faint sm:gap-x-7 sm:text-xs sm:tracking-[0.16em]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`transition-colors hover:text-rose-deep ${
                pathname === item.href ? "text-ink" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main
        key={pathname}
        className="page-enter mx-auto max-w-5xl px-6 pb-28 pt-16 sm:px-10 sm:pb-40 sm:pt-24"
      >
        <p
          className="mb-5 text-[11px] uppercase tracking-[0.32em] text-rose-deep sm:text-xs"
          style={{ animation: "rise-in 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          {eyebrow}
        </p>
        <h1
          className="font-serif text-[clamp(2.75rem,8.5vw,5.75rem)] font-light leading-[0.98] tracking-[-0.015em] text-ink"
          style={{
            animation: "rise-in 0.85s cubic-bezier(0.16,1,0.3,1) 0.08s both",
          }}
        >
          {title}
        </h1>
        {lead ? (
          <p
            className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft"
            style={{
              animation: "rise-in 0.85s cubic-bezier(0.16,1,0.3,1) 0.16s both",
            }}
          >
            {lead}
          </p>
        ) : null}

        {/* Hairline that grows in under the title. */}
        <div
          className="mt-10 h-px w-full origin-left bg-gradient-to-r from-rose-deep/45 via-line to-transparent"
          style={{ animation: "grow-x 1.1s cubic-bezier(0.16,1,0.3,1) 0.24s both" }}
        />

        <div className="mt-14 sm:mt-16">{children}</div>

        <div className="mt-24 border-t border-line pt-8">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
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
