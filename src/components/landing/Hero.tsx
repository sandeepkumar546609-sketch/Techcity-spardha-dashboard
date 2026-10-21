"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import CtaLink from "@/components/landing/CtaLink";
import Grainient from "@/components/Grainient";
import HeroPaper from "@/components/landing/HeroPaper";

/** Dark: blue → teal → warm orange. */
const DARK_COLORS = ["#0a1020", "#0f2a3a", "#1a4a6e", "#2f6fed", "#f97316"];
/** Light: sky → teal → coral for a brighter student look. */
const LIGHT_COLORS = ["#eef6ff", "#d4e8ff", "#b8f0e8", "#6eb8f7", "#f97316"];

function readIsLight() {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.theme === "light";
}

export default function Hero() {
  const [light, setLight] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const sync = () => setLight(readIsLight());
    sync();
    window.addEventListener("spardha-theme", sync);
    return () => window.removeEventListener("spardha-theme", sync);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <section className="relative isolate overflow-hidden md:min-h-[calc(100svh-4.25rem)]">
      <div className="hero-grainient" aria-hidden="true">
        <Grainient
          key={`${light ? "light" : "dark"}-${compact ? "sm" : "lg"}`}
          colors={light ? LIGHT_COLORS : DARK_COLORS}
          angle={55}
          flow={0.8}
          silk={0.35}
          grainAmount={0.08}
          type="linear"
          bands={1}
          softness={1}
          scale={1}
          speed={1}
          grainSize={1.2}
          grainAnimated
          contrast={1.05}
          saturation={1.2}
          variation={0.15}
          interactive={!compact}
          stir={1}
          clickSwirl={!compact}
          intro
          lightMode={false}
        />
      </div>
      <div className="hero-grainient-scrim" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:gap-12 sm:px-8 sm:py-16 md:min-h-[calc(100svh-4.25rem)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10 md:py-16 lg:gap-16 lg:py-20">
        <div className="max-w-xl fade-up">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent sm:mb-5 sm:text-[11px]">
            TechCity assessments
          </p>
          <h1 className="text-[1.9rem] font-normal leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] lg:text-[4.15rem]">
            A technical assessment for TechCity students.
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-7 text-foreground/75 sm:mt-7 sm:text-base sm:leading-7 md:text-lg md:leading-8">
            Sit the assessment that follows your training — multiple choice,
            code, and a score the same day. Data structures is open now. AI/ML,
            cloud computing, and more will follow.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
            <CtaLink href="/login" size="lg" className="w-full sm:w-auto">
              Login to begin
            </CtaLink>
            <Link
              href="/#assessments"
              className="inline-flex h-10 w-full items-center justify-center border border-foreground/20 bg-background/40 px-5 text-[15px] text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent sm:w-auto"
            >
              See the assessments
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md fade-up md:mx-0 md:max-w-none" style={{ "--fade-delay": "120ms" } as CSSProperties}>
          <HeroPaper />
        </div>
      </div>
    </section>
  );
}
