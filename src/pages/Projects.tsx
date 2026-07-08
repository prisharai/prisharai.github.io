import { PageFrame } from "../components/PageFrame";
import { ProjectTile } from "../components/ProjectTile";
import { Reveal } from "../components/Reveal";
import { projects } from "../data/site";

export function Projects() {
  return (
    <PageFrame
      eyebrow="Software · Research tools · Coursework"
      title="Projects"
      lead="Work across AI safety, computational biology, computer vision, and coursework."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.title}
            delay={(i % 2) * 70 + 40}
            className={project.featured ? "sm:col-span-2" : "h-full"}
          >
            <ProjectTile project={project} index={i + 1} />
          </Reveal>
        ))}
      </div>
    </PageFrame>
  );
}
