import type { Project } from "../data/site";

export function ProjectTile({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col border border-ivory/12 bg-ivory/[0.02] p-7 transition-colors duration-300 hover:border-ivory/25">
      <p className="text-xs uppercase tracking-[0.2em] text-rose-muted/85">
        {project.kind}
      </p>
      <h2 className="mt-3 font-serif text-2xl font-light leading-snug text-ivory">
        {project.title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-ivory/65">
        {project.summary}
      </p>

      {project.details ? (
        <ul className="mt-5 space-y-1.5">
          {project.details.map((detail) => (
            <li
              key={detail}
              className="flex gap-2.5 text-[13px] leading-relaxed text-ivory/55"
            >
              <span className="mt-2 h-px w-3 flex-none bg-rose-muted/50" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-6">
        {project.tags ? (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ivory/15 px-3 py-1 text-[11px] tracking-wide text-ivory/55"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {project.links ? (
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {project.links.map((link) => (
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
          </div>
        ) : null}
      </div>
    </article>
  );
}
