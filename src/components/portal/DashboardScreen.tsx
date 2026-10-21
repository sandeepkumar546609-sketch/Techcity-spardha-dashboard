"use client";

import { useAuth } from "@/components/auth/AuthProvider";

const fields = [
  ["Name", "name"],
  ["Email", "email"],
  ["College", "collegeName"],
  ["Batch", "batch"],
] as const;

export function DashboardScreen() {
  const { student } = useAuth();
  if (!student) return null;

  const firstName = student.name.split(" ")[0];

  return (
    <main className="flex min-h-0 w-full flex-1 flex-col lg:min-h-svh">
      <header className="border-b border-foreground/10 px-4 py-8 sm:px-8 sm:py-10 lg:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          Dashboard
        </p>
        <h1 className="mt-3 text-[2rem] font-normal leading-[1.02] tracking-tight text-foreground sm:mt-4 sm:text-5xl lg:text-6xl">
          {firstName}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-foreground/65 [overflow-wrap:anywhere] sm:mt-4 sm:text-base">
          {student.collegeName}. Batch {student.batch}. Signed in as {student.email}.
        </p>
      </header>

      <dl className="grid w-full flex-1 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {fields.map(([label, key], index) => (
          <div
            key={key}
            className={`flex min-h-40 flex-col justify-between border-foreground/10 px-4 py-6 sm:min-h-52 sm:px-8 sm:py-8 lg:px-12 ${
              [
                "border-b sm:border-r xl:border-b-0",
                "border-b xl:border-r xl:border-b-0",
                "border-b sm:border-r sm:border-b-0 xl:border-b-0",
                "",
              ][index]
            }`}
          >
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
              {label}
            </dt>
            <dd className="mt-6 text-[1.2rem] leading-snug tracking-tight text-foreground [overflow-wrap:anywhere] sm:mt-10 sm:text-[1.55rem]">
              {student[key]}
            </dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
