import type { ExperienceItem } from "../data/site";

export function ExperienceEntry({ item }: { item: ExperienceItem }) {
  const base = import.meta.env.BASE_URL || "/";

  return (
    <article className="group relative grid gap-4 pb-9 pl-9 sm:pl-12 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-8 lg:pb-10">
      <span className="absolute left-0 top-2 z-10 flex h-4 w-4 items-center justify-center rounded-full border border-rose-muted/35 bg-bone shadow-[0_0_0_7px_rgba(8,17,31,1)] sm:left-1">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-deep opacity-60 shadow-[0_0_12px_rgba(229,175,200,.65)] transition-opacity duration-500 group-hover:opacity-100" />
      </span>

      <div className="lg:pt-1">
        <p className="font-serif text-[15px] font-light text-ivory">{item.period}</p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-ink-faint">{item.location}</p>
      </div>

      <div className="glass-panel interactive-shine relative overflow-hidden rounded-[1.25rem] p-5 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-rose-muted/25 group-hover:shadow-[0_28px_75px_-42px_rgba(118,151,190,.3)] sm:p-6">
        {item.logo ? (
          <div className="absolute right-4 top-4 z-10 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.94] p-2 shadow-[0_12px_30px_rgba(0,0,0,.18)] sm:right-5 sm:top-5 sm:h-[4.5rem] sm:w-[4.5rem] sm:p-2.5 lg:right-6 lg:top-1/2 lg:-translate-y-1/2">
            <img
              src={`${base}${item.logo}`}
              alt={item.logoAlt || `${item.organization} logo`}
              className={`h-full w-full ${item.organization.includes("New York University") ? "scale-[1.45] object-cover" : "object-contain"}`}
            />
          </div>
        ) : null}

        <div className={`relative z-10 ${item.logo ? "pr-16 sm:pr-24 lg:pr-28" : ""}`}>
          <p className="text-[9px] uppercase tracking-[0.24em] text-rose-deep">{item.organization}</p>
          <h2 className="mt-2 font-serif text-[clamp(1.45rem,2.8vw,2.1rem)] font-light leading-[1.08] tracking-[-0.02em] text-ivory">{item.role}</h2>
          {item.advisor ? <p className="mt-2 text-[10px] uppercase tracking-[0.1em] text-ink-faint">{item.advisor}</p> : null}

          <ul className="mt-5 space-y-2.5">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-[12px] leading-[1.65] text-ink-soft sm:text-[13px]">
                <span className="mt-[.7rem] h-px w-5 shrink-0 bg-gradient-to-r from-rose-deep/80 to-transparent" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {item.link ? (
            <a href={item.link} target="_blank" rel="noreferrer" className="group/link mt-5 inline-flex items-center gap-2 text-[10px] font-medium text-ivory transition-colors hover:text-rose-deep">
              {item.link.includes("github.com") ? item.link.replace("https://", "") : "View Report"}
              <span className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
