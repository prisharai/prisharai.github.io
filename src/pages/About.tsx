import { useState } from "react";
import { PageFrame } from "../components/PageFrame";
import { Reveal } from "../components/Reveal";
import { identity, socialLinks } from "../data/site";

const asset = (name: string) => `${import.meta.env.BASE_URL || "/"}${name}`;

const icons: Record<string, JSX.Element> = {
  GitHub: <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.8 1.08.8 2.18v3.23c0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />,
  LinkedIn: <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />,
  Email: <path d="M2.25 4.5h19.5c.83 0 1.5.67 1.5 1.5v12c0 .83-.67 1.5-1.5 1.5H2.25a1.5 1.5 0 0 1-1.5-1.5V6c0-.83.67-1.5 1.5-1.5Zm.9 2.02 8.85 6.02 8.85-6.02H3.15ZM21 8.06l-8.32 5.66a1.5 1.5 0 0 1-1.68 0L2.68 8.06V17.5H21V8.06Z" />,
};

function SocialIcons() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((link) => {
        const isEmail = link.href.startsWith("mailto:");
        return (
          <a key={link.href} href={link.href} target={isEmail ? undefined : "_blank"} rel={isEmail ? undefined : "noreferrer"} aria-label={link.label} className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.025] text-ink-soft transition-all duration-500 hover:-translate-y-1 hover:border-rose-muted/40 hover:bg-rose-tint/60 hover:text-rose-deep">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]" aria-hidden>{icons[link.label]}</svg>
          </a>
        );
      })}
    </div>
  );
}

function FlipPortrait() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="relative">
      <div className="absolute -inset-5 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_70%_20%,rgba(229,175,200,.18),transparent_58%)] blur-2xl" />
      <button type="button" onClick={() => setFlipped((value) => !value)} aria-pressed={flipped} aria-label={flipped ? "Show photo" : "Play video"} className="group block w-full [perspective:1600px]">
        <div className="relative aspect-[4/5] w-full transition-transform duration-[900ms] [transform-style:preserve-3d]" style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
          <figure className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/[0.14] bg-porcelain shadow-[0_35px_100px_-50px_rgba(0,0,0,.75)] [backface-visibility:hidden]">
            <img src={asset("images/prisha-portrait.png")} alt="Prisha Rai" className="h-full w-full object-cover saturate-[.82] transition-all duration-1000 group-hover:scale-[1.025] group-hover:saturate-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07101d]/65 via-transparent to-bloom-blue/[0.08]" />
          </figure>
          <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/[0.14] bg-soft-black shadow-[0_35px_100px_-50px_rgba(0,0,0,.75)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <video src={asset("media/prisha-video.mp4")} muted loop playsInline autoPlay className="h-full w-full object-cover" />
          </div>
        </div>
      </button>
      <p className="mt-4 flex items-center gap-2 text-[12px] text-ink-soft">
        <span aria-hidden className="inline-block animate-pulse text-rose-deep">↻</span>
        {flipped ? "click to flip back" : "click to flip - hi from Cornell!"}
      </p>
    </div>
  );
}

export function About() {
  return (
    <PageFrame eyebrow="Cornell University · Ithaca, NY" title="About">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
        <Reveal><FlipPortrait /></Reveal>
        <div className="lg:pt-2">
          <Reveal>
            <p className="max-w-2xl font-serif text-[clamp(1.35rem,2.6vw,1.9rem)] font-light leading-[1.4] text-ivory">{identity.line}</p>
          </Reveal>
          <Reveal delay={90}>
            <div className="mt-9">
              <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-ink-faint">Elsewhere</p>
              <SocialIcons />
            </div>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 text-[14px] leading-relaxed text-ink-soft">The best way to reach me is email. I read everything and reply thoughtfully!</p>
          </Reveal>
        </div>
      </div>
    </PageFrame>
  );
}
