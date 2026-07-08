import type { ResearchEntry as ResearchEntryData } from "../data/site";

function FormatChip({ format }: { format: string }) {
  const isTalk = /talk|oral/i.test(format);
  return (
    <span
      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] ${
        isTalk
          ? "border-rose-deep/40 bg-rose-tint/50 text-rose-deep"
          : "border-line text-ink-faint"
      }`}
    >
      {format}
    </span>
  );
}

export function ResearchEntry({
  entry,
  index,
}: {
  entry: ResearchEntryData;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="relative py-12">
      {/* Header: index + field, with a compact stat rail on the right. */}
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-2xl font-light text-rose-deep/60">
            {num}
          </span>
          <span className="mt-1 text-[11px] uppercase tracking-[0.28em] text-rose-deep">
            {entry.field}
          </span>
        </div>

        {entry.facts ? (
          <dl className="flex gap-8">
            {entry.facts.map((f) => (
              <div key={f.label} className="text-right">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-serif text-2xl font-light leading-none text-ink">
                  {f.value}
                </dd>
                <span className="mt-1.5 block text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  {f.label}
                </span>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      {/* Title + short-measure summary. */}
      <h2 className="mt-6 max-w-3xl font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] font-light leading-[1.12] text-ink">
        {entry.title}
      </h2>
      <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-ink-soft">
        {entry.summary}
      </p>

      {/* Links + status sit on one tidy row. */}
      {(entry.links || entry.status) && (
        <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
          {entry.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group text-sm font-medium text-ink transition-colors hover:text-rose-deep"
            >
              {link.label}
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ))}
          {entry.status ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-deep/30 bg-rose-tint/40 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-rose-deep">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-deep" />
              {entry.status}
            </span>
          ) : null}
        </div>
      )}

      {/* Presentations as a scannable grid, not a run-on list. */}
      {entry.presentations ? (
        <div className="mt-10">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-ink-faint">
            Presented at
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {entry.presentations.map((p) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-serif text-lg font-light text-ink">
                      {p.venue}
                    </span>
                    <FormatChip format={p.format} />
                  </div>
                  <p className="mt-1.5 text-[13px] text-ink-soft">
                    {p.host} · {p.date}
                  </p>
                  {p.note ? (
                    <p className="mt-2 text-[12px] leading-snug text-ink-faint">
                      {p.note}
                    </p>
                  ) : null}
                  {p.href ? (
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[12px] font-medium text-rose-deep">
                      Watch recording
                      <span className="inline-block transition-transform group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </span>
                  ) : null}
                </>
              );
              const cardClass =
                "flex h-full flex-col rounded-xl border border-line bg-porcelain/70 p-4 transition-all duration-300 hover:border-rose-deep/30 hover:shadow-[0_12px_32px_-20px_rgba(21,31,49,0.28)]";
              return (
                <li key={`${p.venue}-${p.date}`}>
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`group ${cardClass}`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cardClass}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {/* Awards, called out with warmth instead of buried in a bullet list. */}
      {entry.awards ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {entry.awards.map((a) => (
            <div
              key={a.label}
              className="flex items-start gap-3 rounded-xl border border-rose-deep/25 bg-rose-tint/50 p-4"
            >
              <span aria-hidden className="mt-0.5 text-rose-deep">
                ✦
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{a.label}</p>
                {a.detail ? (
                  <p className="mt-0.5 text-[12px] text-ink-soft">{a.detail}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Secondary honors — kept deliberately small and quiet. */}
      {entry.minorAwards ? (
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {entry.minorAwards.map((a) => (
            <li
              key={a}
              className="flex items-center gap-2 text-[12px] text-ink-faint"
            >
              <span aria-hidden className="text-rose-deep/60">
                ·
              </span>
              {a}
            </li>
          ))}
        </ul>
      ) : null}

      {/* Outreach — a small footnote at the base of the entry. */}
      {entry.outreach ? (
        <div className="mt-8 border-t border-line pt-5">
          <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-ink-faint">
            Science outreach
          </p>
          {entry.outreach.map((o) => (
            <p key={o.label} className="text-[12px] leading-relaxed text-ink-soft">
              {o.href ? (
                <a
                  href={o.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-ink transition-colors hover:text-rose-deep"
                >
                  {o.label} ↗
                </a>
              ) : (
                <span className="font-medium text-ink">{o.label}</span>
              )}
              {o.detail ? <span className="text-ink-faint"> — {o.detail}</span> : null}
            </p>
          ))}
        </div>
      ) : null}
    </article>
  );
}
