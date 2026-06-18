"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorRef.current;

    if (!dot) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const enableCursor = finePointer && !reduceMotion;

    if (!enableCursor) {
      dot.style.display = "none";
      return;
    }

    document.body.style.cursor = "none";
    document.documentElement.classList.add("custom-cursor-enabled");
    dot.classList.add("ready");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let frameId = 0;

    const moveDot = () => {
      dotX += (mouseX - dotX) * 0.34;
      dotY += (mouseY - dotY) * 0.34;
      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      frameId = window.requestAnimationFrame(moveDot);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.classList.toggle(
        "active",
        Boolean((event.target as Element | null)?.closest("[data-cursor]")),
      );

      const headline = document.getElementById("headline");
      if (!headline) {
        return;
      }

      const rect = headline.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
      const dy =
        (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight;

      headline.style.transform = `translate(${dx * 18}px, ${dy * 11}px)`;
    };

    const handleMouseLeave = () => {
      dot.classList.remove("active");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    frameId = window.requestAnimationFrame(moveDot);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "";
      document.documentElement.classList.remove("custom-cursor-enabled");
      dot.classList.remove("ready", "active");
      const headline = document.getElementById("headline");
      if (headline) {
        headline.style.transform = "";
      }
    };
  }, []);

  return <div className="cursor-dot" ref={cursorRef} aria-hidden="true" />;
}
