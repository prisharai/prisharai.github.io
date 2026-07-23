import { PageFrame } from "../components/PageFrame";
import { ExperienceEntry } from "../components/ExperienceEntry";
import { OpenSourceContributionCard } from "../components/OpenSourceContributionCard";
import { Reveal } from "../components/Reveal";
import { experience, openSourceContributions } from "../data/site";

export function Experience() {
  return (
    <PageFrame
      eyebrow=""
      title="Experience"
      lead="Research and software engineering roles from 2024 to present."
    >
      <div className="relative before:absolute before:bottom-20 before:left-[7px] before:top-2 before:w-px before:bg-gradient-to-b before:from-rose-deep/55 before:via-bloom-blue/25 before:to-transparent sm:before:left-[11px]">
        {experience.map((item, i) => (
          <Reveal key={`${item.role}-${item.organization}`} delay={i * 80}>
            <ExperienceEntry item={item} />
          </Reveal>
        ))}
      </div>

      <section className="mt-7 border-t border-white/[0.09] pt-10 sm:mt-10 sm:pt-12" aria-labelledby="open-source-heading">
        <Reveal>
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 id="open-source-heading" className="mt-2 font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-none tracking-[-0.03em] text-ivory">
                Open-source contributions
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-2">
          {openSourceContributions.map((contribution, i) => (
            <Reveal key={contribution.organization} delay={i * 90}>
              <OpenSourceContributionCard contribution={contribution} />
            </Reveal>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
