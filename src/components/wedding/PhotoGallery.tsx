import { motion } from "framer-motion";

const PhotoGallery = () => {
  // Placeholder images - user will replace with their own
  const placeholders = [1, 2, 3, 4, 5];

  return (
    <section className="py-8 overflow-hidden">
      <div className="flex gap-3 px-4">
        {placeholders.map((_, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 w-48 h-64 md:w-64 md:h-80 rounded-sm overflow-hidden"
            style={{ backgroundColor: "hsl(var(--secondary))" }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <p className="font-display text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Foto {i + 1}
                </p>
                <p className="font-body text-[10px] mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Sube tu imagen
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;
