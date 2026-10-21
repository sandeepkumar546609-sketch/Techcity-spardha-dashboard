function PlusIcon() {
  return (
    <svg
      className="size-[0.75em]"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 1v10M1 6h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

const sizes = {
  sm: {
    box: "size-8",
    shift: "-translate-x-8",
    label: "h-8 px-4 pr-10 text-[13px]",
  },
  lg: {
    box: "size-10",
    shift: "-translate-x-10",
    label: "h-10 px-5 pr-12 text-[15px]",
  },
} as const;

export default function CtaLink({
  href,
  children,
  className = "",
  size = "sm",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof sizes;
}) {
  const { box, shift, label } = sizes[size];

  return (
    <a
      href={href}
      className={`group inline-flex shrink-0 cursor-pointer items-center font-medium outline-none ${className}`}
    >
      <span className="relative inline-flex w-full items-center overflow-hidden sm:w-auto sm:overflow-visible">
        <span
          className={`flex origin-left -rotate-45 scale-0 items-center justify-center bg-accent text-on-accent transition-transform duration-700 ease-power4-in-out group-hover:rotate-0 group-hover:scale-100 ${box}`}
        >
          <PlusIcon />
        </span>
        <span
          className={`inline-flex w-full items-center justify-center bg-accent text-on-accent transition-transform duration-700 ease-power4-in-out group-hover:translate-x-0 sm:w-auto ${shift} ${label}`}
        >
          {children}
        </span>
        <span
          className={`absolute right-0 top-0 z-10 flex origin-right items-center justify-center bg-accent text-on-accent transition-transform duration-700 ease-power4-in-out group-hover:-rotate-45 group-hover:scale-0 ${box}`}
        >
          <PlusIcon />
        </span>
      </span>
    </a>
  );
}
