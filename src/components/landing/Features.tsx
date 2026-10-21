import SectionHeading from "@/components/landing/SectionHeading";

const featureTones = [
  "border-accent/25 bg-surface-tint/80",
  "border-accent-secondary/25 bg-surface-mint/80",
  "border-accent-tertiary/25 bg-surface-warm/80",
  "border-accent/20 bg-background",
  "border-accent-secondary/20 bg-background",
  "border-accent-tertiary/20 bg-background",
] as const;

const indexColors = [
  "text-accent",
  "text-accent-secondary",
  "text-accent-tertiary",
  "text-accent",
  "text-accent-secondary",
  "text-accent-tertiary",
] as const;

const features = [
  {
    index: "01",
    title: "Levels of questions",
    body: "The data structures assessment open now follows four papers — 1, 2, 3, and 4 — so a sitting matches the module a student has reached.",
  },
  {
    index: "02",
    title: "Multiple choice",
    body: "Single-answer questions on arrays, trees, graphs, and the checks that sit between longer problems.",
  },
  {
    index: "03",
    title: "Code submission",
    body: "A question can ask for a program. The student writes it in the browser and submits the source with the rest of the paper.",
  },
  {
    index: "04",
    title: "Instant result",
    body: "The score is calculated when the paper is submitted. There is no wait for a manual mark.",
  },
  {
    index: "05",
    title: "Evaluation over time",
    body: "Each sitting is kept. A student and a trainer can see how the score moves from one attempt to the next.",
  },
  {
    index: "06",
    title: "Certificates",
    body: "A completed paper ends with a certificate in the student’s name, tied to Data Structures 1, 2, 3, or 4.",
  },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-t border-accent/10 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20 lg:py-[4.5rem]">
        <div className="max-w-2xl">
          <SectionHeading title="What a student can do in one sitting." />
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-foreground/65 sm:mt-5">
            A technical assessment holds the work the class trains for. Data
            structures is open now: a chosen answer, and code that has to run.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:mt-12 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <li
              key={feature.index}
              className={`border px-4 py-5 sm:px-6 sm:py-6 ${featureTones[i]}`}
            >
              <p className={`font-mono text-[11px] tracking-[0.16em] ${indexColors[i]}`}>
                {feature.index}
              </p>
              <h3 className="mt-3 text-[1.1rem] tracking-tight text-foreground sm:mt-4 sm:text-[1.15rem]">
                {feature.title}
              </h3>
              <p className="mt-2 text-[15px] leading-6 text-foreground/60 sm:mt-3">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
