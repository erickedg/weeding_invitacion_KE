import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface PhotoShareProps {
  albumUrl: string;
}

const PhotoShare = ({ albumUrl }: PhotoShareProps) => {
  return (
    <section className="wedding-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto"
      >
        <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}>
          <Camera size={20} className="text-primary" />
        </div>
        <h2 className="wedding-heading text-2xl mb-4">Fotos</h2>
        <div className="wedding-divider" />

        <p className="wedding-body text-sm mt-6 mb-6">
          Comparte con nosotros tus fotografías y videos del evento
        </p>

        <a
          href={albumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-body text-xs tracking-[0.2em] uppercase px-8 py-3 rounded-sm border transition-colors"
          style={{
            borderColor: "hsl(var(--primary))",
            color: "hsl(var(--primary))",
          }}
        >
          Ir al álbum
        </a>
      </motion.div>
    </section>
  );
};

export default PhotoShare;
