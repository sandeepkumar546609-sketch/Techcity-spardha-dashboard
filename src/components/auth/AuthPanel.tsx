"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  validateLogin,
  validateRegister,
  type LoginInput,
  type RegisterInput,
} from "@/lib/student-fields";
import type { StudentPublic } from "@/lib/student";

const emptyRegister: RegisterInput = {
  name: "",
  email: "",
  password: "",
  collegeName: "",
  batch: "",
};

const emptyLogin: LoginInput = {
  email: "",
  password: "",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClassName =
  "mt-2 h-11 w-full border border-foreground/15 bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-accent";

export function AuthPanel({
  view,
  onViewChange,
}: {
  view: "register" | "login";
  onViewChange: (view: "register" | "login") => void;
}) {
  const router = useRouter();
  const { setStudent, closeAuth } = useAuth();
  const [register, setRegister] = useState(emptyRegister);
  const [login, setLogin] = useState(emptyLogin);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function switchView(next: "register" | "login") {
    setError(null);
    onViewChange(next);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError =
      view === "register" ? validateRegister(register) : validateLogin(login);
    if (validationError) {
      setError(validationError);
      return;
    }

    setPending(true);
    setError(null);

    try {
      const response = await fetch(
        view === "register" ? "/api/auth/register" : "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(view === "register" ? register : login),
        },
      );
      const data = (await response.json()) as {
        student?: StudentPublic;
        error?: string;
      };

      if (!response.ok || !data.student) {
        setError(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setStudent(data.student);
      closeAuth();
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("The request did not go through. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="border border-foreground/10 bg-background/90 p-5 shadow-[0_24px_80px_rgba(59,99,196,0.08)] backdrop-blur-sm sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        {view === "register" ? "Create account" : "Log in"}
      </p>
      <h2 className="mt-3 text-[1.45rem] font-normal leading-[1.1] tracking-tight text-foreground sm:text-[1.7rem]">
        {view === "register"
          ? "Start with your college details."
          : "Use your email and password."}
      </h2>
      <p className="mt-3 text-sm leading-6 text-foreground/65">
        {view === "register"
          ? "This account is how you open a Spardha sitting. Your session stays signed in for 12 hours."
          : "Sign in with the email and password from your student account."}
      </p>

      <form className="mt-6 grid gap-4" onSubmit={submit} noValidate>
        {view === "register" ? (
          <>
            <Field label="Name">
              <input
                className={inputClassName}
                name="name"
                autoComplete="name"
                value={register.name}
                onChange={(event) =>
                  setRegister((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
            </Field>
            <Field label="Email">
              <input
                className={inputClassName}
                name="email"
                type="email"
                autoComplete="email"
                value={register.email}
                onChange={(event) =>
                  setRegister((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </Field>
            <Field label="Password">
              <input
                className={inputClassName}
                name="password"
                type="password"
                autoComplete="new-password"
                value={register.password}
                onChange={(event) =>
                  setRegister((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
              />
            </Field>
            <Field label="College name">
              <input
                className={inputClassName}
                name="collegeName"
                autoComplete="organization"
                value={register.collegeName}
                onChange={(event) =>
                  setRegister((current) => ({
                    ...current,
                    collegeName: event.target.value,
                  }))
                }
              />
            </Field>
            <Field label="Batch">
              <input
                className={inputClassName}
                name="batch"
                placeholder="2026"
                value={register.batch}
                onChange={(event) =>
                  setRegister((current) => ({
                    ...current,
                    batch: event.target.value,
                  }))
                }
              />
            </Field>
          </>
        ) : (
          <>
            <Field label="Email">
              <input
                className={inputClassName}
                name="email"
                type="email"
                autoComplete="email"
                value={login.email}
                onChange={(event) =>
                  setLogin((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </Field>
            <Field label="Password">
              <input
                className={inputClassName}
                name="password"
                type="password"
                autoComplete="current-password"
                value={login.password}
                onChange={(event) =>
                  setLogin((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
              />
            </Field>
          </>
        )}

        {error ? (
          <p
            role="alert"
            className="border border-accent-secondary/30 bg-accent-secondary/10 px-3 py-2.5 text-sm leading-6 text-accent-secondary"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-1 inline-flex h-11 items-center justify-center bg-accent px-5 text-[15px] font-medium text-on-accent transition-colors hover:bg-accent/90 disabled:cursor-wait disabled:opacity-70"
        >
          {pending
            ? view === "register"
              ? "Creating account…"
              : "Signing in…"
            : view === "register"
              ? "Create account"
              : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-foreground/60">
        {view === "register" ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-4"
              onClick={() => switchView("login")}
            >
              Log in
            </button>
          </>
        ) : (
          <>
            New student?{" "}
            <button
              type="button"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-4"
              onClick={() => switchView("register")}
            >
              Create an account
            </button>
          </>
        )}
      </p>
    </div>
  );
}
