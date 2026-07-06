import type { ExperienceItem } from "../data/site";

export function ExperienceEntry({ item }: { item: ExperienceItem }) {
  return (
    <article className="relative border-l border-ivory/12 pb-12 pl-8 last:pb-0">
      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-rose-muted/70 bg-soft-black" />
      <p className="text-xs uppercase tracking-[0.2em] text-ivory/40">
        {item.period} · {item.location}
      </p>
      <h2 className="mt-2 font-serif text-xl font-light text-ivory">
        {item.role}
      </h2>
      <p className="mt-1 text-sm text-rose-muted">{item.organization}</p>
      {item.advisor ? (
        <p className="mt-1 text-xs text-ivory/45">{item.advisor}</p>
      ) : null}

      <ul className="mt-4 space-y-2">
        {item.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-2.5 text-sm leading-relaxed text-ivory/65"
          >
            <span className="mt-2 h-px w-3 flex-none bg-rose-muted/40" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noreferrer"
          className="group mt-4 inline-block text-sm text-ivory/70 transition-colors hover:text-ivory"
        >
          {item.link.replace("https://", "")}
          <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
            ↗
          </span>
        </a>
      ) : null}
    </article>
  );
}
