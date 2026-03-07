import { motion } from "framer-motion";
import { Gift, Baby, Mail } from "lucide-react"; // Importé Mail por si prefieres sobre en vez de regalo
import { ScrollReveal } from "../ui/ScrollReveal";

const GiftInfo = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: "hsl(var(--wedding-cream))" }}>
      
      {/* Elemento decorativo flotante (opcional) */}
      <motion.div 
        className="absolute top-10 right-10 w-20 h-20 bg-wedding-olive opacity-10 rounded-full blur-2xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
        
        {/* --- TARJETA 1: LLUVIA DE SOBRES --- */}
        <ScrollReveal width="100%" delay={0.1}>
          <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm text-center h-full border border-gray-100 hover:shadow-md transition-shadow duration-300">
            
            {/* ICONO ANIMADO (Bounce) */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-wedding-olive-light/10 text-wedding-olive-dark"
            >
              <Gift size={32} strokeWidth={1.5} />
            </motion.div>

            <h3 className="font-brittany text-3xl mb-4 text-gray-800">Lluvia de sobres</h3>
            <div className="h-px w-12 bg-wedding-olive-light mx-auto mb-6 opacity-40" />
            
            <p className="wedding-body text-sm leading-relaxed text-gray-600">
              Su presencia es el mejor regalo que podemos recibir.
              Sin embargo, si desean hacernos un obsequio, les agradeceríamos
              que sea en forma de sobre, el cual podrán depositar el día del evento.
            </p>
          </div>
        </ScrollReveal>

        {/* --- TARJETA 2: NO NIÑOS --- */}
        <ScrollReveal width="100%" delay={0.3}>
          <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm text-center h-full border border-gray-100 hover:shadow-md transition-shadow duration-300">
            
            {/* ICONO ANIMADO (Fade In suave) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-wedding-olive-light/10 text-wedding-olive-dark"
            >
              <Baby size={32} strokeWidth={1.5} />
            </motion.div>

            <h3 className="font-brittany text-3xl mb-4 text-gray-800">No niños</h3>
            <div className="h-px w-12 bg-wedding-olive-light mx-auto mb-6 opacity-40" />

            <p className="wedding-body text-sm leading-relaxed text-gray-600">
              Para que puedas disfrutar con total comodidad este momento especial,
              hemos planeado una velada sólo para adultos.
            </p>
            
            <p className="wedding-body text-xs mt-4 italic text-wedding-olive-dark opacity-80">
              Gracias por tu comprensión y cariño.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default GiftInfo;
