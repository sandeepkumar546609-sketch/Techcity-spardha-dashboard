"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import type { StudentPublic } from "@/lib/student";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/assessment", label: "Assessments", icon: "paper" },
  { href: "/results", label: "Results", icon: "results" },
  { href: "/certificates", label: "Certificates", icon: "certificate" },
  { href: "/profile", label: "Profile", icon: "profile" },
  { href: "/settings", label: "Settings", icon: "settings" },
] as const;

type IconName = (typeof links)[number]["icon"] | "logout" | "collapse" | "menu";

function Icon({ name }: { name: IconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    "aria-hidden": true,
    className: "size-[18px] shrink-0",
  };

  switch (name) {
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="7" height="7" />
          <rect x="13.5" y="3.5" width="7" height="7" />
          <rect x="3.5" y="13.5" width="7" height="7" />
          <rect x="13.5" y="13.5" width="7" height="7" />
        </svg>
      );
    case "paper":
      return (
        <svg {...common}>
          <path d="M7 3.5h7.5L19.5 8.5V20.5h-12.5z" />
          <path d="M14.5 3.5V8.5H19.5" />
          <path d="M9 13h6M9 16.5h6" />
        </svg>
      );
    case "results":
      return (
        <svg {...common}>
          <path d="M4 19.5h16" />
          <path d="M7 19.5V11.5h3v8M14 19.5V6.5h3v13" />
        </svg>
      );
    case "certificate":
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="4.5" />
          <path d="M9.2 12.8 8 20.5l4-2.2 4 2.2-1.2-7.7" />
        </svg>
      );
    case "profile":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 19.5c1.2-3 3.5-4.5 6.5-4.5s5.3 1.5 6.5 4.5" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <path d="M4 8h10M18 8h2M4 16h2M10 16h10" />
          <circle cx="16" cy="8" r="2" />
          <circle cx="8" cy="16" r="2" />
        </svg>
      );
    case "logout":
      return (
        <svg {...common}>
          <path d="M10 5.5H5.5v13H10" />
          <path d="M11 12h8M16 8.5 19.5 12 16 15.5" />
        </svg>
      );
    case "collapse":
      return (
        <svg {...common}>
          <path d="M14.5 6.5 9 12l5.5 5.5" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
  }
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "S";
}

const storageKey = "spardha-sidebar";
const sidebarListeners = new Set<() => void>();

function subscribeSidebar(listener: () => void) {
  sidebarListeners.add(listener);
  return () => {
    sidebarListeners.delete(listener);
  };
}

function getSidebarCollapsed() {
  return window.localStorage.getItem(storageKey) === "collapsed";
}

function getSidebarCollapsedServer() {
  return false;
}

function setSidebarCollapsed(next: boolean) {
  window.localStorage.setItem(storageKey, next ? "collapsed" : "open");
  sidebarListeners.forEach((listener) => listener());
}

