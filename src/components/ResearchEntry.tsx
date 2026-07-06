import type { ResearchEntry as ResearchEntryData } from "../data/site";

export function ResearchEntry({ entry }: { entry: ResearchEntryData }) {
  return (
    <article className="border-t border-ivory/12 py-12 first:border-t-0 first:pt-0">
      <h2 className="max-w-3xl font-serif text-[clamp(1.4rem,3vw,2rem)] font-light leading-snug text-ivory">
        {entry.title}
      </h2>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ivory/65">
        {entry.summary}
      </p>

      {entry.status ? (
        <p className="mt-5 inline-block text-xs uppercase tracking-[0.18em] text-rose-muted">
          {entry.status}
        </p>
      ) : null}

      {entry.recognition ? (
        <div className="mt-8">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-ivory/40">
            Presentations &amp; recognition
          </p>
          <ul className="space-y-2">
            {entry.recognition.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-ivory/70"
              >
                <span className="mt-2 h-px w-4 flex-none bg-rose-muted/50" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {entry.links ? (
        <div className="mt-7 flex flex-wrap gap-x-8 gap-y-2">
          {entry.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group text-sm text-ivory/70 transition-colors hover:text-ivory"
            >
              {link.label}
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}
