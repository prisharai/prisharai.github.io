import Link from "next/link";
import { ProjectCard } from "./components/ProjectCard";
import { projects } from "./data/site";

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="headline">
        <div className="hero-copy">
          <p className="eyebrow">portfolio / software / design</p>
          <h1 id="headline">pr15ha</h1>
          <p className="tagline">
            Hi I&apos;m Prisha. I&apos;m pursuing a B.S. and M.Eng. in Computer
            Science from Cornell University. I&apos;m interested in work that builds
            off of visual understanding for scalable infrastructure.
          </p>
          <div className="hero-actions">
            <Link href="/projects" className="text-link" data-cursor>
              view work
            </Link>
            <Link href="/contact" className="text-link muted" data-cursor>
              get in touch
            </Link>
          </div>
          <p className="hero-bloom-note">click the flower for more</p>
        </div>
      </section>

      <section className="work" id="work" aria-labelledby="featured-work">
        <div className="section-heading">
          <p className="eyebrow">selected work</p>
          <h2 id="featured-work" className="sr-only">
            selected work
          </h2>
        </div>
        <div className="work-grid">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard project={project} key={project.title} />
          ))}
        </div>
      </section>
    </>
  );
}
