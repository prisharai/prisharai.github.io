import { PageFrame } from "../components/PageFrame";
import { ResearchEntry } from "../components/ResearchEntry";
import { Reveal } from "../components/Reveal";
import { researchEntries } from "../data/site";

export function Research() {
  return (
    <PageFrame
      eyebrow="Computational Biology · SQL Infrastructure"
      title="Research"
    >
      <div className="divide-y divide-line [&>*:first-child>article]:pt-0">
        {researchEntries.map((entry, i) => (
          <Reveal key={entry.title} delay={i * 90}>
            <ResearchEntry entry={entry} index={i} />
          </Reveal>
        ))}
      </div>
    </PageFrame>
  );
}
