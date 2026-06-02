import { useState, useEffect, Fragment } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
  names: string;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: timeLeft.days,    label: "Días",   pad: 1 },
    { value: timeLeft.hours,   label: "Horas",  pad: 2 },
    { value: timeLeft.minutes, label: "Min",    pad: 2 },
    { value: timeLeft.seconds, label: "Seg",    pad: 2 },
  ];

  return (
    <section
      className="wedding-section relative overflow-hidden grain-overlay"
      style={{ backgroundColor: "hsl(var(--wedding-cream))" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <motion.p
          className="font-brittany text-4xl tracking-[0.02em] mb-1"
          style={{ color: "hsl(var(--wedding-olive-light))" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Save The Date
        </motion.p>

        <motion.p
          className="font-body text-[10px] tracking-[0.35em] uppercase mb-8"
          style={{ color: "hsl(var(--wedding-text))", opacity: 0.7 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          09 · 10 · 2026
        </motion.p>

        {/* Number boxes */}
        <div className="flex justify-center items-start gap-2 md:gap-4 mt-8">
          {units.map((unit, i) => (
            <Fragment key={unit.label}>
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1 }}
              >
                {/* Box */}
                <div
                  className="w-[60px] md:w-[78px] py-3 md:py-4 flex items-center justify-center rounded-sm relative overflow-hidden"
                  style={{
                    border: "1px solid hsl(65, 20%, 50%, 0.28)",
                    background: "linear-gradient(160deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 100%)",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
                  }}
                >
                  {/* Subtle top shine */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "rgba(255,255,255,0.9)" }}
                  />
                  <motion.span
                    className="font-display text-3xl md:text-5xl font-light tabular-nums"
                    style={{ color: "hsl(var(--primary))" }}
                    key={unit.value}
                    initial={{ opacity: 0.6, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {String(unit.value).padStart(unit.pad, "0")}
                  </motion.span>
                </div>

                {/* Label */}
                <p
                  className="font-body text-[8px] md:text-[9px] tracking-[0.3em] uppercase mt-2.5"
                  style={{ color: "hsl(var(--wedding-text))" }}
                >
                  {unit.label}
                </p>
              </motion.div>

              {/* Separator — not after last */}
              {i < units.length - 1 && (
                <motion.span
                  className="font-display text-2xl md:text-4xl font-light self-start mt-2 md:mt-3 select-none"
                  style={{ color: "hsl(65, 20%, 50%)", opacity: 0.45 }}
                  animate={{ opacity: [0.45, 0.2, 0.45] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  :
                </motion.span>
              )}
            </Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CountdownTimer;
