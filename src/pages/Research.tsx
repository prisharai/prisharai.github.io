import { PageFrame } from "../components/PageFrame";
import { ResearchEntry } from "../components/ResearchEntry";
import { researchEntries } from "../data/site";

export function Research() {
  return (
    <PageFrame
      eyebrow="Research"
      title="Work at the seam of models, molecules, and machine behavior."
      intro="Two lines of inquiry: computational biology for disease modeling, and the safety of agentic systems that act on real infrastructure."
    >
      <div>
        {researchEntries.map((entry) => (
          <ResearchEntry key={entry.title} entry={entry} />
        ))}
      </div>
    </PageFrame>
  );
}
