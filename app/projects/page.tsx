import { PageIntro } from "../components/PageIntro";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/site";

export default function ProjectsPage() {
  return (
    <section className="page-content page-content-wide">
      <PageIntro eyebrow="projects" title="keeping myself busy" />

      <div className="work-grid full-grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.title} />
        ))}
      </div>
    </section>
  );
}
