import { useEffect, useRef, useState } from "react";
import { STATS, type Stat } from "../../../src/data/homeData";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
}

function AnimatedCounter({ target, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState<number>(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted.current) return;
        hasStarted.current = true;

        const duration = 1800;
        const increment = Math.ceil(target / (duration / 16));
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(current);
          }
        }, 16);
      },
      { threshold: 0.5 }
    );

    if (spanRef.current) observer.observe(spanRef.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={spanRef}>
      {count.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-white py-14 px-6">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl">
        {STATS.map((s: Stat, i: number) => (
          <div key={i}>
            <p className="text-4xl font-extrabold text-emerald-700 leading-none mb-1.5">
              <AnimatedCounter target={s.target} suffix={s.suffix} />
            </p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}