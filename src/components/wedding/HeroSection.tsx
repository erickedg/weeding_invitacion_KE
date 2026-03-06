import { motion } from "framer-motion";
import weddingLogo from "@/assets/K_Y_E.png";

// IMPORTA TU IMAGEN DE FONDO AQUÍ
import heroBg from "@/assets/Foto_10.jpg"; 

interface HeroSectionProps {
  names: string;
  subtitle?: string;
}

const HeroSection = ({ names, subtitle }: HeroSectionProps) => {
  return (
    // CAMBIO 1: 'justify-end' para bajar todo el contenido.
    // 'pb-0' porque controlaremos el espacio con padding interno del div
    <section className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden">
      
      {/* --- INICIO DEL FONDO --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Fondo Boda" 
          // Mantenemos tu ajuste de posición
          className="w-full h-full object-cover object-[center_30%]"
        />
        
        {/* CAMBIO 2: DEGRADADO BLANCO DESDE ABAJO (FADE) */}
        {/* Esto es crucial: crea la "niebla" blanca abajo para que el logo se lea bien */}
        {/* 'from-background' es el color de tu fondo (blanco/crema), 'to-transparent' hace que arriba se vea la foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent h-[60%] mt-auto" />
      </div>
      {/* --- FIN DEL FONDO --- */}

      {/* Elementos decorativos (opcional) - Los mantenemos sutiles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-3xl"
          style={{ backgroundColor: "white" }} 
        />
      </div>

      <motion.div
        // CAMBIO 3: Padding inferior grande (pb-32 md:pb-40) para subir el logo desde el borde
        className="relative z-10 text-center px-6 pb-32 md:pb-40"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        {/* <motion.img
          src={weddingLogo}
          alt={names}
          className="w-64 md:w-80 lg:w-96 mx-auto my-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
        /> */}

        {/* Divider inferior (opcional, lo dejo por si te gusta) */}
        {/* <div className="h-px w-16 bg-wedding-olive-light mx-auto my-4 opacity-50" /> */}

        <motion.p
          className="font-display text-6xl tracking-[0.1em] mt-4 font-medium"
          style={{ color: "hsl(var(--wedding-olive-light))" }} // Usa un color oscuro para que contraste con el degradado blanco
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Katia & Erick
        </motion.p>

        {/* NOTA: He quitado el texto de "Los invitamos..." de aquí.
            Ahora debes poner ese texto manualmente al principio de tu siguiente componente (CountdownTimer o SaveTheDate) 
            para que aparezca sobre el fondo blanco limpio. */}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center z-20 opacity-60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Cambié el color a negro/gris porque ahora está sobre el degradado blanco */}
        <div className="w-px h-12 bg-gray-500" />
        <span className="wedding-body text-[10px] tracking-widest uppercase mt-2 text-gray-500">Scroll</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;