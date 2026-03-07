import { motion } from "framer-motion";

interface WeddingFooterProps {
  names: string;
  date: string;
}

const WeddingFooter = ({ names, date }: WeddingFooterProps) => {
  return (
    // CAMBIO: Quitamos el estilo inline de wedding-cream y ponemos 'bg-white'
    // También puedes usar bg-background si tu fondo por defecto es blanco
    <footer className="wedding-section py-20 bg-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto px-4" // Añadí un contenedor para centrar y dar margen
      >
        <p className="wedding-body text-sm mb-8 text-gray-600">
          Gracias por ser parte de este capítulo tan importante en nuestra historia.
        </p>

        {/* Divider sutil */}
        <div className="w-16 h-px bg-wedding-olive-light mx-auto opacity-50 mb-8" />

        {/* Nombres con tipografía tipo firma (Brittany o similar) */}
        <h3 className="font-brittany text-3xl md:text-3xl text-wedding-olive-dark">
          {names}
        </h3>
        
        <p className="font-body text-xs tracking-[0.3em] uppercase mt-4 text-gray-500">
          {date}
        </p>
      </motion.div>
    </footer>
  );
};

export default WeddingFooter;
