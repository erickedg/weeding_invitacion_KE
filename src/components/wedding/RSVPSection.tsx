import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface RSVPSectionProps {
  deadline: string;
  confirmUrl?: string;
}

const RSVPSection = ({ deadline, confirmUrl }: RSVPSectionProps) => {
  return (
    <section className="wedding-section relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0"
          style={{ backgroundColor: "hsl(var(--wedding-olive))" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto relative z-10"
      >
        <h2 className="wedding-heading text-2xl mb-4 font-medium">Confirmar asistencia</h2>
        <div className="wedding-divider" />

        <p className="wedding-body text-sm mt-6 mb-8">
          Por favor, confirma tu asistencia antes del {deadline}.
        </p>

        <a
          href={confirmUrl || "#"}
          className="inline-block font-body text-xs tracking-[0.2em] uppercase px-10 py-4 rounded-sm transition-all duration-300"
          style={{
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          Confirmar aquí
        </a>
      </motion.div>
    </section>
  );
};

export default RSVPSection;
