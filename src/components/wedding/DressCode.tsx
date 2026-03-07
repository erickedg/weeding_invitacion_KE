import { motion } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal";
// Importamos iconos para hacerlo más visual (puedes instalar lucide-react si no lo tienes)
import { Shirt, User } from "lucide-react"; 

const DressCode = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden bg-white">
      
      {/* Elemento decorativo sutil de fondo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-wedding-olive opacity-5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-xl mx-auto text-center relative z-10">
        
        {/* ENCABEZADO */}
        <ScrollReveal width="100%">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-4 text-gray-500">
            Código de vestimenta
          </p>
          
          <h2 className="font-brittany text-5xl md:text-6xl mb-6 text-wedding-olive-dark">
            Formal
          </h2>
          
          <div className="w-16 h-px bg-wedding-olive-light mx-auto mb-10 opacity-60" />
        </ScrollReveal>

        {/* TARJETAS DE VESTIMENTA (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          {/* TARJETA MUJERES */}
          <ScrollReveal width="100%" delay={0.2}>
            <div className="bg-wedding-cream/30 p-8 rounded-lg border border-wedding-olive-light/20 hover:shadow-md transition-all duration-300 group">
              {/* Icono animado */}
              <motion.div 
                className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-white text-wedding-olive shadow-sm group-hover:scale-110 transition-transform"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.3 }}
              >
                <User size={24} strokeWidth={1.5} /> 
                {/* Nota: Si encuentras un icono de vestido (Dress) mejor, úsalo aquí */}
              </motion.div>

              <p className="font-display text-xl mb-2 text-wedding-olive-dark">Mujeres</p>
              <p className="wedding-body text-sm text-gray-600">Vestido Formal (Largo)</p>
            </div>
          </ScrollReveal>

          {/* TARJETA HOMBRES */}
          <ScrollReveal width="100%" delay={0.4}>
            <div className="bg-wedding-cream/30 p-8 rounded-lg border border-wedding-olive-light/20 hover:shadow-md transition-all duration-300 group">
              {/* Icono animado */}
              <motion.div 
                className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-white text-wedding-olive shadow-sm group-hover:scale-110 transition-transform"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.5 }}
              >
                <Shirt size={24} strokeWidth={1.5} />
              </motion.div>

              <p className="font-display text-xl mb-2 text-wedding-olive-dark">Hombres</p>
              <p className="wedding-body text-sm text-gray-600">Traje Formal</p>
            </div>
          </ScrollReveal>

        </div>

        {/* NOTA IMPORTANTE (Colores prohibidos) */}
        <ScrollReveal width="100%" delay={0.6}>
          <div className="mt-10 px-4 py-4 bg-gray-50 rounded-md inline-block">
            <p className="wedding-body text-xs md:text-sm italic text-gray-500">
              <span className="font-medium text-wedding-olive-dark not-italic mr-1">Nota:</span>
              Reservamos los colores blanco y verde para la novia y damas de honor.
            </p>
          </div>
          
          {/* Opcional: Paleta de colores prohibidos visual (Círculos tachados o simples) */}
           <div className="flex justify-center gap-3 mt-4 opacity-50">
              <div className="w-6 h-6 rounded-full border border-gray-200 bg-white" title="Blanco (Reservado)" />
              <div className="w-6 h-6 rounded-full border border-gray-200 bg-wedding-olive" title="Verde (Reservado)" />
           </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default DressCode;
