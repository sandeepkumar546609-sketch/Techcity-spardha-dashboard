"use client";

import { useState } from "react";
import SectionHeading from "@/components/landing/SectionHeading";

type Paper = {
  index: string;
  title: string;
  line: string;
  level: string;
  format: string;
  time: string;
  topics: string[];
};

const subjects: { id: string; label: string; papers: Paper[] }[] = [
  {
    id: "dsa",
    label: "DSA",
    papers: [
      {
        index: "01",
        title: "Data Structures 1",
        line: "Arrays, strings, and linked lists from the opening module.",
        level: "Beginner",
        format: "MCQ and code",
        time: "60 min",
        topics: ["Arrays and indexing", "Strings", "Linked lists"],
      },
      {
        index: "02",
        title: "Data Structures 2",
        line: "Stacks, queues, recursion, and hashing.",
        level: "Intermediate",
        format: "MCQ and code",
        time: "75 min",
        topics: ["Stacks", "Queues", "Recursion", "Hash maps"],
      },
      {
        index: "03",
        title: "Data Structures 3",
        line: "Trees, heaps, and the structures that branch.",
        level: "Intermediate",
        format: "MCQ and code",
        time: "75 min",
        topics: ["Binary trees", "Binary search trees", "Heaps", "Tries"],
      },
      {
        index: "04",
        title: "Data Structures 4",
        line: "Graphs, traversal, and the problems that move across them.",
        level: "Advanced",
        format: "MCQ and code",
        time: "90 min",
        topics: [
          "Graph representation",
          "Breadth-first search",
          "Depth-first search",
          "Shortest paths",
        ],
      },
    ],
  },
  {
    id: "aiml",
    label: "AI-ML",
    papers: [
      {
        index: "01",
        title: "AI-ML 1",
        line: "Data, features, and the first models from the opening module.",
        level: "Beginner",
        format: "MCQ and code",
        time: "60 min",
        topics: [
          "Data and features",
          "Supervised and unsupervised learning",
          "Linear regression",
          "Train, test, and metrics",
        ],
      },
      {
        index: "02",
        title: "AI-ML 2",
        line: "Classification, trees, and the classical algorithms.",
        level: "Intermediate",
        format: "MCQ and code",
        time: "75 min",
        topics: [
          "Logistic regression",
          "Decision trees",
          "Support vector machines",
          "Clustering",
        ],
      },
      {
        index: "03",
        title: "AI-ML 3",
        line: "Neural networks, and the models that learn representations.",
        level: "Intermediate",
        format: "MCQ and code",
        time: "75 min",
        topics: [
          "Perceptrons and layers",
          "Backpropagation",
          "Convolutional networks",
          "Optimization and regularization",
        ],
      },
      {
        index: "04",
        title: "AI-ML 4",
        line: "Language, vision, and taking a trained model into use.",
        level: "Advanced",
        format: "MCQ and code",
        time: "90 min",
        topics: [
          "Natural language processing",
          "Transformers",
          "Computer vision pipelines",
          "Evaluation and deployment",
        ],
      },
    ],
  },
  {
    id: "cloud",
    label: "Cloud computing",
    papers: [
      {
        index: "01",
        title: "Cloud Computing 1",
        line: "Service models, regions, and the first resources you provision.",
        level: "Beginner",
        format: "MCQ and code",
        time: "60 min",
        topics: [
          "IaaS, PaaS, and SaaS",
          "Regions and availability zones",
          "Virtual machines",
          "Object and block storage",
        ],
      },
      {
        index: "02",
        title: "Cloud Computing 2",
        line: "Networks, identity, and how traffic reaches a service.",
        level: "Intermediate",
        format: "MCQ and code",
        time: "75 min",
        topics: [
          "Virtual networks",
          "Load balancing",
          "Identity and access",
          "Auto scaling",
        ],
      },
      {
        index: "03",
        title: "Cloud Computing 3",
        line: "Containers, serverless, and the data services beside them.",
        level: "Intermediate",
        format: "MCQ and code",
        time: "75 min",
        topics: [
          "Containers",
          "Serverless functions",
          "Managed databases",
          "Caching and queues",
        ],
      },
      {
        index: "04",
        title: "Cloud Computing 4",
        line: "Reliability, cost, and the path from code to production.",
        level: "Advanced",
        format: "MCQ and code",
        time: "90 min",
        topics: [
          "High availability",
          "Monitoring and logging",
          "Security and cost",
          "Deployment pipelines",
        ],
      },
    ],
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`size-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 4.5 6 8.5 10 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function Assessments() {
  const [subjectId, setSubjectId] = useState(subjects[0].id);
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const papers = subjects.find((subject) => subject.id === subjectId)?.papers ?? [];

  return (
    <section
      id="assessments"
      className="scroll-mt-24 border-t border-accent/10 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20 lg:py-[4.5rem]">
        <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="order-2 max-w-2xl md:order-1">
            <SectionHeading title="Data structures is open. More assessments follow." />
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-foreground/65 sm:mt-5">
              Choose a subject to read its four papers. Data structures is the
              sitting students can take today. AI-ML and cloud computing are
              listed so the syllabus is visible before those assessments open.
            </p>
          </div>

          <div
            className="order-1 -mx-4 flex shrink-0 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 md:order-2 md:justify-end [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Assessment subjects"
          >
            {subjects.map((subject) => {
              const selected = subject.id === subjectId;
              const shortLabel =
                subject.id === "cloud" ? "Cloud" : subject.label;
              return (
                <button
                  key={subject.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`shrink-0 border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-none sm:px-4 ${
                    selected
                      ? "border-accent bg-accent text-on-accent"
                      : "border-foreground/15 text-foreground/55 hover:border-accent hover:text-accent"
                  }`}
                  onClick={() => {
                    setSubjectId(subject.id);
                    setOpenIndex(null);
                  }}
                >
                  <span className="sm:hidden">{shortLabel}</span>
                  <span className="hidden sm:inline">{subject.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ul className="mt-6 border-t border-foreground/10 sm:mt-8">
          {papers.map((paper) => {
            const open = openIndex === paper.index;
            return (
              <li key={`${subjectId}-${paper.index}`} className="border-b border-foreground/10">
                <button
                  type="button"
                  className="group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_2.25rem] items-start gap-x-3 px-0 py-4 text-left transition-colors duration-200 hover:bg-accent/[0.06] focus-visible:bg-accent/[0.06] focus-visible:outline-none sm:grid-cols-[3.25rem_minmax(0,1fr)_2.25rem] sm:gap-x-4 sm:px-1 sm:py-5 md:grid-cols-[3.25rem_minmax(0,1fr)_auto_2.25rem] md:items-center md:gap-x-6 md:px-2 md:py-6"
                  aria-expanded={open}
                  onClick={() =>
                    setOpenIndex((current) =>
                      current === paper.index ? null : paper.index,
                    )
                  }
                >
                  <span className="pt-1 font-mono text-[11px] tracking-[0.16em] text-accent md:self-center md:pt-0">
                    {paper.index}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[1.05rem] tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-[1.15rem]">
                      {paper.title}
                    </span>
                    <span className="mt-1 block max-w-xl text-[14px] leading-6 text-foreground/60 sm:text-[15px]">
                      {paper.line}
                    </span>
                    <span className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45 md:hidden">
                      <span>{paper.level}</span>
                      <span className="text-foreground/20">/</span>
                      <span>{paper.format}</span>
                      <span className="text-foreground/20">/</span>
                      <span className="text-foreground">{paper.time}</span>
                    </span>
                  </span>
                  <span className="hidden items-center gap-x-4 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45 md:flex">
                    <span>{paper.level}</span>
                    <span className="text-foreground/20">/</span>
                    <span>{paper.format}</span>
                    <span className="text-foreground/20">/</span>
                    <span className="text-foreground">{paper.time}</span>
                  </span>
                  <span
                    className={`mt-0.5 grid size-9 place-items-center justify-self-end border transition-colors duration-200 md:mt-0 ${
                      open
                        ? "border-accent bg-accent text-on-accent"
                        : "border-foreground/15 text-foreground/45 group-hover:border-accent group-hover:text-accent"
                    }`}
                  >
                    <Chevron open={open} />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="border-t border-foreground/10 pl-0 sm:pl-0 md:ml-[4.75rem]">
                      {paper.topics.map((topic) => (
                        <li
                          key={topic}
                          className="border-b border-foreground/10 py-3 text-[14px] text-foreground/75 last:border-b-0 sm:text-[15px]"
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
