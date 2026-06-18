import { PageIntro } from "../components/PageIntro";

const photoSlots = ["friend photo", "mentor photo", "memory photo", "team photo"];

export default function MiscPage() {
  return (
    <section className="page-content page-content-wide">
      <PageIntro eyebrow="misc" title="people who helped me bloom">
        <p>
          A little garden wall for the friends, mentors, and people who have
          made my journey possible. Photos coming soon.
        </p>
      </PageIntro>

      <div className="photo-garden" aria-label="Photo placeholders">
        {photoSlots.map((slot) => (
          <article className="photo-slot reveal-on-scroll" key={slot}>
            <span>{slot}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
