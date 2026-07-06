import { useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../data/site";

type PageFrameProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export function PageFrame({ eyebrow, title, intro, children }: PageFrameProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-soft-black text-ivory">
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

      <main className="mx-auto max-w-4xl px-6 pb-32 pt-16 sm:px-10 sm:pt-24">
        <p className="mb-4 text-xs uppercase tracking-[0.28em] text-rose-muted/80">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-light leading-[1.08] text-balance">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/65">
            {intro}
          </p>
        ) : null}
        <div className="mt-16">{children}</div>

        <div className="mt-24 border-t border-ivory/10 pt-8">
          <Link
            to="/"
            className="text-sm text-ivory/50 transition-colors hover:text-ivory"
          >
            ← back to the beginning
          </Link>
        </div>
      </main>
    </div>
  );
}
