"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const main = document.getElementById("main");
    const observed = new WeakSet<Element>();
    let observer: IntersectionObserver | null = null;

    const revealCards = () => {
      const cards = document.querySelectorAll<HTMLElement>(
        ".work-card, .reveal-on-scroll",
      );

      if (reduceMotion) {
        cards.forEach((card) => card.classList.add("visible"));
        return;
      }

      cards.forEach((card) => {
        if (!observed.has(card)) {
          observed.add(card);
          observer?.observe(card);
        }
      });
    };

    if (!reduceMotion) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 },
      );
    }

    revealCards();

    const mutationObserver = new MutationObserver(revealCards);
    if (main) {
      mutationObserver.observe(main, { childList: true, subtree: true });
    }

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
