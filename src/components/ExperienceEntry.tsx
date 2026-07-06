import type { ExperienceItem } from "../data/site";

export function ExperienceEntry({ item }: { item: ExperienceItem }) {
  return (
    <article className="grid gap-x-10 gap-y-4 py-10 sm:grid-cols-[minmax(0,11rem)_1fr]">
      {/* Left rail: when + where. */}
      <div className="sm:pt-1">
        <p className="text-[13px] font-medium text-ink">{item.period}</p>
        <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-ink-faint">
          {item.location}
        </p>
      </div>

      {/* Right: role, organization, work. */}
      <div>
        <h2 className="font-serif text-[1.4rem] font-light leading-snug text-ink">
          {item.role}
        </h2>
        <p className="mt-1 text-sm font-medium text-rose-deep">
          {item.organization}
        </p>
        {item.advisor ? (
          <p className="mt-1 text-xs text-ink-faint">{item.advisor}</p>
        ) : null}

        <ul className="mt-4 space-y-2.5">
          {item.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 text-[15px] leading-relaxed text-ink-soft"
            >
              <span className="mt-2.5 h-px w-3.5 flex-none bg-rose-deep/45" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="group mt-4 inline-block text-sm font-medium text-ink transition-colors hover:text-rose-deep"
          >
            {item.link.replace("https://", "")}
            <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
