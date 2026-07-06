import { PageFrame } from "../components/PageFrame";
import { ExperienceEntry } from "../components/ExperienceEntry";
import { experience } from "../data/site";

export function Experience() {
  return (
    <PageFrame
      eyebrow="Experience"
      title="A short, deliberate path through research and engineering."
    >
      <div>
        {experience.map((item) => (
          <ExperienceEntry key={`${item.role}-${item.organization}`} item={item} />
        ))}
      </div>
    </PageFrame>
  );
}
