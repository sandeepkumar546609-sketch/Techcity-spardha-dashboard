
"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

const previewStudent = {
  name: "Sandeep Kumar",
  email: "sandeep@example.com",
  collegeName: "Your College",
  batch: "2023–2027",
};

const stats = [
  { label: "Assessments Completed", value: "08", note: "Keep it up!", icon: "▤" },
  { label: "Average Score", value: "84%", note: "Great performance!", icon: "★" },
  { label: "Learning Progress", value: "68%", note: "On track!", icon: "↗" },
  { label: "Certificates Earned", value: "03", note: "Well done!", icon: "♙" },
];

const assessments = [
  { title: "Aptitude Fundamentals", type: "General Aptitude", score: "92%", date: "Oct 21, 2026" },
  { title: "Java Programming", type: "Technical Assessment", score: "84%", date: "Oct 18, 2026" },
  { title: "Logical Reasoning", type: "Verbal & Non-Verbal", score: "76%", date: "Oct 15, 2026" },
];

const progress = [
  { title: "Aptitude", detail: "Quantitative & Logical", value: 78 },
  { title: "Programming", detail: "Java & DSA", value: 64 },
  { title: "Reasoning", detail: "Verbal & Non-Verbal", value: 82 },
];

const quickLinks = [
  { title: "Assessments", href: "/assessment", icon: "▤" },
  { title: "Results", href: "/results", icon: "↗" },
  { title: "Certificates", href: "/certificates", icon: "♙" },
  { title: "My Profile", href: "/profile", icon: "○" },
];

export function DashboardScreen() {
  const { student } = useAuth();
  const currentStudent = student ?? previewStudent;
  const firstName = currentStudent.name.trim().split(/\s+/)[0] || "Student";
  const initials = currentStudent.name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-w-0 flex-1 bg-[#070d19] px-4 py-6 text-slate-100 sm:px-6 lg:px-9 lg:py-8">
      <div className="mx-auto max-w-[1500px] space-y-6">

        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Student Portal / Overview
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Your learning journey, all in one place.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-700/70 bg-[#0c1729] p-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/20 font-bold text-sky-300 ring-1 ring-blue-400/30">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold">{currentStudent.name}</p>
              <p className="mt-1 text-xs text-slate-400">Student Account</p>
            </div>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-2xl border border-blue-500/40 bg-gradient-to-r from-[#0b1d3b] via-[#09254c] to-[#071426] p-6 shadow-[0_0_40px_rgba(37,99,235,0.08)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Your learning space
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              Welcome back, <span className="text-sky-400">{firstName}.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Ready to take your next step? Track your progress, test your
              skills, and keep moving towards your goals.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500"
              >
                Explore Assessments <span>→</span>
              </Link>
              <Link
                href="/results"
                className="inline-flex items-center rounded-lg border border-slate-500/70 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:bg-white/5"
              >
                View Results
              </Link>
            </div>
          </div>
          <div className="relative mt-8 hidden items-center justify-center text-7xl text-blue-400/70 md:absolute md:inset-y-0 md:right-12 md:mt-0 md:flex">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border border-blue-400/20 bg-blue-400/5 shadow-[0_0_70px_rgba(37,99,235,0.18)]">
              🎓
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="rounded-xl border border-slate-700/70 bg-[#0b1525] p-5 transition hover:border-blue-500/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/15 text-xl text-sky-300">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs leading-5 text-slate-400">{item.label}</p>
                  <p className="mt-1 text-3xl font-bold tracking-tight">{item.value}</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-emerald-400">{item.note}</p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <div className="rounded-xl border border-slate-700/70 bg-[#0b1525] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 border-b border-slate-700/70 pb-4">
              <div>
                <h2 className="font-semibold">Recent Assessments</h2>
                <p className="mt-1 text-xs text-slate-400">Your latest activity</p>
              </div>
              <Link href="/results" className="text-xs font-semibold text-sky-400 hover:text-sky-300">
                View all →
              </Link>
            </div>

            <div className="divide-y divide-slate-700/60">
              {assessments.map((item) => (
                <div key={item.title} className="flex items-center gap-3 py-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-sky-300">
                    ▤
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.type}</p>
                    <p className="mt-2 text-[11px] text-slate-500">{item.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-400">
                      Completed
                    </span>
                    <p className="mt-2 text-lg font-bold text-sky-300">{item.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-700/70 bg-[#0b1525] p-5 sm:p-6">
            <div className="border-b border-slate-700/70 pb-4">
              <h2 className="font-semibold">Learning Progress</h2>
              <p className="mt-1 text-xs text-slate-400">Your skill development overview</p>
            </div>

            <div className="space-y-7 py-5">
              {progress.map((item) => (
                <div key={item.title}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
                    </div>
                    <span className="text-sm font-bold text-sky-300">{item.value}%</span>
                  </div>
                  <div
                    className="h-2 overflow-hidden rounded-full bg-slate-800"
                    role="progressbar"
                    aria-label={`${item.title} progress`}
                    aria-valuenow={item.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/assessment"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300"
            >
              Improve your skills <span>→</span>
            </Link>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-blue-500/40 bg-gradient-to-r from-[#0b1d38] to-[#0a1527] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-400">
              Your next step
            </p>
            <h2 className="mt-2 text-lg font-semibold">Ready for your next challenge?</h2>
            <p className="mt-1 text-sm text-slate-400">
              Explore assessments and keep improving your skills.
            </p>
          </div>
          <Link
            href="/assessment"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            View Assessments →
          </Link>
        </section>

        <section className="rounded-xl border border-slate-700/70 bg-[#0b1525] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="font-semibold">Quick Access</h2>
            <p className="mt-1 text-xs text-slate-400">Jump straight to a portal section</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-lg border border-slate-700/70 bg-[#0e1b2f] p-4 transition hover:border-blue-500/60 hover:bg-blue-500/10"
              >
                <span className="text-xl text-sky-300">{item.icon}</span>
                <p className="mt-3 text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-xs text-slate-400">Open section →</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-700/70 bg-[#0b1525] p-5 sm:p-6">
          <h2 className="font-semibold">Student Information</h2>
          <p className="mt-1 text-xs text-slate-400">Your registered account details</p>
          <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              ["Full Name", currentStudent.name],
              ["Email Address", currentStudent.email],
              ["College", currentStudent.collegeName],
              ["Batch", currentStudent.batch],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-700/60 bg-[#0e1b2f] p-4">
                <dt className="text-xs uppercase tracking-wider text-slate-400">{label}</dt>
                <dd className="mt-2 break-words text-sm font-medium">{value || "Not provided"}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-slate-500">
            Preview mode may show sample information until your account is connected.
          </p>
        </section>

      </div>
    </main>
  );
}
