import { PageFrame } from "../components/PageFrame";
import { ProjectTile } from "../components/ProjectTile";
import { Reveal } from "../components/Reveal";
import { projects } from "../data/site";

export function Projects() {
  return (
    <PageFrame
      eyebrow="Software · Research tools · Coursework"
      title="Projects"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.title}
            delay={(i % 2) * 80 + Math.floor(i / 2) * 60}
            className="h-full"
          >
            <ProjectTile project={project} />
          </Reveal>
        ))}
      </div>
    </PageFrame>
  );
}
