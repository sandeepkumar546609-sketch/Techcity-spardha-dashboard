import SectionHeading from "@/components/landing/SectionHeading";

const points = [
  {
    title: "Beside the classroom",
    body: "Assigned with the module, so the sitting matches what the batch just finished.",
    icon: ClassroomIcon,
    tone: "bg-surface-tint",
  },
  {
    title: "On a computer",
    body: "Sign in and work in the browser. No separate answer sheet.",
    icon: ComputerIcon,
    tone: "bg-surface-mint",
  },
  {
    title: "Kept with the student",
    body: "Score, attempt, and certificate stay on the college account.",
    icon: RecordIcon,
    tone: "bg-surface-warm",
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-accent/10 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20 lg:py-[4.5rem]">
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl lg:pt-1">
            <SectionHeading
              title="Training shows the work. The assessment shows what stayed."
              titleClassName="max-w-lg text-[1.7rem] sm:text-[2.45rem]"
            />
            <p className="mt-4 max-w-md text-[15px] leading-7 text-foreground/65 sm:mt-5">
              TechCity runs the classroom. The technical assessment sits beside
              it: an assigned sitting, questions at the student’s level, and a
              result the same day. Data structures is available now.
            </p>
          </div>

          <AboutScene />
        </div>

        <ul className="mt-10 grid gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3">
          {points.map((point) => (
            <li
              key={point.title}
              className={`${point.tone} border border-foreground/8 px-4 py-5 sm:px-6 sm:py-6`}
            >
              <point.icon />
              <h3 className="mt-4 text-[1.05rem] tracking-tight text-foreground sm:mt-5">
                {point.title}
              </h3>
              <p className="mt-2 max-w-[16rem] text-[15px] leading-6 text-foreground/60">
                {point.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AboutScene() {
  return (
    <figure
      className="border border-accent/15 bg-gradient-to-br from-surface-tint via-background to-surface-mint px-3 py-5 sm:px-7 sm:py-6"
      aria-label="The classroom and the paper sit side by side."
    >
      <div className="grid grid-cols-[minmax(0,1fr)_1.25rem_minmax(0,1fr)] items-center sm:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)]">
        <svg viewBox="0 0 160 120" className="h-24 w-full text-foreground sm:h-32" aria-hidden="true">
          <rect x="1" y="1" width="158" height="118" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M16 28h96M16 44h72M16 60h84"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.45"
          />
          <rect x="16" y="86" width="26" height="18" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.25" />
          <rect x="50" y="86" width="26" height="18" fill="var(--accent)" fillOpacity="0.22" stroke="var(--accent)" strokeWidth="1.25" />
          <rect x="84" y="86" width="26" height="18" fill="var(--accent-secondary)" fillOpacity="0.18" stroke="var(--accent-secondary)" strokeWidth="1.25" />
          <rect x="118" y="86" width="26" height="18" fill="var(--accent-tertiary)" fillOpacity="0.16" stroke="var(--accent-tertiary)" strokeWidth="1.25" />
        </svg>

        <div className="flex items-center" aria-hidden="true">
          <span className="h-px w-full bg-gradient-to-r from-accent via-accent-secondary to-accent-tertiary" />
        </div>

        <svg viewBox="0 0 160 120" className="h-24 w-full text-foreground sm:h-32" aria-hidden="true">
          <rect x="1" y="1" width="158" height="118" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M1 22h158" stroke="currentColor" strokeOpacity="0.25" />
          <circle cx="14" cy="11.5" r="2.5" fill="var(--accent)" fillOpacity="0.7" />
          <circle cx="24" cy="11.5" r="2.5" fill="var(--accent-secondary)" fillOpacity="0.55" />
          <path d="M16 40h96" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
          <circle cx="20" cy="62" r="4" fill="none" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
          <path d="M32 62h68" stroke="currentColor" strokeOpacity="0.3" />
          <circle cx="20" cy="82" r="4" fill="var(--accent)" />
          <path d="M32 82h60" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
          <rect x="100" y="96" width="46" height="14" fill="var(--accent)" />
          <path d="M110 103h26" stroke="white" />
        </svg>
      </div>

      <figcaption className="mt-3 grid grid-cols-[minmax(0,1fr)_1.25rem_minmax(0,1fr)] font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/45 sm:mt-4 sm:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] sm:text-[10px] sm:tracking-[0.16em]">
        <span>Classroom</span>
        <span />
        <span>Paper</span>
      </figcaption>
    </figure>
  );
}

function ClassroomIcon() {
  return (
    <svg viewBox="0 0 40 40" className="size-10 text-accent" aria-hidden="true">
      <rect x="3" y="5" width="22" height="16" fill="none" stroke="currentColor" strokeOpacity="0.85" />
      <path d="M7 10h12M7 14h8" fill="none" stroke="currentColor" strokeOpacity="0.45" />
      <rect
        x="16"
        y="18"
        width="21"
        height="16"
        fill="var(--background)"
        stroke="currentColor"
        strokeOpacity="0.85"
      />
      <path d="M20 24h12M20 28h8" fill="none" stroke="var(--accent)" />
    </svg>
  );
}

function ComputerIcon() {
  return (
    <svg viewBox="0 0 40 40" className="size-10 text-accent-secondary" aria-hidden="true">
      <rect x="4" y="6" width="32" height="22" fill="none" stroke="currentColor" strokeOpacity="0.85" />
      <path d="M10 14h14" fill="none" stroke="currentColor" strokeOpacity="0.45" />
      <circle cx="12" cy="20" r="2" fill="var(--accent-secondary)" />
      <path d="M17 20h10" fill="none" stroke="currentColor" strokeOpacity="0.45" />
      <path d="M14 32h12M10 28h20" fill="none" stroke="currentColor" strokeOpacity="0.35" />
    </svg>
  );
}

function RecordIcon() {
  return (
    <svg viewBox="0 0 40 40" className="size-10 text-accent-tertiary" aria-hidden="true">
      <circle cx="14" cy="13" r="5" fill="none" stroke="currentColor" strokeOpacity="0.85" />
      <path
        d="M6 28c1.4-4 4.2-6 8-6s6.6 2 8 6"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
      />
      <rect
        x="18"
        y="16"
        width="16"
        height="18"
        fill="var(--background)"
        stroke="currentColor"
        strokeOpacity="0.85"
      />
      <path d="M22 22h8M22 26h8" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M22 31h5" fill="none" stroke="var(--accent-tertiary)" />
    </svg>
  );
}
