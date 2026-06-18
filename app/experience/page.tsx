import type { CSSProperties } from "react";
import { experience } from "../data/site";

export default function ExperiencePage() {
  return (
    <section className="page-content page-content-wide experience-page">
      <div className="experience-hero reveal-on-scroll">
        <p className="eyebrow">experience</p>
        <h1>building in real teams</h1>
        <p>
          Research, internships, and technical work where I got to turn messy
          problems into tools people could actually use.
        </p>
      </div>

      <div className="experience-track" aria-label="Experience timeline">
        {experience.map((item, index) => (
          <article
            className="experience-card reveal-on-scroll"
            key={`${item.organization}-${item.period}`}
            style={{ "--reveal-delay": `${index * 110}ms` } as CSSProperties}
          >
            <div className="experience-card-top">
              <span className="experience-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="timeline-period">{item.period}</p>
                <h2>{item.role}</h2>
                <p className="timeline-org">{item.organization}</p>
                {item.advisor ? (
                  <p className="timeline-advisor">{item.advisor}</p>
                ) : null}
              </div>
              <p className="experience-location">{item.location}</p>
            </div>

            <ul className="experience-bullets">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
