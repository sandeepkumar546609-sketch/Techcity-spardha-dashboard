"use client";

import { useEffect } from "react";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { useAuth } from "@/components/auth/AuthProvider";

export function AuthDialog() {
  const { authOpen, authView, setAuthView, closeAuth } = useAuth();

  useEffect(() => {
    if (!authOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAuth();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [authOpen, closeAuth]);

  if (!authOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-foreground/35 backdrop-blur-[2px]"
        aria-label="Close account window"
        onClick={closeAuth}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-dialog-title"
        className="relative z-10 max-h-[calc(100svh-2rem)] w-full max-w-md overflow-y-auto"
      >
        <button
          type="button"
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center border border-foreground/10 bg-background text-foreground"
          aria-label="Close"
          onClick={closeAuth}
        >
          <span className="relative block size-3.5">
            <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
          </span>
        </button>
        <div className="sr-only" id="auth-dialog-title">
          {authView === "register" ? "Create account" : "Log in"}
        </div>
        <AuthPanel view={authView} onViewChange={setAuthView} />
      </div>
    </div>
  );
}
