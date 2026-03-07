import { motion } from "framer-motion";
import { Hotel } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";

interface AccommodationProps {
  hotelName: string;
  hotelUrl: string;
  description?: string;
}

const Accommodation = ({ hotelName, hotelUrl, description }: AccommodationProps) => {
  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "hsl(var(--wedding-cream))" }}>
      
      {/* Fondo decorativo (círculo sutil detrás) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white opacity-40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md mx-auto text-center relative z-10">
        
        {/* 1. ICONO ANIMADO (Rebote al aparecer) */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center shadow-sm"
          style={{ backgroundColor: "white", color: "hsl(var(--primary))" }}
        >
          <Hotel size={28} strokeWidth={1.5} />
        </motion.div>

        {/* 2. TEXTOS CON SCROLL REVEAL */}
        <ScrollReveal width="100%" delay={0.3}>
          <h2 className="font-brittany text-5xl mb-4 text-wedding-olive-dark">Hospedaje</h2>
          
          <div className="h-px w-12 bg-wedding-olive-light mx-auto mb-8 opacity-60" />

          <p className="font-display text-lg mb-2 font-medium text-gray-800">
             {hotelName}
          </p>

          <p className="wedding-body text-sm leading-relaxed text-gray-600 mb-8 px-4">
            {description || `Para su comodidad, hemos realizado un convenio especial con este hotel. Menciona nuestra boda al reservar.`}
          </p>
        </ScrollReveal>

        {/* 3. BOTÓN CON HOVER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.a
            href={hotelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-sm shadow-md transition-all"
            style={{
              backgroundColor: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "hsl(var(--wedding-olive-dark))", // Oscurece al pasar el mouse
              y: -2 
            }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Hotel
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default Accommodation;
