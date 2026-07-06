import { PageFrame } from "../components/PageFrame";
import { ExperienceEntry } from "../components/ExperienceEntry";
import { Reveal } from "../components/Reveal";
import { experience } from "../data/site";

export function Experience() {
  return (
    <PageFrame
      eyebrow="Research & engineering"
      title="Experience"
    >
      <div>
        {experience.map((item, i) => (
          <Reveal key={`${item.role}-${item.organization}`} delay={i * 80}>
            <ExperienceEntry item={item} />
          </Reveal>
        ))}
      </div>
    </PageFrame>
  );
}
