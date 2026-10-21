"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ProfileMenu } from "@/components/shell/ProfileMenu";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#how-it-works", label: "Working" },
  { href: "/#features", label: "Features" },
  { href: "/#assessments", label: "Assessments" },
  { href: "/#results", label: "Results" },
] as const;

function readIsLight() {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.theme === "light";
}

export function Navbar() {
  const { student, loading, openAuth, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sync = () => setLight(readIsLight());
    sync();
    window.addEventListener("spardha-theme", sync);
    return () => window.removeEventListener("spardha-theme", sync);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-foreground/15 transition-colors duration-300 [[data-theme=light]_&]:border-foreground/40 ${
        scrolled || open
          ? light
            ? "bg-background/85 backdrop-blur-xl"
            : "bg-background/80 backdrop-blur-xl"
          : light
            ? "bg-background/90"
            : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:gap-6 sm:px-8">
        <Link
          href={student ? "/dashboard" : "/"}
          className="flex shrink-0 items-center"
          aria-label={student ? "Dashboard" : "Home"}
        >
          <Image
            src="/logo.png"
            alt=""
            width={945}
            height={921}
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
            priority
          />
        </Link>

        <div className="flex min-w-0 items-center justify-end gap-3 sm:gap-5 lg:gap-8">
          <ul className="hidden items-center gap-5 xl:gap-6 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/55 transition-colors hover:text-foreground xl:text-[12px]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {loading ? (
            <span className="inline-block size-9 rounded-full bg-foreground/10" aria-hidden="true" />
          ) : student ? (
            <div className="hidden lg:block">
              <ProfileMenu />
            </div>
          ) : (
            <button
              type="button"
              className="hidden h-8 items-center bg-accent px-4 text-[13px] font-medium text-on-accent transition-colors hover:bg-accent/90 lg:inline-flex"
              onClick={() => openAuth("login")}
            >
              Login
            </button>
          )}

          <button
            type="button"
            className="relative grid h-10 w-10 shrink-0 place-items-center border border-foreground/10 text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className={`absolute h-px w-4 bg-current transition-transform duration-200 ${
                open ? "rotate-45" : "-translate-y-[3.5px]"
              }`}
            />
            <span
              className={`absolute h-px w-4 bg-current transition-transform duration-200 ${
                open ? "-rotate-45" : "translate-y-[3.5px]"
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`absolute inset-x-0 top-full z-50 border-t border-foreground/10 bg-background shadow-[0_24px_48px_rgba(0,0,0,0.28)] transition-[max-height,opacity] duration-300 lg:hidden ${
          open
            ? "max-h-[calc(100svh-4.25rem)] overflow-y-auto opacity-100"
            : "pointer-events-none max-h-0 overflow-hidden opacity-0"
        }`}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-1 px-4 py-4 sm:px-5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="block px-3 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="px-3 pt-2">
            {student ? (
              <div className="grid gap-1">
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="block px-3 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/70"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="block px-3 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/70"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  onClick={closeMenu}
                  className="block px-3 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/70"
                >
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    void logout();
                  }}
                  className="inline-flex h-11 w-full items-center justify-center border border-foreground/15 text-[13px] font-medium text-foreground"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  openAuth("login");
                }}
                className="inline-flex h-11 w-full items-center justify-center bg-accent text-[13px] font-medium text-on-accent"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
