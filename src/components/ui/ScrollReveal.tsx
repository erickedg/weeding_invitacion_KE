import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

export const ScrollReveal = ({ children, width = "fit-content", delay = 0 }: ScrollRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Empieza invisible y 50px abajo
      whileInView={{ opacity: 1, y: 0 }} // Al verse, sube y aparece
      viewport={{ once: true, margin: "-100px" }} // Se activa cuando el elemento entra un poco en pantalla
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }} // Animación suave
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};