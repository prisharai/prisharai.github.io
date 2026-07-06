import type { Project } from "../data/site";

const asset = (name: string) => `${import.meta.env.BASE_URL || "/"}${name}`;

function Kind({ children }: { children: string }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.2em] text-rose-deep">
      {children}
    </p>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-line px-3 py-1 text-[11px] tracking-wide text-ink-soft"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function Links({ links }: { links: NonNullable<Project["links"]> }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {links.map((link) => (
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
    </div>
  );
}

function Figure({
  src,
  alt,
  aspect = "aspect-[16/10]",
}: {
  src: string;
  alt: string;
  aspect?: string;
}) {
  return (
    <div
      className={`${aspect} overflow-hidden rounded-xl border border-line bg-porcelain`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}

/** Full-width feature panel — image beside text, or a two-column detail spread. */
function FeaturedTile({ project }: { project: Project }) {
  const hasImage = Boolean(project.image);
  const meta = (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
      {project.tags ? <Tags tags={project.tags} /> : null}
      {project.links ? <Links links={project.links} /> : null}
    </div>
  );

  return (
    <article className="group rounded-2xl border border-line bg-porcelain/70 p-6 transition-all duration-300 hover:border-rose-deep/30 hover:shadow-[0_16px_50px_-24px_rgba(42,36,33,0.28)] sm:p-9">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Left: identity. */}
        <div>
          <Kind>{project.kind}</Kind>
          <h2 className="mt-3 font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-[1.08] text-ink">
            {project.title}
          </h2>
          <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-ink-soft">
            {project.summary}
          </p>
          {/* When an image occupies the right column, meta lives here. */}
          {hasImage ? <div className="mt-7">{meta}</div> : null}
        </div>

        {/* Right: image, or the detail list + meta. */}
        {hasImage ? (
          <Figure
            src={asset(project.image!)}
            alt={project.title}
            aspect="aspect-[5/4]"
          />
        ) : (
          <div>
            {project.details ? (
              <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {project.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex gap-2.5 text-[13px] leading-relaxed text-ink-soft"
                  >
                    <span className="mt-2 h-px w-3 flex-none bg-rose-deep/55" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-7">{meta}</div>
          </div>
        )}
      </div>
    </article>
  );
}

/** Standard card — image on top, then the essentials. */
function StandardTile({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-porcelain/70 p-6 transition-all duration-300 hover:border-rose-deep/30 hover:shadow-[0_16px_50px_-24px_rgba(42,36,33,0.28)]">
      {project.image ? (
        <div className="mb-6">
          <Figure src={asset(project.image)} alt={project.title} />
        </div>
      ) : null}

      <Kind>{project.kind}</Kind>
      <h2 className="mt-3 font-serif text-[1.5rem] font-light leading-snug text-ink">
        {project.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {project.summary}
      </p>

      <div className="mt-auto pt-6">
        {project.tags ? <Tags tags={project.tags} /> : null}
        {project.links ? (
          <div className="mt-4">
            <Links links={project.links} />
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function ProjectTile({ project }: { project: Project }) {
  return project.featured ? (
    <FeaturedTile project={project} />
  ) : (
    <StandardTile project={project} />
  );
}
