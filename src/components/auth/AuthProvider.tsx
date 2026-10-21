"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { StudentPublic } from "@/lib/student";

type AuthView = "register" | "login";

type AuthContextValue = {
  student: StudentPublic | null;
  loading: boolean;
  authOpen: boolean;
  authView: AuthView;
  openAuth: (view?: AuthView) => void;
  closeAuth: () => void;
  setAuthView: (view: AuthView) => void;
  setStudent: (student: StudentPublic | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [student, setStudent] = useState<StudentPublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("register");

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me", { cache: "no-store" })
      .then(async (response) => {
        const data = (await response.json()) as { student: StudentPublic | null };
        if (active) setStudent(data.student);
      })
      .catch(() => {
        if (active) setStudent(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const openAuth = useCallback((view: AuthView = "register") => {
    setAuthView(view);
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setAuthOpen(false);
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setStudent(null);
    setAuthOpen(false);
    router.push("/");
    router.refresh();
  }, [router]);

  const value = useMemo(
    () => ({
      student,
      loading,
      authOpen,
      authView,
      openAuth,
      closeAuth,
      setAuthView,
      setStudent,
      logout,
    }),
    [student, loading, authOpen, authView, openAuth, closeAuth, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
