import { PageIntro } from "../components/PageIntro";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/site";

export default function ProjectsPage() {
  return (
    <section className="page-content page-content-wide projects-page">
      <PageIntro eyebrow="projects" title="keeping myself busy">
        <p>
          A small project garden of research, software systems, and things I am
          still growing.
        </p>
      </PageIntro>

      <div className="work-grid full-grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.title} />
        ))}
      </div>
    </section>
  );
}
