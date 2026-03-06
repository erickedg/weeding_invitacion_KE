import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import weddingLogo from "@/assets/K_Y_E.png";
interface CountdownTimerProps {
  targetDate: Date;
  names: string;
}

const CountdownTimer = ({ names,  targetDate }: CountdownTimerProps) => {
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
        {/* <div className="pt-16 pb-8 text-center bg-background">
          <p className="wedding-body text-sm md:text-base tracking-[0.2em] uppercase text-gray-600">
            Los invitamos a acompañarnos en este día tan especial
          </p>
        </div> */}
        <motion.img
          src={weddingLogo}
          alt={names}
          className="w-64 md:w-80 lg:w-96 mx-auto my-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />
        {/* <p className="font-brittany text-4xl tracking-[0.0em] mb-2" style={{ color: "hsl(var(--wedding-olive-light))" }}>
          Save The Date
        </p> */}
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
