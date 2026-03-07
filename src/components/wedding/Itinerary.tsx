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
    <section className="wedding-section relative overflow-hidden" style={{ backgroundColor: "hsl(var(--wedding-cream))" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto relative z-10"
      >
        <h2 className="font-brittany text-4xl mb-8 tracking-[0.1em] text-center" style={{ color: "hsl(var(--primary))" }}>Itinerario</h2>
        
        <div className="wedding-divider mx-auto mb-10" />

        <div className="relative mt-4 px-4">
          {/* LÍNEA VERTICAL CENTRAL */}
          <motion.div
            className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px origin-top"
            style={{ backgroundColor: "hsl(var(--wedding-olive-light))", opacity: 0.3 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {items.map((item, i) => (
            <motion.div
              key={i}
              className="relative flex items-center gap-4 mb-12"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
            >
              {/* LADO IZQUIERDO (Texto si es par, vacío si es impar) */}
              <div className={`flex-1 ${i % 2 === 0 ? "text-right pr-4" : "order-3 text-left pl-4"}`}>
                <p className="font-display text-lg font-medium" style={{ color: "hsl(var(--primary))" }}>
                  {item.time}
                </p>
                <p className="wedding-body text-xs opacity-80 mt-1">{item.event}</p>
              </div>

              {/* PUNTO CENTRAL VERDE SÓLIDO */}
              <div className={`relative z-10 flex-shrink-0 order-2`}>
                 <motion.div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm shadow-md"
                    // AQUÍ ESTÁ LA CLAVE: Usamos 'hsl(var(--primary))' que es tu verde principal
                    style={{ 
                        backgroundColor: "hsl(var(--primary))", 
                        color: "hsl(var(--primary-foreground))", // Texto blanco (usualmente)
                        border: "2px solid hsl(var(--wedding-cream))" // Pequeño borde del color del fondo para separar de la línea
                    }}
                    whileHover={{ scale: 1.15 }}
                 >
                    {item.icon}
                 </motion.div>
              </div>

              {/* LADO DERECHO (Vacío si es par, Texto si es impar) */}
              <div className={`flex-1 ${i % 2 === 0 ? "order-3" : "order-1"}`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Itinerary;