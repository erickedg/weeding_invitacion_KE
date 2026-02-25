import { motion } from "framer-motion";

interface WeddingCalendarProps {
  weddingDate: Date;
}

const WeddingCalendar = ({ weddingDate }: WeddingCalendarProps) => {
  const month = weddingDate.toLocaleString("es-ES", { month: "long" }).toUpperCase();
  const year = weddingDate.getFullYear();
  const day = weddingDate.getDate();

  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // Get first day of month and total days
  const firstDay = new Date(weddingDate.getFullYear(), weddingDate.getMonth(), 1).getDay();
  const totalDays = new Date(weddingDate.getFullYear(), weddingDate.getMonth() + 1, 0).getDate();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= totalDays; i++) calendarDays.push(i);

  return (
    <section className="wedding-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto"
      >
        <p className="wedding-subheading mb-2">El gran día</p>
        <p className="font-display text-lg tracking-[0.25em] font-light" style={{ color: "hsl(var(--primary))" }}>
          {month} | {year}
        </p>

        <div className="wedding-divider" />

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 mt-6">
          {daysOfWeek.map((d) => (
            <div key={d} className="font-body text-[10px] tracking-wider uppercase py-2" style={{ color: "hsl(var(--muted-foreground))" }}>
              {d}
            </div>
          ))}
          {calendarDays.map((d, i) => (
            <div
              key={i}
              className={`font-display text-sm py-2 rounded-full transition-colors ${
                d === day
                  ? "text-primary-foreground font-medium"
                  : ""
              }`}
              style={
                d === day
                  ? { backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
                  : { color: "hsl(var(--foreground))" }
              }
            >
              {d || ""}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WeddingCalendar;
