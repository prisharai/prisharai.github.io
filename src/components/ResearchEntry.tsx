import type { ResearchEntry as ResearchEntryData } from "../data/site";

function FormatChip({ format }: { format: string }) {
  const isTalk = /talk|oral/i.test(format);
  return (
    <span
      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] ${
        isTalk
          ? "border-rose-muted/40 text-rose-muted"
          : "border-ivory/20 text-ivory/55"
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
    <article className="relative border-t border-ivory/12 pt-10 first:border-t-0 first:pt-0">
      {/* Header: index + field, with a compact stat rail on the right. */}
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-2xl font-light text-rose-muted/50">
            {num}
          </span>
          <span className="mt-1 text-[11px] uppercase tracking-[0.28em] text-rose-muted/85">
            {entry.field}
          </span>
        </div>

        {entry.facts ? (
          <dl className="flex gap-7">
            {entry.facts.map((f) => (
              <div key={f.label} className="text-right">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-serif text-2xl font-light leading-none text-ivory">
                  {f.value}
                </dd>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-ivory/40">
                  {f.label}
                </span>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      {/* Title + short-measure summary. */}
      <h2 className="mt-6 max-w-3xl font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] font-light leading-[1.12] text-ivory">
        {entry.title}
      </h2>
      <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ivory/60">
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
              className="group text-sm text-ivory/75 transition-colors hover:text-ivory"
            >
              {link.label}
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ))}
          {entry.status ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-muted/30 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-rose-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-muted" />
              {entry.status}
            </span>
          ) : null}
        </div>
      )}

      {/* Presentations as a scannable grid, not a run-on list. */}
      {entry.presentations ? (
        <div className="mt-9">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-ivory/40">
            Presented at
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {entry.presentations.map((p) => (
              <li
                key={`${p.venue}-${p.date}`}
                className="rounded-lg border border-ivory/10 bg-ivory/[0.02] p-4 transition-colors hover:border-ivory/25"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-serif text-lg font-light text-ivory">
                    {p.venue}
                  </span>
                  <FormatChip format={p.format} />
                </div>
                <p className="mt-1.5 text-[13px] text-ivory/50">
                  {p.host} · {p.date}
                </p>
                {p.note ? (
                  <p className="mt-2 text-[12px] leading-snug text-ivory/40">
                    {p.note}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Awards, called out with warmth instead of buried in a bullet list. */}
      {entry.awards ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {entry.awards.map((a) => (
            <div
              key={a.label}
              className="flex items-start gap-3 rounded-lg border border-rose-muted/25 bg-rose-muted/[0.06] p-4"
            >
              <span aria-hidden className="mt-0.5 text-rose-muted">
                ✦
              </span>
              <div>
                <p className="text-sm font-medium text-ivory">{a.label}</p>
                {a.detail ? (
                  <p className="mt-0.5 text-[12px] text-ivory/50">{a.detail}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
