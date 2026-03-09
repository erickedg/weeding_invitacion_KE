import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";

interface RSVPSectionProps {
  deadline: string;
  confirmUrl?: string;
}

const RSVPSection = ({ deadline, confirmUrl }: RSVPSectionProps) => {
  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "hsl(var(--wedding-cream))" }}>
      
      {/* Fondo decorativo (Un degradado sutil de verde oliva) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wedding-olive to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        
        {/* ICONO DE CORAZÓN ANIMADO */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 mx-auto mb-8 rounded-full flex items-center justify-center bg-white shadow-sm text-wedding-olive"
        >
          <Heart size={28} fill="currentColor" strokeWidth={1} />
        </motion.div>

        <ScrollReveal width="100%">
          <h2 className="font-display text-xs md:text-sm tracking-[0.4em] uppercase mb-4 text-gray-500">
             Confirmar asistencia
          </h2>
          
          <h3 className="font-brittany text-5xl md:text-6xl mb-6 text-wedding-olive-dark">
            ¡Nos encantaría verte!
          </h3>

          <div className="h-px w-16 bg-wedding-olive-light mx-auto mb-10 opacity-60" />

          <p className="wedding-body text-sm md:text-lg leading-relaxed text-gray-700 mb-10 max-w-md mx-auto px-4">
            Será un encuentro íntimo con las personas que más queremos. Por favor, confírmanos antes del <span className="font-medium">{deadline}</span>.
          </p>
        </ScrollReveal>

        {/* BOTÓN DE CONFIRMACIÓN CON EFECTO DE PULSO */}
        <ScrollReveal width="100%" delay={0.3}>
          <div className="relative inline-block">
            {/* El "Anillo de pulso" exterior */}
            <motion.div
              className="absolute inset-0 rounded-sm bg-wedding-olive opacity-20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <motion.a
              href={confirmUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-block font-display text-xs tracking-[0.25em] uppercase px-12 py-5 rounded-sm shadow-xl transition-all"
              style={{
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "hsl(var(--wedding-olive-dark))",
                y: -3 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Confirmar aquí
            </motion.a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default RSVPSection;
