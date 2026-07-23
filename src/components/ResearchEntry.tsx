import type { ResearchEntry as ResearchEntryData } from "../data/site";

function FormatChip({ format }: { format: string }) {
  const highlight = /talk|oral/i.test(format);
  return (
    <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[8px] uppercase tracking-[0.16em] ${highlight ? "border-rose-deep/35 bg-rose-tint/65 text-rose-deep" : "border-white/[0.1] text-ink-faint"}`}>
      {format}
    </span>
  );
}

function ArrowLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group relative text-[10px] font-medium uppercase tracking-[0.16em] text-ivory/85 transition-colors hover:text-rose-deep">
      {label}<span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
    </a>
  );
}

export function ResearchEntry({ entry, index }: { entry: ResearchEntryData; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="relative grid gap-6 border-t border-white/[0.1] py-10 first:border-t-0 first:pt-0 sm:py-14 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-9">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <span className="font-serif text-[3.5rem] font-light leading-none tracking-[-0.05em] text-white/[0.07]">{num}</span>
        <p className="mt-2 text-[9px] uppercase tracking-[0.26em] text-rose-deep">{entry.field}</p>
      </div>

      <div className="min-w-0">
        <div className={entry.facts ? "grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto]" : ""}>
          <div>
            <h2 className="max-w-4xl font-serif text-[clamp(1.75rem,4vw,3.25rem)] font-light leading-[1.06] tracking-[-0.03em] text-ivory">{entry.title}</h2>
            <p className="mt-4 max-w-[58ch] text-[13px] leading-[1.7] text-ink-soft sm:text-[14px]">{entry.summary}</p>
          </div>

          {entry.facts ? (
            <dl className="flex items-start gap-6 border-l border-white/[0.1] pl-6 xl:mt-1">
              {entry.facts.map((fact) => (
                <div key={fact.label}>
                  <dd className="font-serif text-2xl font-light leading-none text-ivory">{fact.value}</dd>
                  <dt className="mt-2 text-[8px] uppercase tracking-[0.18em] text-ink-faint">{fact.label}</dt>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        {(entry.links || entry.status) ? (
          <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
            {entry.links?.map((link) => <ArrowLink key={link.href} label={link.label} href={link.href} />)}
            {entry.status ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-deep/25 bg-rose-tint/50 px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-rose-deep">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-deep shadow-[0_0_10px_rgba(229,175,200,.75)]" />{entry.status}
              </span>
            ) : null}
          </div>
        ) : null}

        {entry.presentations ? (
          <section className="mt-9">
            <div className="mb-4 flex items-center gap-4">
              <p className="text-[9px] uppercase tracking-[0.27em] text-ink-faint">Presented at</p>
              <span className="h-px flex-1 bg-gradient-to-r from-white/[0.1] to-transparent" />
            </div>
            <ul className="grid gap-px overflow-hidden rounded-[1.25rem] border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2 xl:grid-cols-3">
              {entry.presentations.map((presentation) => {
                const content = (
                  <>
                    <div className="relative flex items-center justify-between gap-3"><span className="font-serif text-lg font-light text-ivory">{presentation.venue}</span><FormatChip format={presentation.format} /></div>
                    <p className="relative mt-2 text-[10px] leading-relaxed text-ink-soft">{presentation.host}</p>
                    <p className="relative mt-1 text-[9px] uppercase tracking-[0.14em] text-ink-faint">{presentation.date}</p>
                    {presentation.note ? <p className="relative mt-3 text-[9px] leading-relaxed text-ink-faint">{presentation.note}</p> : null}
                    {presentation.href ? <span className="relative mt-auto pt-3 text-[9px] uppercase tracking-[0.16em] text-rose-deep">Watch recording ↗</span> : null}
                  </>
                );
                const classes = "group relative flex min-h-[9.5rem] flex-col overflow-hidden bg-[#0c1727]/95 p-4 transition-colors duration-500 hover:bg-[#142239]";
                return <li key={`${presentation.venue}-${presentation.date}`}>{presentation.href ? <a href={presentation.href} target="_blank" rel="noreferrer" className={classes}>{content}</a> : <div className={classes}>{content}</div>}</li>;
              })}
            </ul>
          </section>
        ) : null}

        {entry.awards ? (
          <section className="mt-4 grid gap-3 sm:grid-cols-2">
            {entry.awards.map((award) => (
              <div key={award.label} className="glass-panel flex items-start gap-3 rounded-[1rem] p-4">
                <span className="mt-0.5 text-lg text-rose-deep">✦</span>
                <div><p className="text-sm font-medium text-ivory">{award.label}</p>{award.detail ? <p className="mt-1 text-[10px] leading-relaxed text-ink-faint">{award.detail}</p> : null}</div>
              </div>
            ))}
          </section>
        ) : null}

        {entry.minorAwards ? (
          <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
            {entry.minorAwards.map((award) => <li key={award} className="flex gap-2.5 text-[10px] leading-relaxed text-ink-faint"><span className="text-rose-deep/65">—</span>{award}</li>)}
          </ul>
        ) : null}

        {entry.outreach ? (
          <div className="mt-6 border-t border-white/[0.08] pt-4">
            <p className="mb-2 text-[8px] uppercase tracking-[0.24em] text-ink-faint">Science outreach</p>
            {entry.outreach.map((outreach) => (
              <p key={outreach.label} className="text-[11px] leading-relaxed text-ink-soft">
                {outreach.href ? <a href={outreach.href} target="_blank" rel="noreferrer" className="text-ivory hover:text-rose-deep">{outreach.label} ↗</a> : <span className="text-ivory">{outreach.label}</span>}
                {outreach.detail ? <span className="text-ink-faint"> — {outreach.detail}</span> : null}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
