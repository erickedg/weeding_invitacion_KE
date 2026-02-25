import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate.getTime() - new Date().getTime();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
  ];

  return (
    <section className="wedding-section" style={{ backgroundColor: "hsl(var(--wedding-cream))" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-display text-lg tracking-[0.3em] uppercase mb-2" style={{ color: "hsl(var(--wedding-olive-light))" }}>
          SAVE the DATE
        </p>
        <div className="wedding-divider" />

        <div className="flex justify-center gap-6 md:gap-10 mt-10">
          {units.map((unit, i) => (
            <motion.div
              key={unit.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="font-display text-4xl md:text-6xl font-light"
                style={{ color: "hsl(var(--primary))" }}
              >
                {String(unit.value).padStart(unit.label === "Días" ? 1 : 2, "0")}
              </div>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase mt-2" style={{ color: "hsl(var(--wedding-text))" }}>
                {unit.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CountdownTimer;
