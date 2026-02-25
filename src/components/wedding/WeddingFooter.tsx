import { motion } from "framer-motion";

interface WeddingFooterProps {
  names: string;
  date: string;
}

const WeddingFooter = ({ names, date }: WeddingFooterProps) => {
  return (
    <footer className="wedding-section py-20" style={{ backgroundColor: "hsl(var(--wedding-cream))" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="wedding-body text-sm mb-6">
          Gracias por ser parte de este capítulo tan importante en nuestra historia.
        </p>

        <div className="wedding-divider" />

        <h3 className="font-script text-4xl mt-6" style={{ color: "hsl(var(--primary))" }}>
          {names}
        </h3>
        <p className="font-body text-xs tracking-[0.3em] uppercase mt-4" style={{ color: "hsl(var(--muted-foreground))" }}>
          {date}
        </p>
      </motion.div>
    </footer>
  );
};

export default WeddingFooter;
