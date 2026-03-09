import { motion } from "framer-motion";
import heroBg1 from "@/assets/Foto_11.jpg"; 
import heroBg2 from "@/assets/Foto_10.jpg"; 
import weddingLogo from "@/assets/K_Y_E_2.png";

interface HeroSectionProps {
  names: string;
  subtitle?: string;
}

const HeroSection = ({ names, subtitle }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden">
      
      {/* --- FONDO --- */}
      <div className="absolute inset-0 z-0 grid grid-cols-1 md:grid-cols-2">
        {/* IMAGEN 1 */}
        <div className="relative w-full h-full overflow-hidden hidden md:block">
          <img 
            src={heroBg1} 
            alt="Fondo Boda 1" 
            className="w-full h-full object-cover object-[center_30%] md:object-center"
          />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background/30 to-transparent" />
        </div>

        {/* IMAGEN 2 */}
        <div className="relative w-full h-full overflow-hidden block">
          <img 
            src={heroBg2} 
            alt="Fondo Boda 2" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* FILTRO BLANCO */}
        <div className="absolute inset-0 bg-white/60 z-10 pointer-events-none" />

        {/* DEGRADADO BLANCO GLOBAL (Aumenté la intensidad abajo) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
             <div className="absolute bottom-0 w-full bg-gradient-to-t from-background via-background to-transparent h-[40%]" />
        </div>
      </div>


      {/* --- CONTENIDO --- */}
      {/* CAMBIO CLAVE: Reduje pb-32 a pb-12 para que no haya tanto espacio vacío abajo */}
      <motion.div
        className="relative z-20 text-center px-6 pb-12 md:pb-16 w-full"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <div className="relative inline-block">
            <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] rounded-full blur-3xl -z-10"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            />
            <motion.img
              src={weddingLogo}
              alt={names}
              className="w-64 md:w-80 lg:w-96 mx-auto my-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
            />
            <motion.p
              className="font-display text-5xl md:text-7xl tracking-[0.05em] font-medium relative"
              style={{ 
                  color: "hsl(var(--wedding-olive-light))",
                  textShadow: "0 2px 10px rgba(255,255,255, 0.5)" 
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Katia & Erick
            </motion.p>
        </div>

        <motion.p
          // CAMBIO: De 'text-xs' a 'text-[10px]' (o el número que quieras)
          className="wedding-body text-[10px] md:text-xs tracking-[0.3em] uppercase mt-8 font-medium text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Los invitamos a acompañarnos en este día tan especial
        </motion.p>  
      </motion.div>
            
    </section>
  );
};

export default HeroSection;