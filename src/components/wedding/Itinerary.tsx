import { motion } from "framer-motion";

interface ItineraryItem {
  time: string;
  event: string;
  icon: string;
}

interface ItineraryProps {
  items: ItineraryItem[];
}

const Itinerary = ({ items }: ItineraryProps) => {
  return (
    <section className="wedding-section" style={{ backgroundColor: "hsl(var(--wedding-cream))" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-sm mx-auto"
      >
        <h2 className="font-brittany text-3xl mb-8 tracking-[0.1em]">Itinerario</h2>
        <div className="wedding-divider" />

        <div className="relative mt-10">
          {/* Vertical line */}
          <div
            className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px"
            style={{ backgroundColor: "hsl(var(--wedding-olive-light) / 0.3)" }}
          />

          {items.map((item, i) => (
            <motion.div
              key={i}
              className="relative flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`flex-1 ${i % 2 === 0 ? "text-right pr-6" : "order-2 text-left pl-6"}`}>
                <p className="font-display text-sm font-medium" style={{ color: "hsl(var(--primary))" }}>
                  {item.time}
                </p>
                <p className="wedding-body text-xs">{item.event}</p>
              </div>

              {/* Center dot */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                  i % 2 === 0 ? "" : "order-1"
                }`}
                style={{
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                {item.icon}
              </div>

              <div className={`flex-1 ${i % 2 === 0 ? "order-2" : ""}`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Itinerary;
