import type { OpenSourceContribution } from "../data/site";

export function OpenSourceContributionCard({
  contribution,
}: {
  contribution: OpenSourceContribution;
}) {
  return (
    <article className="glass-panel interactive-shine relative overflow-hidden rounded-[1.25rem] p-5 sm:p-6">
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-[1.65rem] font-light leading-tight tracking-[-0.02em] text-ivory sm:text-[1.9rem]">
              {contribution.organization}
            </h3>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-faint">
              {contribution.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {contribution.repositories.map((repository) => (
              <a
                key={repository.href}
                href={repository.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/[0.11] bg-white/[0.04] px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:border-rose-muted/30 hover:text-ivory"
              >
                {repository.label} ↗
              </a>
            ))}
          </div>
        </div>

        <ul className="mt-5 space-y-3">
          {contribution.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 text-[12px] leading-[1.65] text-ink-soft sm:text-[13px]"
            >
              <span className="mt-[.7rem] h-px w-5 shrink-0 bg-gradient-to-r from-rose-deep/80 to-transparent" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
