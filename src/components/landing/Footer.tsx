import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#how-it-works", label: "Working" },
  { href: "/#features", label: "Features" },
  { href: "/#assessments", label: "Assessments" },
  { href: "/login", label: "Login" },
];

export default function Footer() {
  return (
    <footer className="border-t border-accent/10 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:gap-10 sm:px-8 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
        <a
          href="https://www.techcityskills.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-full items-center justify-center bg-accent px-5 text-[13px] font-medium text-on-accent transition-colors hover:bg-accent/90 sm:w-fit"
        >
          Visit Site
        </a>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/50 transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-[12px] text-foreground/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <a
            href="mailto:techcityskillspvt.ltd@gmail.com"
            className="break-all underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground"
          >
            techcityskillspvt.ltd@gmail.com
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ThemeToggle />
            <a
              href="tel:+919650657821"
              className="transition-colors hover:text-foreground"
            >
              9650657821
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
