import { motion } from "framer-motion";
import { Hotel } from "lucide-react";

interface AccommodationProps {
  hotelName: string;
  hotelUrl: string;
  description?: string;
}

const Accommodation = ({ hotelName, hotelUrl, description }: AccommodationProps) => {
  return (
    <section className="wedding-section" style={{ backgroundColor: "hsl(var(--wedding-cream))" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto"
      >
        <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}>
          <Hotel size={20} className="text-primary" />
        </div>
        <h2 className="wedding-heading text-2xl mb-4">Hospedaje</h2>
        <div className="wedding-divider" />

        <p className="wedding-body text-sm mt-6 mb-6">
          {description || `Nosotros tenemos una alianza con el ${hotelName} por si quieres hospedarte allí.`}
        </p>

        <a
          href={hotelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-body text-xs tracking-[0.2em] uppercase px-8 py-3 rounded-sm transition-colors"
          style={{
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          Ver Hotel
        </a>
      </motion.div>
    </section>
  );
};

export default Accommodation;
