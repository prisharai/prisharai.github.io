import { PageIntro } from "../components/PageIntro";

export default function MiscPage() {
  return (
    <section className="page-content page-content-wide">
      <PageIntro eyebrow="misc" title="people who helped me bloom">
        <p>Thank you to everyone who makes my journey possible</p>
      </PageIntro>

      <p className="misc-coming-soon reveal-on-scroll">[coming soon!]</p>
    </section>
  );
}
