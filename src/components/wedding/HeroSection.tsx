import { motion } from "framer-motion";
import heroBg1 from "@/assets/Foto_11.webp";
import heroBg2 from "@/assets/Foto_10.webp";
import weddingLogo from "@/assets/K_Y_E_2.webp";

interface HeroSectionProps {
  names: string;
  subtitle?: string;
}

const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2.2, duration: 0.8 }}
    onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })}
  >
    <span
      className="font-body text-[9px] tracking-[0.35em] uppercase"
      style={{ color: "hsl(var(--wedding-text))", opacity: 0.6 }}
    >
      Desliza
    </span>
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        width="16"
        height="22"
        viewBox="0 0 16 22"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1" y="1" width="14" height="20" rx="7"
          stroke="hsl(65, 25%, 35%)"
          strokeWidth="1"
          opacity="0.4"
        />
        <motion.rect
          x="6.5" y="4" width="3" height="5" rx="1.5"
          fill="hsl(65, 25%, 35%)"
          opacity="0.7"
          animate={{ y: [0, 7, 0], opacity: [0.7, 0.2, 0.7] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  </motion.div>
);

const HeroSection = ({ names, subtitle }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden">

      {/* Background images */}
      <div className="absolute inset-0 z-0 grid grid-cols-1 md:grid-cols-2">
        <div className="relative w-full h-full overflow-hidden hidden md:block">
          <img
            src={heroBg1}
            alt="Fondo Boda 1"
            className="w-full h-full object-cover object-[center_30%] md:object-center"
          />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background/30 to-transparent" />
        </div>
        <div className="relative w-full h-full overflow-hidden block">
          <img
            src={heroBg2}
            alt="Fondo Boda 2"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* White overlay */}
        <div className="absolute inset-0 bg-white/60 z-10 pointer-events-none" />

        {/* Bottom gradient */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-background via-background/80 to-transparent h-[45%]" />
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-6 pb-16 md:pb-20 w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <div className="relative inline-block">
          {/* Soft glow behind content */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[160%] rounded-full blur-3xl -z-10"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.72)" }}
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
              textShadow: "0 2px 14px rgba(255,255,255,0.6)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Katia &amp; Erick
          </motion.p>
        </div>

        <motion.p
          className="wedding-body text-[10px] md:text-xs tracking-[0.35em] uppercase mt-7 font-medium"
          style={{ color: "hsl(var(--wedding-text))" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {subtitle ?? "Los invitamos a acompañarnos en este día tan especial"}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
