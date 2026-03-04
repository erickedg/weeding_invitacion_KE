import { motion } from "framer-motion";
import weddingLogo from "@/assets/K_Y_E.png";

interface HeroSectionProps {
  names: string;
  subtitle?: string;
}

const HeroSection = ({ names, subtitle }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-10 left-10 w-40 h-40 rounded-full blur-3xl"
          style={{ backgroundColor: "hsl(var(--wedding-sage))" }}
        />
        <div
          className="absolute bottom-20 right-10 w-60 h-60 rounded-full blur-3xl"
          style={{ backgroundColor: "hsl(var(--wedding-olive-light))" }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <motion.p
          className="wedding-body text-xs tracking-[0.4em] uppercase mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {subtitle || "En el plan perfecto de Dios, nuestras vidas se encontraron"}
        </motion.p>

        <div className="wedding-divider" />

        <motion.img
          src={weddingLogo}
          alt={names}
          className="w-64 md:w-80 lg:w-96 mx-auto my-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />

        <div className="wedding-divider" />

        <motion.p
          className="font-display text-lg md:text-xl tracking-[0.25em] uppercase font-light"
          style={{ color: "hsl(var(--wedding-olive-light))" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Katia & Erick
        </motion.p>

        <motion.p
          className="wedding-body text-xs tracking-[0.3em] uppercase mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Los invitamos a acompañarnos en este día tan especial
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12" style={{ backgroundColor: "hsl(var(--wedding-olive-light))" }} />
        <span className="wedding-body text-[10px] tracking-widest uppercase mt-2">Scroll</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
