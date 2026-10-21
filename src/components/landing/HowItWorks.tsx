"use client";

import { useEffect, useState, type ComponentType, type CSSProperties } from "react";
import {
  Laptop,
  Padlock,
  Plot,
  Terminal,
  type HairlineProps,
} from "@lucasmarkes/hairline/react";
import SectionHeading from "@/components/landing/SectionHeading";

const figureStyle = {
  "--hairline-plate": "var(--background)",
  "--hairline-hi": "var(--foreground)",
  "--hairline-edge": "color-mix(in srgb, var(--foreground) 58%, var(--background))",
  "--hairline-mid": "color-mix(in srgb, var(--foreground) 34%, var(--background))",
  "--hairline-lo": "color-mix(in srgb, var(--foreground) 14%, var(--background))",
  "--hairline-stroke": "1.05",
} as CSSProperties;

const stepColors = [
  "text-accent",
  "text-accent-secondary",
  "text-accent-tertiary",
  "text-accent",
] as const;

const steps: {
  index: string;
  title: string;
  body: string;
  label: string;
  Figure: ComponentType<HairlineProps>;
}[] = [
  {
    index: "01",
    title: "Sign in",
    body: "Use the account your college issued for the TechCity training.",
    label: "A padlock. The shackle lifts and swings open.",
    Figure: Padlock,
  },
  {
    index: "02",
    title: "Open the paper",
    body: "The assessment assigned to your module is waiting, with a clock and its topics. Data structures is the one open now.",
    label: "A laptop. The lid opens on its hinge.",
    Figure: Laptop,
  },
  {
    index: "03",
    title: "Answer and submit",
    body: "Mark the multiple choice. Where a question asks for a program, write it and submit the source.",
    label: "A terminal. The line under the pointer lifts.",
    Figure: Terminal,
  },
  {
    index: "04",
    title: "Read the result",
    body: "The score is ready when you submit. A certificate follows when the paper is complete.",
    label: "A bar chart. The bars lift under the pointer.",
    Figure: Plot,
  },
];

export default function HowItWorks() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const sync = () =>
      setLight(document.documentElement.dataset.theme === "light");
    sync();
    window.addEventListener("spardha-theme", sync);
    return () => window.removeEventListener("spardha-theme", sync);
  }, []);

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-accent/10 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20 lg:py-[4.5rem]">
        <SectionHeading title="Four steps from the classroom to a score." />

        <ol className="mt-8 grid gap-3 sm:mt-12 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.index}
              className="flex flex-col overflow-hidden border border-foreground/10 bg-background"
            >
              <step.Figure
                play
                intensity={0.62}
                theme={light ? "light" : "dark"}
                label={step.label}
                style={figureStyle}
              />
              <div className="border-t border-foreground/8 px-4 py-5 sm:px-6 sm:py-6">
                <p className={`font-mono text-[11px] tracking-[0.16em] ${stepColors[i]}`}>
                  {step.index}
                </p>
                <h3 className="mt-3 text-[1.1rem] tracking-tight text-foreground sm:mt-4 sm:text-[1.15rem]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-6 text-foreground/60 sm:mt-3">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
