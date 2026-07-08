import { useRef, type ReactNode } from "react";
import type { Project } from "../data/site";

const asset = (name: string) => `${import.meta.env.BASE_URL || "/"}${name}`;

/**
 * A card that tracks the pointer and lets a soft blush spotlight follow it,
 * plus a gentle tilt-free lift. Purely decorative — pointer-driven CSS vars,
 * no state, so it stays cheap and never blocks scroll.
 */
function Spotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-porcelain/70 transition-all duration-500 hover:-translate-y-1 hover:border-rose-deep/40 hover:shadow-[0_28px_70px_-34px_rgba(21,31,49,0.4)] ${className}`}
    >
      {/* Blush spotlight that follows the cursor. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx,50%) var(--my,0%), rgba(202,177,187,0.28), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}

function Index({ n }: { n: number }) {
  return (
    <span className="font-serif text-[13px] font-light tracking-[0.2em] text-rose-deep/70">
      {String(n).padStart(2, "0")}
    </span>
  );
}

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
          className="rounded-full border border-line px-3 py-1 text-[11px] tracking-wide text-ink-soft transition-colors group-hover:border-rose-deep/25"
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
          className="group/link relative text-sm font-medium text-ink transition-colors hover:text-rose-deep"
        >
          {link.label}
          <span className="ml-1 inline-block transition-transform group-hover/link:translate-x-0.5">
            ↗
          </span>
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-rose-deep transition-all duration-300 group-hover/link:w-[calc(100%-1.1rem)]" />
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
    <div className={`${aspect} overflow-hidden rounded-xl border border-line bg-porcelain`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
      />
    </div>
  );
}

/** Full-width feature panel — image beside text, or a two-column detail spread. */
function FeaturedTile({ project, index }: { project: Project; index: number }) {
  const hasImage = Boolean(project.image);
  const meta = (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
      {project.tags ? <Tags tags={project.tags} /> : null}
      {project.links ? <Links links={project.links} /> : null}
    </div>
  );

  return (
    <Spotlight className="p-6 sm:p-9">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Left: identity. */}
        <div>
          <div className="flex items-center gap-4">
            <Index n={index} />
            <span className="h-px flex-1 origin-left bg-line transition-transform duration-500 group-hover:scale-x-110" />
            <Kind>{project.kind}</Kind>
          </div>
          <h2 className="mt-4 font-serif text-[clamp(1.9rem,3.6vw,2.75rem)] font-light leading-[1.06] text-ink">
            {project.title}
          </h2>
          <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-ink-soft">
            {project.summary}
          </p>
          {hasImage ? <div className="mt-7">{meta}</div> : null}
        </div>

        {/* Right: image, or the detail list + meta. */}
        {hasImage ? (
          <Figure src={asset(project.image!)} alt={project.title} aspect="aspect-[5/4]" />
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
    </Spotlight>
  );
}

/** Standard card — image on top, then the essentials. */
function StandardTile({ project, index }: { project: Project; index: number }) {
  return (
    <Spotlight className="flex h-full flex-col p-6">
      {project.image ? (
        <div className="mb-6">
          <Figure src={asset(project.image)} alt={project.title} />
        </div>
      ) : null}

      <div className="flex items-center gap-4">
        <Index n={index} />
        <Kind>{project.kind}</Kind>
      </div>
      <h2 className="mt-3 font-serif text-[1.5rem] font-light leading-snug text-ink">
        {project.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.summary}</p>

      <div className="mt-auto pt-6">
        {project.tags ? <Tags tags={project.tags} /> : null}
        {project.links ? (
          <div className="mt-4">
            <Links links={project.links} />
          </div>
        ) : null}
      </div>
    </Spotlight>
  );
}

export function ProjectTile({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return project.featured ? (
    <FeaturedTile project={project} index={index} />
  ) : (
    <StandardTile project={project} index={index} />
  );
}
