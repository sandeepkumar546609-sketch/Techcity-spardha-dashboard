export function ComingSoon({ title }: { title: string }) {
  return (
    <main className="flex min-h-0 w-full flex-1 flex-col lg:min-h-svh">
      <header className="border-b border-foreground/10 px-4 py-8 sm:px-8 sm:py-10 lg:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          {title}
        </p>
        <h1 className="mt-3 text-[1.85rem] font-normal leading-[1.05] tracking-tight text-foreground sm:mt-4 sm:text-5xl">
          {title}
        </h1>
      </header>
      <div className="flex w-full flex-1 items-center px-4 py-10 sm:px-8 lg:px-12">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-foreground/45">
          Coming soon
        </p>
      </div>
    </main>
  );
}
