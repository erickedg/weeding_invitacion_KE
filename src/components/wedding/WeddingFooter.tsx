import { motion } from "framer-motion";
import FloralDivider from "./FloralDivider";

interface WeddingFooterProps {
  names: string;
  date: string;
}

const WeddingFooter = ({ names, date }: WeddingFooterProps) => {
  return (
    <footer className="relative py-20 px-6 bg-white text-center overflow-hidden">
      {/* Subtle ambient blobs */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "hsl(65,25%,35%,0.04)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto px-4 relative z-10"
      >
        <p className="wedding-body text-sm mb-8 text-gray-600 leading-relaxed">
          Gracias por ser parte de este capítulo tan importante en nuestra historia.
        </p>

        {/* Ornamental divider */}
        <FloralDivider className="mb-10" lineWidth="60px" />

        {/* Signature names */}
        <motion.h3
          className="font-brittany text-4xl md:text-5xl text-wedding-olive-dark"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {names}
        </motion.h3>

        <p className="font-body text-[10px] tracking-[0.35em] uppercase mt-4 text-gray-400">
          {date}
        </p>

        {/* Bottom flourish */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-2 opacity-30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="h-px w-8" style={{ background: "hsl(var(--wedding-olive-light))" }} />
          <span className="font-script text-base" style={{ color: "hsl(var(--wedding-olive))" }}>
            ♡
          </span>
          <div className="h-px w-8" style={{ background: "hsl(var(--wedding-olive-light))" }} />
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default WeddingFooter;
