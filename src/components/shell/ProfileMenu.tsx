"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || "S";
}

export function ProfileMenu() {
  const { student, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!student) return null;

  async function onLogout() {
    setPending(true);
    try {
      await logout();
    } finally {
      setPending(false);
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="grid size-9 place-items-center rounded-full bg-accent text-[12px] font-medium tracking-wide text-on-accent transition-colors hover:bg-accent/90"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {initials(student.name)}
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-[calc(100%+0.55rem)] z-50 w-56 border border-foreground/10 bg-background py-1 shadow-[0_24px_48px_rgba(0,0,0,0.28)]"
        >
          <div className="border-b border-foreground/10 px-3 py-2.5">
            <p className="truncate text-sm text-foreground">{student.name}</p>
          </div>
          <Link
            href="/profile"
            role="menuitem"
            className="block px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/settings"
            role="menuitem"
            className="block px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
          <button
            type="button"
            role="menuitem"
            className="block w-full px-3 py-2.5 text-left text-sm text-foreground/80 transition-colors hover:bg-foreground/[0.04] hover:text-foreground disabled:opacity-60"
            disabled={pending}
            onClick={onLogout}
          >
            {pending ? "Logging out…" : "Logout"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
