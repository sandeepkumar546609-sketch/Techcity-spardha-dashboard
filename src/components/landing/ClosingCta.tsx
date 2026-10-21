import CtaLink from "@/components/landing/CtaLink";

export default function ClosingCta() {
  return (
    <section
      id="start"
      className="relative overflow-hidden border-t border-accent/10 bg-background"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-accent-secondary/[0.03] to-accent-tertiary/[0.04]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-7 px-4 py-14 sm:gap-8 sm:px-8 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="max-w-xl text-[1.7rem] font-normal leading-[1.1] tracking-tight text-foreground sm:text-[2.6rem]">
            The next technical assessment is assigned with the training.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-7 text-foreground/70 sm:mt-5">
            Sign in with the account from your college and open the assessment
            assigned to you. Data structures is available now. The result is
            ready when you submit.
          </p>
        </div>
        <CtaLink href="/login" size="lg" className="w-full self-start sm:w-auto lg:self-end">
          Login
        </CtaLink>
      </div>
    </section>
  );
}
