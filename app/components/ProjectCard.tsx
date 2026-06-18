import type { CSSProperties } from "react";
import Image from "next/image";
import type { Project } from "../data/site";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="work-card"
      style={{ "--project-swatch": project.swatch } as CSSProperties}
    >
      <span className="project-swatch">
        {project.imageSrc ? (
          <Image
            src={project.imageSrc}
            alt={project.imageAlt ?? `${project.title} preview`}
            fill
            sizes="(max-width: 860px) 92vw, (max-width: 1200px) 32vw, 360px"
            className="project-image"
          />
        ) : project.imageLabel ? (
          <span className="project-image-label">{project.imageLabel}</span>
        ) : null}
      </span>
      <span className="project-kind">{project.kind}</span>
      <span className="project-title">{project.title}</span>
      <span className="project-summary">{project.summary}</span>
      {project.links ? (
        <span className="project-links">
          {project.links.map((link) => (
            <a
              href={link.href}
              key={link.href}
              target="_blank"
              rel="noreferrer"
              data-cursor
            >
              {link.label}
            </a>
          ))}
        </span>
      ) : null}
    </article>
  );
}
