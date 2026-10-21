"use client";

import { useState } from "react";
import GradientField from "@/components/landing/GradientField";
import { AuthPanel } from "@/components/auth/AuthPanel";

export function LoginScreen() {
  const [view, setView] = useState<"register" | "login">("login");

  return (
    <main className="relative isolate flex flex-1 overflow-x-hidden">
      <GradientField />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-10 sm:gap-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:py-20">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent sm:text-[11px]">
            Student account
          </p>
          <h1 className="mt-4 text-[1.85rem] font-normal leading-[1.08] tracking-tight text-foreground sm:mt-5 sm:text-5xl">
            {view === "register"
              ? "Create the account for your sitting."
              : "Log in with email and password."}
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-7 text-foreground/75 sm:mt-6 sm:text-base">
            {view === "register"
              ? "Add your name, email, password, college, and batch. If you already have an account, switch to login in the same window."
              : "Use the email and password from your student account. A signed-in session lasts 12 hours."}
          </p>
        </div>
        <AuthPanel view={view} onViewChange={setView} />
      </div>
    </main>
  );
}
