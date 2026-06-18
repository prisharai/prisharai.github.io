"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems } from "../data/site";

export function BloomNav() {
  const pathname = usePathname();

  return <BloomNavInner key={pathname} pathname={pathname} />;
}

type BloomNavInnerProps = {
  pathname: string;
};

function BloomNavInner({ pathname }: BloomNavInnerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const handleScroll = () => {
      setIsCondensed(window.scrollY > window.innerHeight * 0.52);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  return (
    <nav
      ref={navRef}
      className={`flower-nav${isHome ? " home" : ""}${
        isCondensed ? " condensed" : ""
      }${isOpen ? " open" : ""}`}
      aria-label="Site navigation"
    >
      <button
        className="flower-bud"
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setIsOpen((current) => !current)}
        data-cursor
      >
        <Image
          src="/pr15ha-flower-integrated.png"
          alt=""
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 52vw, 46vw"
          className="flower-bud-image"
          aria-hidden="true"
        />
        <span className="flower-ring" aria-hidden="true" />
      </button>

      {navItems.map((item) => (
        <Link
          className="bloom-link"
          href={item.href}
          key={item.href}
          aria-current={pathname === item.href ? "page" : undefined}
          data-cursor
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
