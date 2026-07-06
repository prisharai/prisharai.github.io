import { PageFrame } from "../components/PageFrame";
import { ProjectTile } from "../components/ProjectTile";
import { projects } from "../data/site";

export function Projects() {
  return (
    <PageFrame
      eyebrow="Projects"
      title="Things I’ve built, kept small and honest."
      intro="Research tools, safety infrastructure, and coursework — represented on equal footing."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectTile key={project.title} project={project} />
        ))}
      </div>
    </PageFrame>
  );
}
