import type { CSSProperties } from "react";
import Link from "next/link";
import type { Project } from "../data/site";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      className="work-card"
      href={project.href}
      style={{ "--project-swatch": project.swatch } as CSSProperties}
      data-cursor
    >
      <span className="project-swatch" aria-hidden="true">
        {project.imageLabel ? (
          <span className="project-image-label">{project.imageLabel}</span>
        ) : null}
      </span>
      <span className="project-kind">{project.kind}</span>
      <span className="project-title">{project.title}</span>
      <span className="project-summary">{project.summary}</span>
    </Link>
  );
}
