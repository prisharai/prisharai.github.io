import { PageFrame } from "../components/PageFrame";
import { ResearchEntry } from "../components/ResearchEntry";
import { Reveal } from "../components/Reveal";
import { researchEntries } from "../data/site";

export function Research() {
  return (
    <PageFrame
      eyebrow="Computational biology · Agent safety"
      title="Research"
    >
      <div className="space-y-16">
        {researchEntries.map((entry, i) => (
          <Reveal key={entry.title} delay={i * 90}>
            <ResearchEntry entry={entry} index={i} />
          </Reveal>
        ))}
      </div>
    </PageFrame>
  );
}