export function Sidebar({
  student,
  mobileOpen,
  onMobileClose,
}: {
  student: StudentPublic;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const collapsed = useSyncExternalStore(
    subscribeSidebar,
    getSidebarCollapsed,
    getSidebarCollapsedServer,
  );
  const [pending, setPending] = useState(false);

  useEffect(() => {
    onMobileClose();
  }, [pathname, onMobileClose]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function toggle() {
    setSidebarCollapsed(!collapsed);
  }

  async function onLogout() {
    setPending(true);
    try {
      await logout();
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-40 bg-foreground/35 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Close menu"
        tabIndex={mobileOpen ? 0 : -1}
        onClick={onMobileClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-svh w-[min(18rem,88vw)] shrink-0 flex-col border-r border-foreground/10 bg-background transition-transform duration-300 lg:sticky lg:top-0 lg:z-0 lg:translate-x-0 lg:transition-[width] ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "lg:w-[4.5rem]" : "lg:w-60"}`}
      >
        <div
          className={`flex h-14 items-center border-b border-foreground/10 sm:h-16 ${
            collapsed
              ? "justify-between px-3 lg:justify-center lg:px-2"
              : "justify-between px-3"
          }`}
        >
          <Link
            href="/dashboard"
            className="grid size-11 shrink-0 place-items-center"
            aria-label="Dashboard"
            onClick={onMobileClose}
          >
            <Image
              src="/logo.png"
              alt=""
              width={945}
              height={921}
              className="h-9 w-9 object-contain"
              priority
            />
          </Link>
          <button
            type="button"
            className="grid size-9 place-items-center text-foreground/55 transition-colors hover:text-foreground lg:hidden"
            aria-label="Close menu"
            onClick={onMobileClose}
          >
            <span className="relative block size-3.5">
              <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>
          {collapsed ? null : (
            <button
              type="button"
              className="hidden size-9 place-items-center text-foreground/55 transition-colors hover:text-foreground lg:grid"
              aria-label="Collapse sidebar"
              aria-expanded
              onClick={toggle}
            >
              <Icon name="collapse" />
            </button>
          )}
        </div>

        {collapsed ? (
          <div className="hidden justify-center border-b border-foreground/10 py-2 lg:flex">
            <button
              type="button"
              className="grid size-9 place-items-center text-foreground/55 transition-colors hover:text-foreground"
              aria-label="Expand sidebar"
              aria-expanded={false}
              onClick={toggle}
            >
              <span className="rotate-180">
                <Icon name="collapse" />
              </span>
            </button>
          </div>
        ) : null}

        <nav
          className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2 py-3"
          aria-label="Student"
        >
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                title={collapsed ? link.label : undefined}
                onClick={onMobileClose}
                className={`flex h-10 items-center gap-3 px-3 text-[13px] transition-colors ${
                  collapsed ? "lg:justify-center lg:px-0" : ""
                } ${
                  active
                    ? "bg-foreground/[0.05] text-foreground"
                    : "text-foreground/55 hover:bg-foreground/[0.03] hover:text-foreground"
                }`}
              >
                <Icon name={link.icon} />
                <span className={collapsed ? "lg:sr-only" : undefined}>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-foreground/10 p-2">
          <div
            className={`flex items-center gap-3 px-2 py-2 ${
              collapsed ? "lg:justify-center lg:px-0" : ""
            }`}
          >
            <span className="grid size-8 shrink-0 place-items-center bg-accent text-[11px] font-medium tracking-wide text-on-accent">
              {initials(student.name)}
            </span>
            <span className={`min-w-0 ${collapsed ? "lg:hidden" : ""}`}>
              <span className="block truncate text-sm text-foreground">{student.name}</span>
              <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/40">
                {student.batch}
              </span>
            </span>
          </div>
          <button
            type="button"
            className={`mt-1 flex h-10 w-full items-center gap-3 px-3 text-[13px] text-foreground/55 transition-colors hover:bg-foreground/[0.03] hover:text-foreground disabled:opacity-60 ${
              collapsed ? "lg:justify-center lg:px-0" : ""
            }`}
            disabled={pending}
            title={collapsed ? "Log out" : undefined}
            onClick={onLogout}
          >
            <Icon name="logout" />
            <span className={collapsed ? "lg:sr-only" : undefined}>
              {pending ? "Logging out…" : "Log out"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

export function PortalTopBar({
  onMenuOpen,
  studentName,
}: {
  onMenuOpen: () => void;
  studentName: string;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-foreground/10 bg-background/95 px-4 backdrop-blur-xl sm:h-16 sm:px-6 lg:hidden">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="grid size-10 place-items-center border border-foreground/10 text-foreground"
          aria-label="Open menu"
          onClick={onMenuOpen}
        >
          <Icon name="menu" />
        </button>
        <Link
          href="/dashboard"
          className="grid size-9 shrink-0 place-items-center"
          aria-label="Dashboard"
        >
          <Image
            src="/logo.png"
            alt=""
            width={945}
            height={921}
            className="h-8 w-8 object-contain"
          />
        </Link>
      </div>
      <span className="max-w-[40%] truncate font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
        {studentName}
      </span>
    </header>
  );
}
