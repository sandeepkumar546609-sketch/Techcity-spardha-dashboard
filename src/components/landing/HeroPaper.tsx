"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

const choices = [
  {
    id: "array",
    label: "Array",
    note: "A scan. Lookup walks the list.",
  },
  {
    id: "map",
    label: "Hash map",
    note: "Constant time. The key jumps straight to the value.",
  },
  {
    id: "stack",
    label: "Stack",
    note: "Last in, first out. There is no key.",
  },
] as const;

const CORRECT = "map";
const START_SECONDS = 42 * 60 + 18;

function formatClock(total: number) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const REST = { rx: 0, ry: 0, gx: 50, gy: 42, glare: 0, sx: 0, sy: 24, alpha: 0.08 };

export default function HeroPaper() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(false);
  const hoveringRef = useRef(false);
  const frame = useRef(0);
  const wake = useRef<(() => void) | null>(null);
  const motion = useRef({
    rx: 0,
    ry: 0,
    vx: 0,
    vy: 0,
    gx: 50,
    gy: 42,
    gvx: 0,
    gvy: 0,
    glare: 0,
    gv: 0,
    sx: 0,
    sy: 24,
    svx: 0,
    svy: 0,
    alpha: 0.08,
    av: 0,
  });
  const target = useRef({ ...REST });
  const [reduced, setReduced] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(START_SECONDS);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    let last = performance.now();
    let alive = true;

    const step = (now: number) => {
      if (!alive) return;
      const dt = Math.min(2, (now - last) / 16.67);
      last = now;
      const pose = motion.current;
      const aim = target.current;
      const returning = !hoveringRef.current;
      const stiff = returning ? 0.05 : 0.18;
      const damp = Math.pow(returning ? 0.9 : 0.72, dt);

      const spring = (value: number, velocity: number, dest: number) => {
        const nextVelocity = (velocity + (dest - value) * stiff * dt) * damp;
        return [value + nextVelocity * dt, nextVelocity] as const;
      };

      [pose.rx, pose.vx] = spring(pose.rx, pose.vx, aim.rx);
      [pose.ry, pose.vy] = spring(pose.ry, pose.vy, aim.ry);
      [pose.gx, pose.gvx] = spring(pose.gx, pose.gvx, aim.gx);
      [pose.gy, pose.gvy] = spring(pose.gy, pose.gvy, aim.gy);
      [pose.glare, pose.gv] = spring(pose.glare, pose.gv, aim.glare);
      [pose.sx, pose.svx] = spring(pose.sx, pose.svx, aim.sx);
      [pose.sy, pose.svy] = spring(pose.sy, pose.svy, aim.sy);
      [pose.alpha, pose.av] = spring(pose.alpha, pose.av, aim.alpha);

      const card = cardRef.current;
      const glare = glareRef.current;
      if (!reducedRef.current) {
        if (card) {
          card.style.transform = `rotateX(${pose.rx.toFixed(3)}deg) rotateY(${pose.ry.toFixed(3)}deg)`;
          card.style.boxShadow = `${pose.sx.toFixed(2)}px ${pose.sy.toFixed(2)}px 80px rgba(47, 111, 237, ${Math.max(0, pose.alpha).toFixed(3)})`;
        }
        if (glare) {
          glare.style.opacity = String(Math.max(0, pose.glare));
          glare.style.background = `radial-gradient(460px circle at ${pose.gx.toFixed(1)}% ${pose.gy.toFixed(1)}%, rgba(255,255,255,0.7), transparent 58%)`;
        }
      }

      const energy =
        Math.abs(aim.rx - pose.rx) +
        Math.abs(pose.vx) +
        Math.abs(aim.ry - pose.ry) +
        Math.abs(pose.vy) +
        Math.abs(aim.sx - pose.sx) +
        Math.abs(pose.svx) +
        Math.abs(aim.sy - pose.sy) +
        Math.abs(pose.svy) +
        Math.abs(aim.glare - pose.glare) +
        Math.abs(pose.gv);

      if (hoveringRef.current || energy > 0.015) {
        frame.current = requestAnimationFrame(step);
        return;
      }

      if (card) {
        card.style.transform = "";
        card.style.boxShadow = "";
      }
      if (glare) glare.style.opacity = "0";
      pose.rx = 0;
      pose.ry = 0;
      pose.vx = 0;
      pose.vy = 0;
      pose.glare = 0;
      pose.gv = 0;
      pose.sx = 0;
      pose.sy = 24;
      pose.alpha = 0.08;
      frame.current = 0;
    };

    wake.current = () => {
      if (frame.current) return;
      last = performance.now();
      frame.current = requestAnimationFrame(step);
    };

    return () => {
      alive = false;
      wake.current = null;
      cancelAnimationFrame(frame.current);
    };
  }, []);

  function track(event: PointerEvent<HTMLDivElement>) {
    if (reducedRef.current || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    hoveringRef.current = true;
    target.current = {
      rx: -py * 8,
      ry: px * 10,
      gx: (px + 0.5) * 100,
      gy: (py + 0.5) * 100,
      glare: 1,
      sx: -px * 22,
      sy: 24 + py * 14,
      alpha: 0.14,
    };
    wake.current?.();
  }

  function release() {
    hoveringRef.current = false;
    target.current = {
      ...REST,
      gx: motion.current.gx,
      gy: motion.current.gy,
    };
    wake.current?.();
  }

  function choose(id: string) {
    setSelected(id);
    if (id === CORRECT) return;
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
  }

  const verdict = choices.find((choice) => choice.id === selected);

  return (
    <div
      className={`hero-paper-stage${shake ? " is-shaking" : ""}`}
      onPointerMove={track}
      onPointerLeave={release}
    >
      <div ref={cardRef} className="hero-paper">
        <div ref={glareRef} className="hero-paper-glare" aria-hidden="true" />

        <div className="relative">
          <div className="flex items-start justify-between gap-3 border-b border-foreground/10 pb-3 sm:items-center sm:gap-4 sm:pb-4">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                Paper 02
              </p>
              <p className="mt-1 text-[14px] tracking-tight text-foreground sm:text-[15px]">
                Data Structures 2
              </p>
            </div>
            <p className="shrink-0 text-right font-mono text-[9px] uppercase leading-4 tracking-[0.12em] text-foreground/45 sm:text-[10px] sm:tracking-[0.14em]">
              Intermediate
              <span className="mt-1 block tabular-nums text-foreground">
                {formatClock(seconds)} left
              </span>
            </p>
          </div>

          <div className="mt-3 h-px bg-foreground/10 sm:mt-4">
            <div
              className="h-px bg-accent"
              style={{ width: "50%" }}
              aria-hidden="true"
            />
          </div>

          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40 sm:mt-4">
            Question 12 of 24 · Multiple choice
          </p>
          <p className="mt-2 text-base leading-6 tracking-tight text-foreground sm:mt-3 sm:text-lg sm:leading-7">
            Which structure gives constant-time lookup by key?
          </p>

          <div className="mt-5 grid gap-2" role="radiogroup" aria-label="Answer">
            {choices.map((choice) => {
              const active = selected === choice.id;
              const correct = active && choice.id === CORRECT;
              return (
                <button
                  key={choice.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => choose(choice.id)}
                  className={`hero-paper-choice flex items-center gap-3 border px-3 py-2.5 text-left text-sm ${
                    correct
                      ? "border-accent bg-accent/10 text-foreground"
                      : active
                        ? "border-accent-secondary bg-accent-secondary/8 text-foreground"
                        : "border-foreground/10 text-foreground/70 hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`grid size-3.5 shrink-0 place-items-center rounded-full border ${
                      correct
                        ? "border-accent"
                        : active
                          ? "border-accent-secondary"
                          : "border-foreground/25"
                    }`}
                  >
                    {active ? (
                      <span
                        className={`size-1.5 rounded-full ${
                          correct ? "bg-accent" : "bg-accent-secondary"
                        }`}
                      />
                    ) : null}
                  </span>
                  {choice.label}
                </button>
              );
            })}
          </div>

          <p
            className={`mt-3 min-h-5 font-mono text-[11px] tracking-wide ${
              selected === CORRECT
                ? "text-accent"
                : selected
                  ? "text-accent-secondary"
                  : "text-foreground/35"
            }`}
            aria-live="polite"
          >
            {verdict ? verdict.note : "Pick an answer."}
          </p>

          <div className="mt-2 border border-foreground/10 bg-foreground/[0.03] p-3">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
              <span>Code · Q13</span>
              <span>Python</span>
            </div>
            <pre className="mt-3 overflow-x-auto font-mono text-[12px] leading-6 text-foreground/80">
              <code>
                {"def two_sum(nums, target):\n    "}
                <span className={selected === CORRECT ? "text-accent" : undefined}>
                  {"seen = {}"}
                </span>
                {"\n    for i, n in enumerate(nums):"}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
