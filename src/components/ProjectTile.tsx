import type { ReactNode } from "react";
import type { Project } from "../data/site";

const asset = (name: string) => `${import.meta.env.BASE_URL || "/"}${name}`;

function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`glass-panel interactive-shine group relative overflow-hidden rounded-[1.5rem] transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-rose-muted/25 hover:shadow-[0_30px_80px_-42px_rgba(118,151,190,.36)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(500px circle at 50% 0%, rgba(139,174,207,.11), transparent 62%)" }}
      />
      {children}
    </div>
  );
}

function Index({ n }: { n: number }) {
  return <span className="font-serif text-sm font-light tracking-[0.2em] text-rose-muted/75">{String(n).padStart(2, "0")}</span>;
}

function Kind({ children }: { children: string }) {
  return <p className="text-[9px] uppercase tracking-[0.25em] text-ink-faint sm:text-[10px]">{children}</p>;
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full border border-white/[0.11] bg-white/[0.025] px-3 py-1.5 text-[10px] tracking-wide text-ink-soft transition-colors group-hover:border-rose-muted/20 group-hover:text-ivory/85">
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
        <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="group/link relative text-xs font-medium uppercase tracking-[0.12em] text-ivory/85 transition-colors hover:text-rose-deep">
          {link.label}<span className="ml-1.5 inline-block transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5">↗</span>
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-rose-deep transition-all duration-300 group-hover/link:w-[calc(100%-1.1rem)]" />
        </a>
      ))}
    </div>
  );
}

function Figure({ src, alt, aspect = "aspect-[16/10]" }: { src: string; alt: string; aspect?: string }) {
  return (
    <div className={`relative ${aspect} overflow-hidden rounded-[1.15rem] border border-white/[0.09] bg-bone`}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover saturate-[.72] transition-all duration-[1200ms] ease-out group-hover:scale-[1.045] group-hover:saturate-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-bone/45 via-transparent to-bloom-blue/[0.06] mix-blend-color" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.05]" />
    </div>
  );
}

function SystemMap({ details }: { details: string[] }) {
  return (
    <div className="relative min-h-[17rem] overflow-hidden rounded-[1.1rem] border border-white/[0.08] bg-bone/45 p-5 sm:p-6">
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bloom-blue/[0.13]" style={{ animation: "orbit 30s linear infinite" }}>
        <span className="absolute -right-1 top-1/2 h-2 w-2 rounded-full bg-bloom-blue shadow-[0_0_15px_rgba(143,174,203,.8)]" />
      </div>
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose-muted/[0.14]" style={{ animation: "orbit 18s linear infinite reverse" }}>
        <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-rose-deep shadow-[0_0_15px_rgba(229,175,200,.8)]" />
      </div>
      <div className="relative z-10 flex min-h-[14rem] flex-col items-center justify-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-rose-muted/25 bg-rose-tint/65 shadow-[0_0_50px_rgba(229,175,200,.12)]">
          <span className="h-2 w-2 rounded-full bg-rose-deep shadow-[0_0_14px_rgba(229,175,200,.75)]" />
        </div>
        <ul className="mt-6 grid w-full grid-cols-2 gap-x-5 gap-y-1.5 text-left">
          {details.slice(0, 6).map((detail) => (
            <li key={detail} className="flex gap-2 text-[10px] leading-relaxed text-ink-faint sm:text-[11px]">
              <span className="mt-2 h-px w-2 shrink-0 bg-rose-deep/60" />{detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FeaturedTile({ project, index }: { project: Project; index: number }) {
  return (
    <Spotlight className="p-5 sm:p-6 lg:p-7">
      <div className="relative z-10 grid items-center gap-7 lg:grid-cols-[.95fr_1.05fr] lg:gap-10">
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-4"><Index n={index} /><span className="h-px flex-1 bg-white/[0.09]" /><Kind>{project.kind}</Kind></div>
          <h2 className="mt-5 font-serif text-[clamp(1.9rem,3.8vw,3.15rem)] font-light leading-[1.02] tracking-[-0.03em] text-ivory">{project.title}</h2>
          <p className="mt-4 max-w-[49ch] text-[13px] leading-[1.75] text-ink-soft">{project.summary}</p>
          <div className="mt-6 space-y-4">
            {project.tags ? <Tags tags={project.tags} /> : null}
            {project.links ? <Links links={project.links} /> : null}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          {project.image ? <Figure src={asset(project.image)} alt={project.title} aspect="aspect-[16/10]" /> : <SystemMap details={project.details || []} />}
        </div>
      </div>
    </Spotlight>
  );
}

function StandardTile({ project, index }: { project: Project; index: number }) {
  return (
    <Spotlight className="flex h-full flex-col p-5 sm:p-6">
      <div className="relative z-10 flex h-full flex-col">
        {project.image ? <div className="mb-5"><Figure src={asset(project.image)} alt={project.title} /></div> : (
          <div className="mb-5 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[1.1rem] border border-white/[0.08] bg-[radial-gradient(circle_at_50%_50%,rgba(229,175,200,.13),transparent_60%)]">
            <span className="font-serif text-[5rem] font-light text-white/[0.055] transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-110">{String(index).padStart(2, "0")}</span>
          </div>
        )}
        <div className="flex items-center gap-4"><Index n={index} /><Kind>{project.kind}</Kind></div>
        <h2 className="mt-3 font-serif text-[1.55rem] font-light leading-[1.08] tracking-[-0.02em] text-ivory">{project.title}</h2>
        <p className="mt-3 text-[12px] leading-[1.7] text-ink-soft">{project.summary}</p>
        <div className="mt-auto pt-5">
          {project.tags ? <Tags tags={project.tags} /> : null}
          {project.links ? <div className="mt-5"><Links links={project.links} /></div> : null}
        </div>
      </div>
    </Spotlight>
  );
}

export function ProjectTile({ project, index }: { project: Project; index: number }) {
  return project.featured ? <FeaturedTile project={project} index={index} /> : <StandardTile project={project} index={index} />;
}
